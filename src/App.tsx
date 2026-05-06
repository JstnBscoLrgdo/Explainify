/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  BarChart2, 
  User, 
  Menu, 
  Mic, 
  Upload, 
  X, 
  Lightbulb, 
  ChevronRight, 
  Zap, 
  Brain,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Check,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WEAK_TOPICS, ALL_TOPICS } from './constants.ts';

type Screen = 'home' | 'explore' | 'mastery' | 'profile' | 'explain' | 'upload' | 'analysis' | 'feedback';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedTopic, setSelectedTopic] = useState<string>('Quantum Entanglement');
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState<MasteryFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartExplaining = (topicName: string = 'Quantum Entanglement') => {
    setSelectedTopic(topicName);
    setCurrentScreen('explain');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setCurrentScreen('analysis');
    
    // Simulate processing time
    setTimeout(async () => {
      const result = await analyzeExplanation(selectedTopic, explanation);
      setFeedback(result);
      setIsAnalyzing(false);
      setCurrentScreen('feedback');
    }, 2500);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-margin-mobile h-16 bg-surface shadow-sm">
        <div className="flex items-center gap-3">
          {currentScreen !== 'home' ? (
            <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-surface-container rounded-full">
              <X size={24} className="text-on-surface-variant" />
            </button>
          ) : (
            <button className="p-2 hover:bg-surface-container rounded-full">
              <Menu size={24} className="text-on-surface-variant" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-primary-container rounded-lg">
              <Zap size={18} className="text-on-primary-container" />
            </div>
            <h1 className="font-semibold text-xl text-primary">Explainify</h1>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
           <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 px-margin-mobile max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Mastery Ring Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                  <p className="text-label-md text-on-surface-variant mb-4">Current Mastery</p>
                  <div className="relative w-40 h-40 flex items-center justify-center rounded-full mastery-ring">
                    <div className="absolute inset-0 m-4 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-primary">68%</span>
                      <span className="text-label-sm text-secondary">Pro Level</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-label-sm px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full">
                      +12% this week
                    </span>
                  </div>
                </div>

                <div className="bg-primary-container text-on-primary rounded-xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
                  <div className="relative z-10">
                    <Lightbulb size={24} className="mb-2" />
                    <h2 className="text-xl font-semibold mb-2">Daily Explanation</h2>
                    <p className="opacity-90">"Explain the concept of 'Opportunity Cost' as if you were talking to a 10-year-old."</p>
                  </div>
                  <button 
                    onClick={() => handleStartExplaining('Opportunity Cost')}
                    className="mt-6 bg-surface-container-lowest text-primary font-medium py-2 px-4 rounded-xl self-start hover:bg-surface-container transition-colors"
                  >
                    Accept Challenge
                  </button>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Day Streak', value: '12', icon: <Zap size={20} /> },
                  { label: 'Topics', value: '42', icon: <Brain size={20} /> },
                  { label: 'XP', value: '3.4k', icon: <Sparkles size={20} /> }
                ].map((stat, i) => (
                  <div key={i} className="bg-surface-container-low border border-outline-variant rounded-xl p-4 text-center">
                    <div className="text-primary flex justify-center mb-1">{stat.icon}</div>
                    <p className="text-xl font-bold text-on-surface">{stat.value}</p>
                    <p className="text-label-sm text-on-surface-variant font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Topics List */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Weak Topics</h3>
                  <button className="text-label-md font-semibold text-primary">View All</button>
                </div>
                <div className="space-y-3">
                  {WEAK_TOPICS.map((topic) => (
                    <div 
                      key={topic.id}
                      onClick={() => handleStartExplaining(topic.name)}
                      className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                          {topic.id === '1' ? <BarChart2 size={20} /> : topic.id === '2' ? <FileText size={20} /> : <Brain size={20} />}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">{topic.name}</p>
                          <p className="text-label-sm text-on-surface-variant">{topic.mastery}% Mastery • Last seen {topic.lastSeen}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-outline group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {currentScreen === 'explain' && (
            <motion.div 
              key="explain"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-primary">
                  <Zap size={16} />
                  <span className="text-label-sm font-bold uppercase tracking-wider">Explain Mode</span>
                </div>
                <h1 className="text-3xl font-bold text-on-surface">{selectedTopic}</h1>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-on-surface-variant">Explain this simply</p>
                <div className="relative">
                  <textarea 
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="w-full h-80 p-6 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none shadow-sm"
                    placeholder="Type your explanation here or use the voice button below..."
                  />
                  <div className="absolute bottom-4 right-4 text-outline">
                    <FileText size={20} />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-12">
                <button className="w-16 h-16 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center shadow-sm">
                  <Mic size={32} />
                </button>
                <div className="h-1.5 w-32 bg-outline-variant rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    animate={{ width: explanation.length > 0 ? '100%' : '0%' }}
                  />
                </div>
                <button 
                  onClick={() => setCurrentScreen('home')} // Just mockup upload trigger
                  className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-all flex items-center justify-center shadow-sm"
                >
                  <Upload size={32} />
                </button>
              </div>

              <div className="fixed bottom-0 left-0 w-full p-margin-mobile bg-surface/80 backdrop-blur-md z-40">
                <div className="max-w-2xl mx-auto">
                  <button 
                    onClick={handleAnalyze}
                    disabled={explanation.length < 10}
                    className="w-full h-14 bg-primary text-on-primary font-semibold text-lg rounded-xl shadow-lg hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Mastery Insights
                    <Sparkles size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentScreen === 'analysis' && (
             <motion.div 
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 border-4 border-surface-container rounded-full"></div>
                <motion.div 
                  className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
                   <Brain size={64} className="text-primary-container" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">Analyzing Your Content</h2>
              <p className="text-on-surface-variant">Our AI is distilling complex information into clear mastery paths.</p>
              
              <div className="mt-12 w-full max-w-md space-y-4 text-left">
                {[
                  { label: 'Extracting content', status: 'Complete', icon: <CheckCircle2 className="text-tertiary" size={20} /> },
                  { label: 'Identifying concepts', status: 'In Progress', icon: <RefreshCw className="text-primary animate-spin" size={20} />, progress: 65 },
                  { label: 'Generating quiz', status: 'Pending', icon: <BarChart2 size={20} className="text-outline" />, opacity: 'opacity-50' }
                ].map((step, i) => (
                  <div key={i} className={`bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm ${step.opacity || ''}`}>
                    <div className="flex justify-between items-center mb-2">
                       <div className="flex items-center gap-3">
                        {step.icon}
                        <h3 className="font-semibold">{step.label}</h3>
                       </div>
                       <span className={`text-label-sm px-2 py-0.5 rounded-full ${step.status === 'Complete' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' : step.status === 'In Progress' ? 'bg-primary text-on-primary' : 'bg-surface-variant text-outline'}`}>
                        {step.status}
                       </span>
                    </div>
                    {step.progress && (
                      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-primary" style={{ width: `${step.progress}%` }}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentScreen === 'feedback' && feedback && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto space-y-8 pb-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-label-md text-secondary uppercase tracking-widest">Clarity Score</h2>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
                    <motion.circle 
                      className="text-primary" 
                      cx="96" cy="96" fill="transparent" r="88" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      strokeDasharray={2 * Math.PI * 88}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      animate={{ strokeDashoffset: (2 * Math.PI * 88) * (1 - feedback.score / 100) }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{feedback.score}</span>
                    <span className="text-label-md text-secondary">/ 100</span>
                  </div>
                </div>
                <p className="text-on-surface-variant">{feedback.analysis}</p>
              </div>

              <div className="space-y-4">
                {/* Correct */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-green-600">
                    <CheckCircle2 size={24} />
                    <h3 className="text-lg font-semibold text-on-surface">Correct Understanding</h3>
                  </div>
                  <ul className="space-y-2">
                    {feedback.correctUnderstanding.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-on-surface-variant">
                        <ArrowRight size={18} className="mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <Lightbulb size={24} />
                    <h3 className="text-lg font-semibold text-on-surface">Missing Concepts</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {feedback.missingConcepts.map((item, i) => (
                      <span key={i} className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-label-sm font-semibold">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Misconceptions */}
                {feedback.misconceptions.length > 0 && (
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 text-error">
                      <AlertCircle size={24} />
                      <h3 className="text-lg font-semibold text-on-surface">Misconceptions</h3>
                    </div>
                    <div className="bg-error-container p-3 rounded-lg border border-on-error-container/10">
                      {feedback.misconceptions.map((item, i) => (
                        <p key={i} className="text-on-error-container text-body-md">{item}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="fixed bottom-0 left-0 w-full p-4 bg-surface border-t border-outline-variant z-50">
                <div className="max-w-md mx-auto flex gap-4">
                  <button 
                    onClick={() => setCurrentScreen('explain')}
                    className="flex-1 h-12 rounded-xl border-2 border-primary text-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 active:scale-95 transition-all"
                  >
                    <RefreshCw size={20} />
                    Retry
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('home')}
                    className="flex-[2] h-12 bg-primary text-on-primary font-semibold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentScreen === 'mastery' && (
            <motion.div 
              key="mastery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <section>
                <h1 className="text-3xl font-bold mb-2">Mastery Progress</h1>
                <p className="text-on-surface-variant text-lg">You've reached <span className="text-primary font-bold">Level 12</span>. Keep pushing to unlock the 'Elite Explainer' badge.</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-4">
                   <div className="flex justify-between items-start">
                    <div>
                      <p className="text-label-md text-on-surface-variant">Total XP</p>
                      <h2 className="text-3xl font-bold text-primary">3,450 XP</h2>
                    </div>
                    <Sparkles className="text-primary/20" size={32} />
                   </div>
                   <div className="space-y-2">
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[72%] rounded-full"></div>
                    </div>
                    <p className="text-label-sm text-on-surface-variant">250 XP until Level 13</p>
                   </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
                  <p className="text-label-md text-on-surface-variant">Accuracy</p>
                  <h2 className="text-3xl font-bold text-primary">94%</h2>
                  <div className="flex items-center text-on-tertiary-fixed-variant gap-1">
                    <ArrowRight size={14} className="-rotate-45" />
                    <span className="text-label-sm font-semibold">+2% this week</span>
                  </div>
                </div>
              </div>

               {/* Manual Bar Chart Implementation */}
               <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Learning Velocity</h3>
                <div className="h-64 flex items-end justify-between px-4 pb-2 border-b border-l border-outline-variant relative">
                   {[45, 60, 55, 85, 70, 75, 95].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className={`w-8 rounded-t-lg ${h > 80 ? 'bg-primary' : 'bg-primary-container/60'}`}
                    />
                   ))}
                </div>
                <div className="flex justify-between mt-4 px-4 text-label-sm text-on-surface-variant">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>

              <section className="pb-12">
                <h3 className="text-xl font-semibold mb-4">Mastery by Domain</h3>
                <div className="space-y-4">
                  {ALL_TOPICS.map(topic => (
                    <div key={topic.id} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                        {topic.id === '6' ? <FileText /> : topic.id === '4' ? <Brain /> : <BarChart2 />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{topic.name}</span>
                          <span className="font-bold text-primary">{topic.mastery}%</span>
                        </div>
                        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: `${topic.mastery}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons */}
      {currentScreen === 'home' && (
        <div className="fixed bottom-24 right-margin-mobile flex gap-3">
          <button 
            onClick={() => setCurrentScreen('mastery')} // Mock up upload
            className="bg-surface-container-highest text-on-surface p-4 rounded-full shadow-lg hover:bg-surface-variant active:scale-95 transition-all"
          >
            <Upload size={24} />
          </button>
          <button 
            onClick={() => handleStartExplaining()}
            className="bg-primary text-on-primary flex items-center gap-2 px-6 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Mic size={24} />
            <span className="font-bold">Start Explaining</span>
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface border-t border-outline-variant shadow-lg rounded-t-xl">
        <button 
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center justify-center px-6 py-1 rounded-xl transition-all ${currentScreen === 'home' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
        >
          <Home size={24} weight={currentScreen === 'home' ? 'fill' : 'regular'} />
          <span className="text-label-sm mt-1">Home</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('explain')}
          className={`flex flex-col items-center justify-center px-6 py-1 rounded-xl transition-all ${currentScreen === 'explain' || currentScreen === 'feedback' || currentScreen === 'analysis' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
        >
          <Search size={24} />
          <span className="text-label-sm mt-1">Explore</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('mastery')}
          className={`flex flex-col items-center justify-center px-6 py-1 rounded-xl transition-all ${currentScreen === 'mastery' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
        >
          <BarChart2 size={24} />
          <span className="text-label-sm mt-1">Mastery</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('profile')}
          className={`flex flex-col items-center justify-center px-6 py-1 rounded-xl transition-all ${currentScreen === 'profile' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
        >
          <User size={24} />
          <span className="text-label-sm mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
