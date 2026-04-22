import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Lightbulb, GraduationCap } from 'lucide-react';

const Card = ({ icon: Icon, title, text, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all"
  >
    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold text-zinc-900 mb-4">{title}</h3>
    <p className="text-zinc-500 leading-relaxed">{text}</p>
  </motion.div>
);

export default function About_Page() {
  return (
    <div className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-24">
          <h1 className="text-6xl font-bold tracking-tighter text-zinc-900 mb-10 leading-tight">
            Infinite Passion, <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Finite Time.</span>
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed">
            Infinitum, the official society of Atma Ram Sanatan Dharma College (ARSD), University of Delhi, 
            is a student-led organization dedicated to technical excellence and social innovation. 
            We provide a platform for students to explore their potential beyond the curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            icon={Target} 
            title="Our Mission" 
            text="To bridge the gap between classroom learning and real-world application through workshops and fests."
            delay={0.1}
          />
          <Card 
            icon={Users} 
            title="Our Vision" 
            text="To build a collaborative community of innovators that solve complex problems through technology."
            delay={0.2}
          />
          <Card 
            icon={GraduationCap} 
            title="Legacy" 
            text="Founded in 2018, we have grown into one of the most prestigious technical societies in the university."
            delay={0.3}
          />
        </div>

        <div className="mt-24 p-12 md:p-24 bg-zinc-900 rounded-[4rem] text-center text-white relative">
          <h2 className="text-4xl font-bold mb-8 italic">"Excellence is not an act, but a habit."</h2>
          <p className="text-zinc-400 text-lg">- ARSD College Ethos</p>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
