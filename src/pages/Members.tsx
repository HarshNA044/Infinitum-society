import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { useApi } from '../hooks/useApi';

export default function Members_Page() {
  const { request } = useApi();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    request('/api/members').then(setMembers);
  }, []);

  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24 max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-6">The Brains Behind <span className="text-indigo-600">Infinitum</span></h1>
          <p className="text-zinc-500 text-lg">Meet our core committee and faculty mentors who drive the society forward.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member: any, idx: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card group items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 overflow-hidden rounded-2xl border-2 border-slate-100 group-hover:border-indigo-600 transition-all shadow-xl">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-all uppercase tracking-tighter">{member.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
