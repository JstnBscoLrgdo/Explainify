export interface MasteryFeedback {
  score: number;
  correctUnderstanding: string[];
  missingConcepts: string[];
  misconceptions: string[];
  analysis: string;
}

export async function analyzeExplanation(
  topic: string,
  explanation: string
): Promise<MasteryFeedback> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        score: Math.floor(Math.random() * 40) + 60,
        correctUnderstanding: [
          "You showed basic understanding of the topic"
        ],
        missingConcepts: [
          "Deeper conceptual clarity",
          "Real-world application"
        ],
        misconceptions:
          explanation.length < 30
            ? ["Explanation too short for full evaluation"]
            : [],
        analysis:
          "Good effort! This is a simulated review without AI API."
      });
    }, 1200);
  });
}

export async function generateLearningSet(content: string) {
  return {
    summary: "Mock learning summary generated without AI API.",
    concepts: [
      {
        name: "Artificial Neuron",
        definition: "A simplified model inspired by biological neurons."
      }
    ],
    quiz: [
      {
        question: "What inspires artificial neurons?",
        options: ["Brain", "Circuits", "Algorithms"],
        answer: "Brain"
      }
    ]
  };
}
