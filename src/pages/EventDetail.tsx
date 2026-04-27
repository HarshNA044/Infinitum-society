import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, ArrowLeft, CheckCircle2, 
  Download, Clock, Tag, Share2, Info, ArrowRight, X
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { useApi } from '../hooks/useApi';
import { cn } from '../lib/utils';

export default function EventDetail_Page() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const [event, setEvent] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<any>(null);
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    email: ''
  });

  useEffect(() => {
    request('/api/events').then(data => {
      const ev = data.find((e: any) => e.id === id);
      if (ev) {
        setEvent(ev);
      } else {
        // Handle error or redirect
      }
    });
  }, [id]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await request('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          eventId: event.id
        })
      });
      setRegistrationSuccess(data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadTicket = () => {
    const doc = new jsPDF();
    doc.setFontSize(26);
    doc.setTextColor(20, 184, 166); // brand-500 (#14b8a6)
    doc.text('INFINITIUM SOCIETY', 20, 30);
    
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text('Event Registration Ticket', 20, 45);
    
    doc.setFontSize(12);
    doc.text(`Event: ${event.title}`, 20, 65);
    doc.text(`Student: ${registrationSuccess.studentName}`, 20, 75);
    doc.text(`Roll No: ${registrationSuccess.rollNo}`, 20, 85);
    doc.text(`Date & Time: ${event.date}`, 20, 95);
    
    doc.setFontSize(14);
    doc.text('Ticket ID:', 20, 115);
    doc.setFontSize(18);
    doc.text(registrationSuccess.ticketId, 20, 125);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('Please carry this ticket (digital or print) to the venue.', 20, 145);
    doc.text('Entry will be granted after QR scan.', 20, 152);

    doc.save(`Ticket_${registrationSuccess.ticketId}.pdf`);
  };

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
    </div>
  );

  const isPast = event.status === 'Past';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-zinc-950 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20">
          <div className="max-w-7xl mx-auto text-center">
             <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-brand-500 text-brand-950 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {event.type}
                </span>
                <span className={cn(
                  "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border",
                  isPast ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-emerald-100 text-emerald-600 border-emerald-200"
                )}>
                  {event.status}
                </span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none italic uppercase mb-8">
               {event.title}
             </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="space-y-12">
            <div>
               <h2 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 mb-2">
                 {event.subtitle || "Exploring the Frontiers of Physics"}
               </h2>
               <div className="flex flex-wrap gap-8 items-center mt-6 py-6 border-y border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500">
                     <Calendar className="w-4 h-4 text-brand-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                     <MapPin className="w-4 h-4 text-brand-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                     <Tag className="w-4 h-4 text-brand-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{event.type}</span>
                  </div>
               </div>
            </div>

            <div className="prose prose-slate max-w-none">
               <p className="text-xl text-slate-600 font-medium leading-relaxed">
                 {event.description}
               </p>
               
               <div className="mt-12 pt-12 border-t border-slate-100">
                 {isPast ? (
                   <div className="inline-block px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-slate-200">
                      Registration Closed
                   </div>
                 ) : (
                   <button 
                     onClick={() => setIsRegistering(true)}
                     className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center gap-3"
                   >
                     Register for Event <ArrowRight className="w-4 h-4" />
                   </button>
                 )}
               </div>
            </div>

            <div className="flex items-center gap-4 pt-10">
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest">
                  <Share2 className="w-4 h-4" /> Share
               </button>
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest">
                  <Info className="w-4 h-4" /> Policy
               </button>
            </div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isRegistering && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!registrationSuccess) setIsRegistering(false);
              }}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200"
            >
              {!registrationSuccess ? (
                <div className="p-10 md:p-14">
                   <div className="flex justify-between items-center mb-10">
                     <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Register</h2>
                     <button onClick={() => setIsRegistering(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                       <X className="w-6 h-6" />
                     </button>
                   </div>
                   
                   <div className="bg-brand-950 p-8 rounded-3xl mb-10 text-white relative overflow-hidden border border-brand-900">
                     <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.3em] mb-2">EVENT CONFIRMATION</p>
                     <p className="text-xl font-bold italic text-brand-200">{event?.title}</p>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-2xl rotate-45 transform translate-x-12 -translate-y-12"></div>
                   </div>

                   <form onSubmit={handleRegister} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                          <input 
                            required
                            type="text" 
                            value={formData.studentName}
                            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand-600 focus:ring-4 focus:ring-brand-100 transition-all outline-none font-bold text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">College Roll No</label>
                          <input 
                            required
                            type="text" 
                            value={formData.rollNo}
                            onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand-600 focus:ring-4 focus:ring-brand-100 transition-all outline-none font-bold text-sm"
                            placeholder="22/CS/001"
                          />
                        </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">University Email</label>
                       <input 
                         required
                         type="email" 
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand-600 focus:ring-4 focus:ring-brand-100 transition-all outline-none font-bold text-sm"
                         placeholder="name@arsd.du.ac.in"
                       />
                     </div>
                     <button 
                       disabled={loading}
                       type="submit"
                       className="w-full py-5 bg-brand-600 text-white rounded-3xl font-black uppercase text-sm tracking-[0.2em] hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/20 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-brand-600/10"
                     >
                       {loading ? 'Processing...' : 'Confirm Registration'}
                     </button>
                   </form>
                </div>
              ) : (
                <div className="p-10 md:p-14 text-center">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Success</h2>
                  <p className="text-xs text-slate-500 mb-10 font-bold uppercase tracking-widest leading-loose">
                    Registration confirmed for <span className="text-brand-600 italic">{event?.title}</span>. 
                    <br />Save the ticket below.
                  </p>
                  
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200 mb-10 flex flex-col items-center shadow-inner">
                    <div className="bg-white p-4 rounded-3xl shadow-2xl">
                      <QRCodeSVG 
                        value={registrationSuccess.ticketId} 
                        size={180}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <p className="mt-8 font-black text-[10px] text-slate-400 tracking-[0.4em] uppercase">{registrationSuccess.ticketId}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={downloadTicket}
                      className="w-full py-5 bg-brand-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20"
                    >
                      <Download className="w-5 h-5" /> Download PDF Ticket
                    </button>
                    <button 
                      onClick={() => {
                        setIsRegistering(false);
                        setRegistrationSuccess(null);
                        setFormData({ studentName: '', rollNo: '', email: '' });
                      }}
                      className="w-full py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors"
                    >
                      Return to Details
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
