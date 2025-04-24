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
    <div className="min-h-screen bg-gray-900 text-white">
   
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-md mx-auto"
          >
            <div className="flex justify-center mb-10">
              <div className="flex items-center justify-center flex-col">
                <div className="relative h-20 w-20 mb-6 overflow-hidden rounded-full shadow-lg border-2 border-teal-500">
                  <div className="flex items-center justify-center h-full w-full bg-gray-900">
                    <BookOpen size={40} color="#2C9DB8" strokeWidth={2} />
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Narr<span className="text-teal-500">a</span>tiv
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-teal-600 to-teal-400"></div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-10 rounded-2xl border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-8 text-center font-serif">
                Connectez-vous à votre compte
              </h2>
              
              <AuthButtons />
              
              <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm">
                  En vous connectant, vous acceptez nos{' '}
                  <Link href="#" className="text-teal-400 hover:text-teal-300">
                    Conditions d'utilisation
                  </Link>{' '}
                  et notre{' '}
                  <Link href="#" className="text-teal-400 hover:text-teal-300">
                    Politique de confidentialité
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-400">
                Nouveau sur Narrativ ?{' '}
                <Link href="/signup" className="text-teal-400 hover:text-teal-300 font-semibold">
                  Créer un compte
                </Link>
              </p>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-40 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-5 z-0"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gray-700 rounded-full filter blur-3xl opacity-5 z-0"></div>
          </motion.div>
        </div>
      </main>
      
     
    </div>
  );
}