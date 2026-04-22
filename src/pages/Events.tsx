import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Search, Filter, ArrowRight, X, 
  CheckCircle2, Download, QrCode as QrIcon
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { useApi } from '../hooks/useApi';
import { cn } from '../lib/utils';

export default function Events_Page() {
  const [searchParams] = useSearchParams();
  const registerId = searchParams.get('register');
  
  const { request, loading } = useApi();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<any>(null);
  const [filter, setFilter] = useState('All');

  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    email: ''
  });

  useEffect(() => {
    request('/api/events').then(data => {
      setEvents(data);
      if (registerId) {
        const ev = data.find((e: any) => e.id === registerId);
        if (ev) {
          setSelectedEvent(ev);
          setIsRegistering(true);
        }
      }
    });
  }, [registerId]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await request('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          eventId: selectedEvent.id
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
    doc.text(`Event: ${selectedEvent.title}`, 20, 65);
    doc.text(`Student: ${registrationSuccess.studentName}`, 20, 75);
    doc.text(`Roll No: ${registrationSuccess.rollNo}`, 20, 85);
    doc.text(`Date & Time: ${selectedEvent.date}`, 20, 95);
    
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

  const filteredEvents = events.filter((e: any) => filter === 'All' || e.type === filter);

  return (
    <div className="py-20 px-4 min-h-screen bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-100">
              <Calendar className="w-3 h-3" /> Schedule
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-8 italic uppercase">
              Events & <br /> <span className="text-brand-600">Archive</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm leading-relaxed uppercase tracking-widest text-right">
            Broaden your horizons with our planned seminars and vibrant fests.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Seminar', 'Fest', 'Workshop'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2 rounded-full font-bold transition-all",
                filter === f 
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-100" 
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: any) => (
            <motion.div
              layout
              key={event.id}
              className="bento-card group"
            >
              <div className="mb-6 flex justify-between items-start">
                <div className="bg-brand-50 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-brand-100 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[10px] bento-tag bg-slate-100 text-slate-500 font-black">{event.date}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tighter uppercase leading-tight group-hover:text-brand-600 transition-colors italic">{event.title}</h3>
              <p className="text-xs text-slate-500 mb-8 leading-relaxed line-clamp-3 font-medium">
                {event.description}
              </p>
              
              <div className="flex items-center gap-2 text-slate-400 mb-8 text-[10px] font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-brand-600" />
                {event.location}
              </div>

              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setIsRegistering(true);
                }}
                className="w-full py-4 bg-brand-950 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-600 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-brand-600/20 active:scale-95 border border-brand-900"
              >
                Get Ticket <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
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
                     <p className="text-xl font-bold italic text-brand-200">{selectedEvent?.title}</p>
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
                    Registration confirmed for <span className="text-brand-600 italic">{selectedEvent?.title}</span>. 
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
                        setSelectedEvent(null);
                        setFormData({ studentName: '', rollNo: '', email: '' });
                      }}
                      className="w-full py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors"
                    >
                      Return to Events
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
