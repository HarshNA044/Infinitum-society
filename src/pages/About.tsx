import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, Users, Lightbulb, GraduationCap, 
  Search, Handshake, Microscope, MessageSquare,
  BookOpen, Edit3, Monitor, Calendar, Megaphone, DollarSign,
  TrendingUp, Award, UserPlus
} from 'lucide-react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4 italic">{children}</h2>
    {subtitle && <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{subtitle}</p>}
  </div>
);

const Card = ({ icon: Icon, title, text, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group"
  >
    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-black text-zinc-900 mb-3 tracking-tight uppercase">{title}</h3>
    <p className="text-sm text-zinc-500 leading-relaxed font-medium">{text}</p>
  </motion.div>
);

const DepartmentCard = ({ icon: Icon, title, aim, tasks, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <Icon className="w-32 h-32" />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/10 text-indigo-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase italic">{title} Department</h3>
      <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-6">Aim: {aim}</p>
      <ul className="space-y-3">
        {tasks.map((task: string, i: number) => (
          <li key={i} className="flex gap-3 text-sm text-slate-400 leading-snug">
            <span className="text-indigo-500 font-bold">•</span> {task}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function About_Page() {
  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Users className="w-3 h-3" /> About INFINITIUM
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] italic uppercase mb-10">
              IGNITING <br /> <span className="text-indigo-600">CURIOSITY</span> <br /> & FOSTERING <br /> EXCELLENCE
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              INFINITIUM, the society of Atma Ram Sanatan Dharma College, is a dynamic platform for students pursuing physical sciences to explore, discover, and delve into the fascinating world of Science.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000" 
              className="w-full h-full object-cover grayscale brightness-75" 
              alt="Science Exploration"
            />
            <div className="absolute inset-0 bg-indigo-600/20 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* Objectives Section */}
        <section className="mb-32">
          <SectionTitle subtitle="Vision for students">Objectives of INFINITIUM</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              icon={Search} 
              title="Promote Scientific Enquiry" 
              text="Inspire students to think beyond the curriculum, encouraging them to ask questions and seek answers."
              delay={0.1}
            />
            <Card 
              icon={Handshake} 
              title="Foster Collaboration" 
              text="Providing a conducive environment for students to work together and learn from each other's strengths."
              delay={0.2}
            />
            <Card 
              icon={Microscope} 
              title="Develop Research Skills" 
              text="Support students in conducting experiments, collecting data, and preparing for future endeavors."
              delay={0.3}
            />
            <Card 
              icon={MessageSquare} 
              title="Enhance Communication" 
              text="Enabling members to articulate complex scientific concepts effectively through seminars and discussions."
              delay={0.4}
            />
          </div>
        </section>

        {/* Impacts Section */}
        <section className="mb-32 p-12 md:p-20 bg-indigo-600 rounded-[4rem] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <SectionTitle subtitle="Transforming Lives">Impacts on Students</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><TrendingUp className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Scientific Literacy</h4>
                  <p className="text-indigo-100 text-sm leading-relaxed">Enhances understanding of scientific principles and their applications in real-world scenarios.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><Handshake className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Leadership & Collaboration</h4>
                  <p className="text-indigo-100 text-sm leading-relaxed">Prepares students for leadership roles in communities, industries, and various work fields.</p>
                </div>
              </div>
            </div>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><Award className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Builds Confidence</h4>
                  <p className="text-indigo-100 text-sm leading-relaxed">Empowers members to express their ideas, present research, and engage confidently in discussions.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><UserPlus className="w-6 h-6" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Skill Development</h4>
                  <p className="text-indigo-100 text-sm leading-relaxed">Improves public speaking, event organization, and teamwork skills for career and personal growth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section className="mb-32">
          <SectionTitle subtitle="Our specialized wings">Departments</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DepartmentCard 
              icon={BookOpen} 
              title="Academic"
              aim="Support students in their academic journey."
              tasks={["Provide essential resources (notes, PYQs)", "Foster academic success", "Stay informed about college happenings"]}
              delay={0.1}
            />
            <DepartmentCard 
              icon={Edit3} 
              title="Content"
              aim="Provide high-quality engaging content."
              tasks={["Craft captions for social media", "Create regular event reports", "Utilize original creativity in writing"]}
              delay={0.2}
            />
            <DepartmentCard 
              icon={Monitor} 
              title="Digital"
              aim="Bring creative ideas to online presence."
              tasks={["Prepare posters and graphics", "Edit reels and audio content", "Monitor online engagement metrics"]}
              delay={0.3}
            />
            <DepartmentCard 
              icon={Calendar} 
              title="Event"
              aim="Plan, organize, and execute events."
              tasks={["Coordinate with speakers and performers", "Manage logistics and venue", "Deliver successful society objectives"]}
              delay={0.4}
            />
            <DepartmentCard 
              icon={Megaphone} 
              title="PR"
              aim="Craft and share compelling stories."
              tasks={["Develop communication strategies", "Maintain strong reputation", "Amplify society's voice and impact"]}
              delay={0.5}
            />
            <DepartmentCard 
              icon={Handshake} 
              title="Sponsorship"
              aim="Secure sponsorships and partnerships."
              tasks={["Build relationships with partners", "Negotiate and finalize deals", "Track revenue and ROI"]}
              delay={0.6}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-12 md:p-24 bg-slate-50 border border-slate-100 rounded-[4rem] text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 p-8">
             <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.4em]">Join the movement</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-8 italic uppercase text-slate-900 tracking-tighter">
            Unlock the wonders of <span className="text-indigo-600">Physical Sciences</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
            If you're a student at ARSD College with a thirst for knowledge and a passion for discovery, join INFINITIUM today! Together, let's shape a brighter future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-slate-900 transition-colors">
               Apply for Core Team
            </button>
            <button className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-3xl font-black uppercase text-xs tracking-widest hover:border-indigo-600 transition-colors">
               Explore Events
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

