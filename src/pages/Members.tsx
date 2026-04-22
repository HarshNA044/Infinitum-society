import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Mail, Users } from 'lucide-react';
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
        <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Users className="w-3 h-3" /> Core Team
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] italic uppercase">
              The Minds <br /> Behind <span className="text-indigo-600">Infinitum</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm leading-relaxed uppercase tracking-widest text-right">
            Dedicated student leaders building the future of ARSD College.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member: any, idx: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-100 aspect-square mb-6 border border-zinc-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-8">
                   {member.linkedin && (
                     <a 
                       href={member.linkedin} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                     >
                       <Linkedin className="w-5 h-5" />
                     </a>
                   )}
                   <button className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-all">
                     <Mail className="w-5 h-5" />
                   </button>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-all uppercase tracking-tighter">{member.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
