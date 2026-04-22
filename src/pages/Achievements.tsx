import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Award, Medal } from 'lucide-react';
import { useApi } from '../hooks/useApi';

export default function Achievements_Page() {
  const { request } = useApi();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    request('/api/achievements').then(setAchievements);
  }, []);

  return (
    <div className="py-24 px-4 min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-24">
          <h1 className="text-5xl font-bold tracking-tight mb-6">Our Success Stories</h1>
          <p className="text-zinc-500 text-lg">A chronicle of our dedication and excellence over the years.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item: any, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bento-card group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="text-[10px] bento-tag bg-slate-100 text-slate-500 font-black">{item.date}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tighter italic">{item.title}</h3>
              <p className="mt-4 text-xs text-slate-500 font-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
