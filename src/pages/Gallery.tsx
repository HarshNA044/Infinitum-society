import React from 'react';
import { motion } from 'motion/react';
import { ZoomIn } from 'lucide-react';
import { cn } from '../lib/utils';

const images = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
];

export default function Gallery_Page() {
  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-6">Moments Captured</h1>
          <p className="text-zinc-500 text-lg">Visual glimpses into our fests, hackathons, and classroom seminars.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-slate-100 cursor-zoom-in border border-slate-200",
                idx % 4 === 1 ? "md:col-span-2" : ""
              )}
            >
              <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery item" />
              <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 scale-50 group-hover:scale-100 transition-transform shadow-xl">
                   <ZoomIn className="w-6 h-6" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
