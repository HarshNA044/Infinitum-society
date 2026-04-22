import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Calendar, Users, Trophy, ChevronRight, Zap, Star, 
  Plus, QrCode as QrIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const StatCard = ({ label, value, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-3xl font-bold tracking-tight text-zinc-900">{value}</span>
    </div>
    <span className="text-zinc-500 font-medium">{label}</span>
  </motion.div>
);

export default function Home_Page() {
  const { request } = useApi();
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalRegistrations: 0, totalAttendance: 0, eventsCount: 0 });

  useEffect(() => {
    request('/api/events').then(setEvents);
    request('/api/stats').then(setStats);
  }, []);

  const featuredEvent = events[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[minmax(80px,_auto)]">
        
        {/* Main Hero / Featured Event (Span 8x4) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 md:row-span-4 bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-white flex flex-col justify-end shadow-2xl shadow-indigo-600/20 group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <Zap className="w-64 h-64" />
          </div>
          <span className="bg-white/20 text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full self-start mb-6 backdrop-blur-md">Featured Seminar</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
            {featuredEvent?.title || "Generative AI & The Future of DU"}
          </h2>
          <div className="flex flex-wrap gap-8 items-center mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-1">Date</span>
              <span className="text-lg font-bold uppercase">{featuredEvent?.date || "TBA"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-1">Venue</span>
              <span className="text-lg font-bold">{featuredEvent?.location || "Seminar Hall 1"}</span>
            </div>
            <Link 
              to={featuredEvent ? `/events?register=${featuredEvent.id}` : "/events"}
              className="md:ml-auto bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform shadow-xl shadow-indigo-950/20 active:scale-95"
            >
              Register Now
            </Link>
          </div>
        </motion.div>

        {/* Quick Stats (Span 4x3) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 md:row-span-3 bento-card justify-between"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-bold uppercase text-slate-400 tracking-tighter">Society Stats</h3>
            <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl"><ArrowRight className="w-5 h-5 -rotate-45" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{stats.totalRegistrations}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Registrations</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{stats.eventsCount}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Events Held</div>
            </div>
          </div>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-indigo-600 w-3/4"></div>
            <div className="h-full bg-indigo-300 w-1/4"></div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Member Growth: 85% Positive</p>
        </motion.div>

        {/* Quick Registration (Span 4x1) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 md:row-span-1 bg-amber-400 rounded-[2rem] border border-amber-500 p-6 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer"
        >
          <div className="flex flex-col">
            <h4 className="font-black text-amber-950 uppercase text-lg tracking-tighter leading-none">Quick Register</h4>
            <p className="text-[9px] text-amber-900 font-bold uppercase leading-none opacity-70 mt-1">Join upcoming events instantly</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-lg shadow-amber-950/10">
            <Plus className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Gallery Preview (Span 3x4) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-3 md:row-span-4 bento-card"
        >
          <h3 className="text-xs font-bold uppercase text-slate-400 mb-6 flex items-center justify-between">
            Gallery Preview 
            <Link to="/gallery" className="text-indigo-600 hover:underline">View All</Link>
          </h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="bg-slate-200 rounded-2xl h-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540575861501-7ce0e1d1aa99?q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Preview 1" />
            </div>
            <div className="bg-slate-200 rounded-2xl h-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Preview 2" />
            </div>
            <div className="bg-slate-200 rounded-2xl h-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523580494863-6f30312248f5?q=80&w=400" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Preview 3" />
            </div>
            <div className="bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xl">+12</div>
          </div>
        </motion.div>

        {/* Attendee Insights (Span 5x4) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-5 md:row-span-4 bento-card shadow-indigo-600/5 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase text-slate-900 tracking-tighter">Student Demographics</h3>
            <div className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded tracking-widest">Live Feed</div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>B.Sc. Computer Science</span>
                <span className="text-slate-900">85%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>B.A. Economics</span>
                <span className="text-slate-900">60%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>B.Com Honours</span>
                <span className="text-slate-900">40%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="mt-auto p-5 bg-slate-50 rounded-[2rem] flex items-center gap-4 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                 <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">98% Retention</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Member loyalty score</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Achievements (Span 4x4) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-4 md:row-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-6 left-6">
             <span className="text-[9px] font-black uppercase text-indigo-400 tracking-[0.3em]">Our Legacy</span>
          </div>
          <div className="mt-8">
            <Trophy className="w-16 h-16 text-amber-500 mb-6" />
            <h4 className="text-2xl font-black mb-2 italic tracking-tighter uppercase">Recent Win</h4>
            <p className="text-xs text-slate-400 mb-8 leading-relaxed uppercase font-bold tracking-widest">
              Best Society Award 2025 • University of Delhi Technical Council
            </p>
          </div>
          <Link 
            to="/achievements"
            className="w-full bg-indigo-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-colors active:scale-95 text-center"
          >
            Explore Success
          </Link>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-3xl"></div>
        </motion.div>

      </div>
    </div>
  );
}
