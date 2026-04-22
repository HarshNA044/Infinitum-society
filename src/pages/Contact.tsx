import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Contact_Page() {
  return (
    <div className="py-24 px-4 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl font-bold tracking-tighter text-zinc-900 mb-8 leading-tight">Let's build <br /><span className="text-indigo-600">the future</span> together.</h1>
            <p className="text-xl text-zinc-500 mb-12 max-w-md leading-relaxed">
              Have questions about INFINITIUM? Want to collaborate or sponsor our next big event? Reach out to us.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-zinc-100">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-bold text-lg mb-1">Our Location</h4>
                   <p className="text-zinc-500">Dhuala Kuan, New Delhi, Delhi 110021<br />University of Delhi South Campus</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-zinc-100">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-bold text-lg mb-1">Email Us</h4>
                   <p className="text-zinc-500">infinitium@arsd.du.ac.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-zinc-100"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-sm font-bold text-zinc-900">Your Name</label>
                   <input className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-3xl focus:border-indigo-600 outline-none transition-all" placeholder="Alex" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-sm font-bold text-zinc-900">Email Address</label>
                   <input className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-3xl focus:border-indigo-600 outline-none transition-all" placeholder="alex@gmail.com" />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-sm font-bold text-zinc-900">Message</label>
                 <textarea className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-3xl h-40 focus:border-indigo-600 outline-none transition-all" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-5 bg-zinc-900 text-white rounded-[2rem] font-bold text-lg hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
