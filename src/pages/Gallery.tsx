import React from 'react';
import { motion } from 'motion/react';
import { ZoomIn } from 'lucide-react';
import { cn } from '../lib/utils';

const items = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', title: 'Science Workshop', category: 'Academic' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80', title: 'Exploromania Seminar', category: 'Events' },
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80', title: 'Beyond the Veil', category: 'Events' },
  { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80', title: 'Socio-Sync Meetup', category: 'Social' },
  { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80', title: 'Team Collaboration', category: 'Academic' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80', title: 'Science Museum Visit', category: 'Field Trip' },
];

export default function Gallery_Page() {
  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-8 italic uppercase">
              Moments <br /> <span className="text-indigo-600">Captured</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm leading-relaxed uppercase tracking-widest text-right">
            Visual glimpses into INFINITIUM's fests, field trips, and classroom seminars.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-100 aspect-square cursor-zoom-in border border-slate-100 shadow-sm group-hover:shadow-xl transition-all">
                <img 
                  src={item.src} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white flex items-center gap-2">
                     <ZoomIn className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                   </div>
                </div>
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900 uppercase tracking-tighter italic">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
