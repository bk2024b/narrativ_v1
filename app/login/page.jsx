'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthButtons from '@/components/auth/AuthButtons';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-5 z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-400 rounded-full filter blur-3xl opacity-5 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-5 z-0"></div>
      
      <main className="container mx-auto px-6 py-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-md mx-auto"
        >
          <div className="flex justify-center mb-10">
            <div className="flex items-center justify-center flex-col">
              <div className="relative h-20 w-20 mb-6 overflow-hidden rounded-full shadow-lg border-2 border-teal-500 bg-gradient-to-br from-teal-500/20 to-teal-500/5">
                <div className="flex items-center justify-center h-full w-full">
                  <BookOpen size={40} color="#2DD4BF" strokeWidth={2} />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Narr<span className="text-teal-400">a</span>tiv
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Connectez-vous à votre compte
            </h2>
            
            <AuthButtons mode="login" />
            
            <div className="mt-10 pt-6 border-t border-gray-700/50 text-center">
              <p className="text-gray-400 text-sm">
                En vous connectant, vous acceptez nos{' '}
                <Link href="#" className="text-teal-400 hover:text-teal-300 hover:underline">
                  Conditions d'utilisation
                </Link>{' '}
                et notre{' '}
                <Link href="#" className="text-teal-400 hover:text-teal-300 hover:underline">
                  Politique de confidentialité
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}