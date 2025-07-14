"use client";
import { usePathname } from 'next/navigation';
import Sidebar from './UI/Sidebar';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current path is a dashboard page
  const isDashboardPage = pathname?.startsWith('/pages/dashboard') || 
                         pathname?.startsWith('/pages/inventory') ||
                         pathname?.startsWith('/pages/train') ||
                         pathname?.startsWith('/pages/reports') ||
                         pathname?.startsWith('/pages/profile') ||
                         pathname?.startsWith('/pages/settings');
  
  if (isDashboardPage) {
    return (
      <main className="bg-white w-full h-screen p-6">
        <div className='bg-[#F3F3F3] rounded-3xl shadow-2xl overflow-hidden w-full h-full flex p-6 gap-6'>
          {/* Sidebar for dashboard pages */}
          <Sidebar />
          
          {/* Page Content */}
          <div className='flex-1 bg-white rounded-3xl p-8 overflow-auto'>
            {children}
          </div>
        </div>
      </main>
    );
  }
  
  // For non-dashboard pages (like login), render children directly
  return <>{children}</>;
}