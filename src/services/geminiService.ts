import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export interface MasteryFeedback {
  score: number;
  correctUnderstanding: string[];
  missingConcepts: string[];
  misconceptions: string[];
  analysis: string;
}

export async function analyzeExplanation(topic: string, explanation: string): Promise<MasteryFeedback> {
  const prompt = `
    You are an expert educator. Analyze the following explanation of the topic "${topic}".
    User's explanation: "${explanation}"

    Provide feedback in JSON format:
    {
      "score": number (0-100),
      "correctUnderstanding": string[],
      "missingConcepts": string[],
      "misconceptions": string[],
      "analysis": string (a short encouraging summary)
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse analysis results");
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      score: 0,
      correctUnderstanding: [],
      missingConcepts: ["Error analyzing explanation"],
      misconceptions: [],
      analysis: "We couldn't analyze your explanation right now. Please try again."
    };
  }
}

export async function generateLearningSet(content: string) {
  const prompt = `
    Analyze the following study material and create a structured learning set.
    Content: "${content}"

    Provide results in JSON format:
    {
      "summary": string,
      "concepts": { "name": string, "definition": string }[],
      "quiz": { "question": string, "options": string[], "answer": string }[]
    }
  `;

  // For the demo, return mock as we don't handle file parsing here yet
  return {
    summary: "At the core of deep learning lies the Artificial Neuron, inspired by the biological brain...",
    concepts: [
      { name: "Artificial Neuron", definition: "A mathematical function conceived as a model of biological neurons." },
      { name: "Backpropagation", definition: "A method used in artificial neural networks to calculate a gradient that is needed in the calculation of the weights to be used in the network." }
    ],
    quiz: [
      { question: "What is the primary inspiration for Artificial Neurons?", options: ["Microchips", "Biological Brain", "Fluid Dynamics"], answer: "Biological Brain" }
    ]
  };
}
