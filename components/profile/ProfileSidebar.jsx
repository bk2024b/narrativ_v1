// components/profile/ProfileSidebar.jsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, LogOut, BookOpen, Calendar, Mic, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProfileSidebar({ profile, isOwner, onEditProfile, onSignOut }) {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Animation variants pour les étiquettes de texte
  const labelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      className="fixed left-0 top-0 h-full bg-gray-900/90 border-r border-gray-700/50 backdrop-blur-sm z-20"
      initial={{ width: '5rem' }}
      animate={{ width: isExpanded ? '14rem' : '5rem' }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full py-8 items-center">
        {/* Logo Narrativ */}
        <div className="mb-12 px-4">
          <Link href="/">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              
              <motion.span
                variants={labelVariants}
                initial="hidden"
                animate={isExpanded ? "visible" : "hidden"}
                transition={{ duration: 0.3 }}
                className="ml-2 font-bold text-teal-400"
              >
                Narrativ
              </motion.span>
            </div>
          </Link>
        </div>
        
        {/* Profil utilisateur */}
        {isOwner && (
          <div className="mb-8 relative">
            <button 
              onClick={onEditProfile}
              className="relative overflow-hidden group rounded-full border-2 border-teal-500 p-0.5"
            >
              <div className="w-12 h-12 overflow-hidden rounded-full bg-gradient-to-br from-teal-600/20 to-teal-400/5">
                <img
                  src={profile?.photo_url || '/placeholder-user.png'}
                  alt="Profil"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                <Edit className="w-5 h-5 text-white" />
              </div>
            </button>
            {isExpanded && (
              <motion.div
                variants={labelVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-center mt-2 text-xs text-gray-300"
              >
                Éditer profil
              </motion.div>
            )}
          </div>
        )}
        
        {/* Menu items */}
        <div className="flex flex-col gap-6 items-center">
          {/* Feed */}
          <SidebarItem 
            icon={<BookOpen className="w-5 h-5" />} 
            label="Feed"
            isExpanded={isExpanded}
            onClick={() => router.push('/feed')}
          />
          
          {/* Interview (fonctionnalité future) */}
          <SidebarItem 
            icon={<Mic className="w-5 h-5" />} 
            label="Interview"
            isExpanded={isExpanded}
            onClick={() => {}}
            disabled={true}
          />
          
          {/* Schedule (fonctionnalité future) */}
          <SidebarItem 
            icon={<Calendar className="w-5 h-5" />} 
            label="Schedule"
            isExpanded={isExpanded}
            onClick={() => {}}
            disabled={true}
          />
          
          {/* Community */}
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="Communauté"
            isExpanded={isExpanded}
            onClick={() => {}}
            disabled={true}
          />
        </div>
        
        {/* Déconnexion en bas */}
        {isOwner && (
          <div className="mt-auto">
            <SidebarItem 
              icon={<LogOut className="w-5 h-5" />} 
              label="Déconnexion"
              isExpanded={isExpanded}
              onClick={onSignOut}
              className="text-red-400 hover:text-red-300"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Composant item de la sidebar
function SidebarItem({ icon, label, isExpanded, onClick, disabled = false, className = "text-teal-400 hover:text-teal-300" }) {
  const labelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }
  
  return (
    <div className="w-full px-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center w-full py-2 px-2 ${isExpanded ? 'justify-start' : 'justify-center'} rounded-lg transition-colors duration-300 hover:bg-gray-800/70 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      >
        <div className="flex-shrink-0">
          {icon}
        </div>
        
        {isExpanded && (
          <motion.span
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            className="ml-3 font-medium"
          >
            {label}
          </motion.span>
        )}
      </button>
    </div>
  )
}