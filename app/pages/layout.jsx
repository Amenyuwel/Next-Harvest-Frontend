"use client";
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/UI/Sidebar'

export default function PagesLayout({ children }) {
  const pathname = usePathname()
  
  // Don't show sidebar on login pages
  const isLoginPage = pathname.includes('/login')
  
  if (isLoginPage) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar with entrance animation */}
      <motion.div 
        className="flex-shrink-0 h-full p-4 bg-bgColor"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Sidebar />
      </motion.div>
      
      {/* Main Content with page transitions */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeInOut",
              delay: 0.1 
            }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}