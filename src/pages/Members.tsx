import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Mail, Users } from 'lucide-react';
import { useApi } from '../hooks/useApi';

export default function Members_Page() {
  const { request } = useApi();
  const [allMembers, setAllMembers] = useState([]);
  const [tenure, setTenure] = useState('2024-25');

  useEffect(() => {
    request('/api/members').then((data: any) => {
      setAllMembers(data);
      if (data.length > 0) {
        // Automatically select the latest tenure
        const availableTenures = Array.from(new Set(data.map((m: any) => m.tenure))).sort().reverse() as string[];
        if (availableTenures.length > 0) {
          setTenure(availableTenures[0]);
        }
      }
    });
  }, []);

  const tenures = Array.from(new Set(allMembers.map((m: any) => m.tenure))).sort().reverse() as string[];
  const filteredMembers = allMembers.filter((m: any) => m.tenure === tenure);

  return (
    <div className="py-24 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
             <div className="sticky top-32 space-y-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-100">
                    <Users className="w-3 h-3" /> Core Team
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-[0.9] italic uppercase mb-6">
                    The Minds Behind <span className="text-brand-600">INFINITIUM</span>
                  </h1>
                  <p className="text-slate-500 font-medium text-xs leading-relaxed uppercase tracking-widest">
                    Dedicated student leaders building the future of ARSD College.
                  </p>
                </div>

                <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:shadow-brand-600/5">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pl-1">Select Tenure</h3>
                   <div className="relative">
                      <select 
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="w-full bg-white border-2 border-zinc-100 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 appearance-none focus:border-brand-600 outline-none transition-all cursor-pointer shadow-sm"
                      >
                        {tenures.map((t, idx) => (
                          <option key={t} value={t}>
                            {idx === 0 ? `Current (${t})` : `Tenure ${t}`}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                         <Users className="w-4 h-4" />
                      </div>
                   </div>
                   <p className="mt-4 text-[9px] text-slate-400 font-bold leading-relaxed px-1">
                      Explore the legacy of INFINITIUM through its past and present core members.
                   </p>
                </div>
             </div>
          </aside>

          {/* Members Grid */}
          <div className="flex-1">
             <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">
                   {tenure === tenures[0] ? 'Current Tenure' : `Tenure ${tenure}`}
                </h2>
                <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                   {filteredMembers.length} Members
                </span>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredMembers.map((member: any, idx: number) => (
                 <motion.div
                   key={member.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group"
                 >
                   <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-100 aspect-square mb-6 border border-zinc-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-brand-600/10">
                     <img 
                       src={member.image} 
                       alt={member.name} 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                       referrerPolicy="no-referrer"
                     />
                     
                     <div className="absolute top-4 right-4 z-20">
                       {member.linkedin && (
                         <a 
                           href={member.linkedin} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="w-10 h-10 bg-white/90 backdrop-blur-md text-brand-600 rounded-xl flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all border border-white/50 shadow-xl"
                         >
                           <Linkedin className="w-5 h-5" />
                         </a>
                       )}
                     </div>

                     <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-8">
                        <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-500 hover:text-brand-950 transition-all font-black text-[10px] uppercase tracking-widest shadow-2xl">
                          <Mail className="w-4 h-4" /> Message
                        </button>
                     </div>
                   </div>
                   <div className="px-2">
                     <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-all uppercase tracking-tighter italic">{member.name}</h3>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{member.role}</p>
                   </div>
                 </motion.div>
               ))}
             </div>

             {filteredMembers.length === 0 && (
               <div className="py-20 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-100 text-center flex flex-col items-center">
                  <Users className="w-12 h-12 text-zinc-200 mb-4" />
                  <p className="text-slate-400 font-black italic uppercase text-xs tracking-widest">No members found for this tenure.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
