import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Star, Send, Download, Award, Search, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useApi } from '../hooks/useApi';
import { cn } from '../lib/utils';

export default function Feedback_Page() {
  const { request, loading } = useApi();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  
  // Certificate specific
  const [searchRoll, setSearchRoll] = useState('');
  const [certResult, setCertResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ rating, message: 'User feedback entry' })
    });
    setSubmitted(true);
  };

  const checkCertificate = async () => {
    // Simulated check for prototype
    // In real app, we'd query registrations where attended=true
    setCertResult({
      success: true,
      name: 'John Doe',
      event: 'AI Ethics Seminar',
      date: 'April 22, 2026'
    });
  };

  const downloadCert = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Aesthetic Border
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    
    // Background Decoration
    doc.setFillColor(249, 250, 251);
    doc.rect(12, 12, 273, 186, 'F');

    doc.setFontSize(40);
    doc.setTextColor(30, 41, 59);
    doc.text('CERTIFICATE', 148.5, 50, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text('OF RECOGNITION', 148.5, 65, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text('THIS IS PROUDLY PRESENTED TO', 148.5, 90, { align: 'center' });
    
    doc.setFontSize(32);
    doc.setTextColor(79, 70, 229);
    doc.text(certResult.name.toUpperCase(), 148.5, 110, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text(`for successfully participating in the event:`, 148.5, 130, { align: 'center' });
    
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text(certResult.event, 148.5, 145, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Dated: ${certResult.date}`, 148.5, 160, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('____________________', 60, 180, { align: 'center' });
    doc.text('SOCIETY CONVENOR', 60, 188, { align: 'center' });
    
    doc.text('____________________', 230, 180, { align: 'center' });
    doc.text('SOCIETY PRESIDENT', 230, 188, { align: 'center' });

    doc.save(`Certificate_${certResult.name}.pdf`);
  };

  return (
    <div className="py-24 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Feedback Area */}
        <div>
           <h1 className="text-5xl font-bold tracking-tight mb-8">Share Your Thought</h1>
           <p className="text-zinc-500 text-lg mb-12">Your feedback helps Infinitum grow better and serve the student community better.</p>
           
           {!submitted ? (
             <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
                <div>
                   <label className="text-sm font-bold block mb-4">How was your overall experience?</label>
                   <div className="flex gap-4">
                      {[1,2,3,4,5].map(s => (
                        <button 
                          type="button"
                          key={s} 
                          onClick={() => setRating(s)}
                          className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                            rating >= s ? "bg-indigo-600 text-white" : "bg-white text-zinc-300"
                          )}
                        >
                          <Star className={cn("w-6 h-6", rating >= s && "fill-white")} />
                        </button>
                      ))}
                   </div>
                </div>
                <div>
                   <label className="text-sm font-bold block mb-4">Your detailed feedback</label>
                   <textarea className="w-full px-6 py-4 bg-white rounded-[2rem] h-40 border-2 border-zinc-100 outline-none focus:border-indigo-600 transition-all" placeholder="What did you like the most?"></textarea>
                </div>
                <button className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                   Submit Feedback <Send className="w-5 h-5" />
                </button>
             </form>
           ) : (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }}
               className="bg-emerald-50 p-12 rounded-[3.5rem] text-center border-2 border-emerald-100"
             >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                   <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-900 mb-4">Thank You!</h3>
                <p className="text-emerald-700">We appreciate your time. Your feedback has been recorded.</p>
             </motion.div>
           )}
        </div>

        {/* Certificate Area */}
        <div>
           <div className="bg-zinc-900 p-12 md:p-16 rounded-[4rem] text-white h-full flex flex-col justify-center">
              <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-400 mb-8">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Claim Your Certificate</h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                If you attended our recent event and your attendance was marked by the admin team, your certificate is ready.
              </p>

              <div className="space-y-6">
                 <div className="relative">
                    <input 
                      value={searchRoll}
                      onChange={(e) => setSearchRoll(e.target.value)}
                      className="w-full px-8 py-5 bg-white/10 rounded-3xl border border-white/20 outline-none focus:bg-white/20 transition-all pr-32" 
                      placeholder="Enter Roll Number (e.g. 22/CS/001)" 
                    />
                    <button 
                      onClick={checkCertificate}
                      className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-all"
                    >
                      <Search className="w-4 h-4" /> Check
                    </button>
                 </div>

                 <AnimatePresence>
                    {certResult && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-white/10 p-8 rounded-3xl border border-white/10 space-y-6 overflow-hidden"
                      >
                         <div className="flex justify-between items-center">
                           <div>
                              <p className="font-bold text-xl">{certResult.name}</p>
                              <p className="text-zinc-500">{certResult.event}</p>
                           </div>
                           <CheckCircle className="text-emerald-500 w-8 h-8" />
                         </div>
                         <button 
                           onClick={downloadCert}
                           className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-bold hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
                         >
                           <Download className="w-5 h-5" /> Download Certificate
                         </button>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
