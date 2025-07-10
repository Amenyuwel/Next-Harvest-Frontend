"use client";
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/UI/Sidebar'
import GlobalHeader from '../components/GlobalHeader'

export default function PagesLayout({ children }) {
  const pathname = usePathname()
  
  // Don't show sidebar on login pages
  const isLoginPage = pathname.includes('/login')
  
  // Get page-specific header configuration
  const getHeaderConfig = () => {
    switch (pathname) {
      case '/pages/dashboard':
        return {
          title: "Hi Admin!",
          showAddButton: true,
          addButtonText: "Add Farmer",
          onAddClick: () => console.log("Add farmer clicked")
        }
      case '/pages/train':
        return {
          title: "Train Model",
          showAddButton: true,
          addButtonText: "Preview model",
          onAddClick: () => console.log("Preview model clicked")
        }
      case '/pages/analyze':
        return {
          title: "Analyze",
          showAddButton: false,
          addButtonText: "",
          onAddClick: () => {}
        }
      case '/pages/settings':
        return {
          title: "Settings",
          showAddButton: false,
          addButtonText: "",
          onAddClick: () => {}
        }
      case '/pages/reports':
        return {
          title: "Reports",
          showAddButton: true,
          addButtonText: "Generate Report",
          onAddClick: () => console.log("Generate report clicked")
        }
      default:
        return {
          title: "Hi Admin!",
          showAddButton: false,
          addButtonText: "",
          onAddClick: () => {}
        }
    }
  }

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

  const headerConfig = getHeaderConfig()

  return (
    <div className="flex h-screen bg-bgColor p-4">
      {/* Main container with white background and rounded edges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full h-full bg-[#F3F3F3] rounded-3xl shadow-sm overflow-hidden"
      >
        {/* Sidebar inside the white container */}
        <motion.div 
          className="flex-shrink-0 p-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <Sidebar />
        </motion.div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Global Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
            className="flex-shrink-0"
          >
            <GlobalHeader 
              title={headerConfig.title}
              showAddButton={headerConfig.showAddButton}
              addButtonText={headerConfig.addButtonText}
              onAddClick={headerConfig.onAddClick}
              showProfile={true}
            />
          </motion.div>

          {/* Page Content with transitions */}
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
                  delay: 0.2 
                }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}