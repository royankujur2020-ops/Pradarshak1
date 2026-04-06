import React, { useState } from 'react';
import { Camera, BookOpen, Languages, Sparkles, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CameraScanner from './components/CameraScanner';
import ExplanationView from './components/ExplanationView';
import { explainProblem } from './services/geminiService';
import { cn } from './lib/utils';

type AppState = 'landing' | 'scanning' | 'loading' | 'explanation';
type Language = 'English' | 'Bengali' | 'Nepali';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [language, setLanguage] = useState<Language>('English');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async (image: string) => {
    setCapturedImage(image);
    setState('loading');
    setError(null);

    try {
      const result = await explainProblem(image, language);
      setExplanation(result.text);
      setState('explanation');
    } catch (err) {
      console.error("Error explaining problem:", err);
      setError("I couldn't process that image. Please try again with a clearer picture.");
      setState('landing');
    }
  };

  const reset = () => {
    setState('landing');
    setCapturedImage(null);
    setExplanation(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] font-sans selection:bg-emerald-200">
      <AnimatePresence mode="wait">
        {state === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-6 pt-20 pb-32 space-y-12"
          >
            {/* Hero Section */}
            <header className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                The Visual Mentor
              </div>
              <h1 className="text-6xl font-black tracking-tight text-[#1a1a1a] leading-[0.9]">
                PRADARSHAK
              </h1>
              <p className="text-xl text-[#4a4a4a] leading-relaxed max-w-md mx-auto">
                Point your camera at any textbook page. Get instant, simple explanations in your language.
              </p>
            </header>

            {/* Language Selector */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#e5e5e0] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Languages className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Choose Language</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {(['English', 'Bengali', 'Nepali'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "py-4 rounded-2xl font-bold transition-all border-2",
                      language === lang 
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105" 
                        : "bg-white text-[#4a4a4a] border-[#e5e5e0] hover:border-emerald-200"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </section>

            {/* Main Action */}
            <div className="space-y-4">
              <button 
                onClick={() => setState('scanning')}
                className="w-full bg-[#1a1a1a] text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4 group"
              >
                <Camera className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                START SCANNING
                <ArrowRight className="w-6 h-6" />
              </button>
              
              {error && (
                <p className="text-red-500 text-center font-medium bg-red-50 p-3 rounded-xl border border-red-100">
                  {error}
                </p>
              )}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 space-y-3">
                <HelpCircle className="w-8 h-8 text-orange-600" />
                <h3 className="font-bold text-orange-900">Stuck on a problem?</h3>
                <p className="text-sm text-orange-800/80">Scan math problems or diagrams for instant hints.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 space-y-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-blue-900">Local Metaphors</h3>
                <p className="text-sm text-blue-800/80">We explain complex ideas using things you see every day.</p>
              </div>
            </div>

            {/* Footer Credit */}
            <footer className="text-center pt-8 border-t border-[#e5e5e0]">
              <p className="text-sm font-medium text-[#8e9299] tracking-widest uppercase">
                Made with ❤️ by <span className="text-[#1a1a1a] font-bold">NBSXC Students</span>
              </p>
            </footer>
          </motion.div>
        )}

        {state === 'scanning' && (
          <CameraScanner 
            onCapture={handleCapture}
            onClose={() => setState('landing')}
          />
        )}

        {state === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#fdfcf9] z-[60] flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin" />
              <Sparkles className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="mt-8 text-3xl font-black text-[#1a1a1a]">Analyzing Page...</h2>
            <p className="mt-4 text-lg text-[#4a4a4a] max-w-xs">
              Our mentor is looking at your textbook. This will only take a moment.
            </p>
            
            {/* Loading Tips */}
            <div className="mt-12 p-6 bg-white rounded-3xl border border-[#e5e5e0] shadow-sm max-w-sm">
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Did you know?</p>
              <p className="text-[#4a4a4a]">
                Pradarshak uses "Edge-AI" to work even when your internet is slow.
              </p>
            </div>
          </motion.div>
        )}

        {state === 'explanation' && explanation && capturedImage && (
          <ExplanationView 
            explanation={explanation}
            image={capturedImage}
            onBack={reset}
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
