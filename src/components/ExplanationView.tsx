import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Lightbulb, ArrowLeft, Share2, Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ExplanationViewProps {
  explanation: string;
  image: string;
  onBack: () => void;
  language: string;
}

export default function ExplanationView({ explanation, image, onBack, language }: ExplanationViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-[#fdfcf9] text-[#2d2d2d] pb-20"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#fdfcf9]/80 backdrop-blur-md border-b border-[#e5e5e0] px-4 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-[#f5f5f0] rounded-full transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
          <Languages className="w-3 h-3" />
          {language}
        </div>
        <button className="p-2 hover:bg-[#f5f5f0] rounded-full transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-8">
        {/* Captured Image Preview */}
        <section className="relative group">
          <div className="aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-500">
            <img 
              src={image} 
              alt="Captured textbook page" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg -rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <BookOpen className="w-6 h-6" />
          </div>
        </section>

        {/* Explanation Content */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a]">Mentor's Explanation</h2>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-8 rounded-[2rem] shadow-sm border border-[#e5e5e0] leading-relaxed">
            <ReactMarkdown
              components={{
                h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-emerald-800">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-lg text-[#4a4a4a]">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                li: ({ children }) => <li className="text-lg text-[#4a4a4a]">{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-emerald-700">{children}</strong>,
              }}
            >
              {explanation}
            </ReactMarkdown>
          </div>
        </section>

        {/* Local Metaphor Highlight */}
        <section className="bg-orange-50 border-2 border-orange-200 p-6 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lightbulb className="w-24 h-24 text-orange-600" />
          </div>
          <h3 className="text-orange-800 font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-2xl">💡</span> Quick Hint
          </h3>
          <p className="text-orange-900 leading-relaxed italic">
            Remember: Just like a falling mango always hits the ground, gravity pulls everything towards the Earth.
          </p>
        </section>

        {/* Footer Credit */}
        <footer className="text-center pt-12 pb-8">
          <p className="text-xs font-medium text-[#8e9299] tracking-widest uppercase">
            Made with ❤️ by <span className="text-[#1a1a1a] font-bold">AICUF Students of NBSXC</span>
          </p>
        </footer>
      </main>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#fdfcf9] to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button 
            onClick={onBack}
            className="w-full bg-[#1a1a1a] text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-colors flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-5 h-5" />
            Scan Another Page
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function RefreshCw({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
