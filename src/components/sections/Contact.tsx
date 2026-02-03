'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare, Youtube } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { GlassButton } from '../GlassButton';
import { ParallaxSection } from '../ParallaxSection';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
        return;
      }

      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Men bilan bog'lanish
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Sizga telegram bot yoki web-sayt kerakmi?, menga qandaydur taklifingiz bormi? bog'laning:
            </p>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <ParallaxSection speed={0.8}>
            <div className="space-y-6">
              <GlassCard depth="medium">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <a href="mailto:sardorbektexno@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Sardorbektexno@gamil.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard depth="medium">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Telefon</h3>
                    <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      +998 94 089 0907
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard depth="medium">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Lokatsiya</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Namangan, Uzbekistan
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Social Media */}
              <GlassCard depth="medium">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ijtimoiy tarmoqlar:</h3>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://github.com/vipdasturchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Twitter className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://t.me/YaxshiBola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <MessageSquare className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://instagram.com/sardorbek_07_20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058 1.265-.07 1.644-.07 4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/Sardorbek_Mashrabboyev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Youtube className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </GlassCard>
            </div>
          </ParallaxSection>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ParallaxSection speed={0.6}>
              <GlassCard depth="high">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Xabar yuboring
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-900 dark:text-white mb-2">
                        Ismingiz
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                        placeholder="Ismingizni yozing"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-900 dark:text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                        placeholder="emailingizni yozing"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-900 dark:text-white mb-2">
                      Maqsad
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      placeholder="Nima maqsadda yozyapsiz yozing:?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-900 dark:text-white mb-2">
                      Xabar
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none"
                      placeholder="Batafsil xabaringizni yozing"
                    />
                  </div>
                  <div>
                    <GlassButton variant="primary" size="lg" className="w-full">
                      {isSubmitting ? 'Yuborilyapti...' : 'Xabar yuborish'}
                      <Send className="w-5 h-5 ml-2 inline" />
                    </GlassButton>
                  </div>
                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-600 dark:text-green-400 text-center">
                      Xabar yuborildi ✅ Tez orada siz bilan bog‘lanaman
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 text-center">
                      Xatolik yuz berdi ❌ Qayta urinib ko‘ring
                    </div>
                  )}
                </form>
              </GlassCard>
            </ParallaxSection>
          </div>
        </div>
      </div>
    </div>
  );
}
