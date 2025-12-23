import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, Settings, Lock, ChevronDown, ChevronUp, HelpCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/utils/routes';
import { useAuth } from '@/shared/contexts/authContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}
const sidebarItems = [{
  id: ROUTES.userList,
  label: 'User Management',
  icon: Users
}, {
  id: ROUTES.courseList,
  label: 'Course Management',
  icon: FileText
}, {
  id: ROUTES.staticPages,
  label: 'Pages Management',
  icon: FileText
}, {
  id: ROUTES.faqList,
  label: 'FAQ Management',
  icon: HelpCircle
}];
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  onPageChange
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  return <div className="h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside initial={false} animate={{
      width: isSidebarExpanded ? 320 : 100
    }} transition={{
      duration: 0.3,
      ease: "easeInOut"
    }} className="bg-white/90 backdrop-blur-md m-3 rounded-2xl shadow-xl border border-gray-200/50 flex flex-col h-[calc(100vh-1.5rem)] overflow-hidden relative overflow-visible">

        {/* Toggle Button - positioned on the right side of sidebar, half outside */}
        <div className="absolute top-[13.5%] -translate-y-1/2 -right-5 z-30">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="hover:bg-gray-100 rounded-xl h-10 w-10 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200">
            {isSidebarExpanded ? <ChevronLeft className="w-5 h-5 text-gray-700" /> : <ChevronRight className="w-5 h-5 text-gray-700" />}
          </Button>
        </div>

        <div className="border-b border-gray-200/60 flex-shrink-0 relative p-8">
          <div className="flex items-center justify-left">
            <AnimatePresence mode="wait">
              {isSidebarExpanded ? <motion.div key="expanded-header" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.2
            }} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">Admin Panel</h2>
                    <p className="text-sm font-light text-gray-600">Management Console</p>
                  </div>
                </motion.div> : <motion.div key="collapsed-header" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.2
            }} className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg mx-auto px-[12px]">
                  <Settings className="w-6 h-6 text-white" />
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>

        <nav className={`${isSidebarExpanded ? 'p-6' : 'p-4'} space-y-3 flex-1 overflow-y-auto`}>
          {sidebarItems.map(item => <motion.button key={item.id} onClick={() => onPageChange(item.id)} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className={`w-full flex items-center ${isSidebarExpanded ? 'space-x-4 px-5 justify-start' : 'justify-center px-0'} py-4 rounded-xl transition-all duration-200 group ${currentPage === item.id ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary shadow-sm' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:shadow-sm'}`} title={!isSidebarExpanded ? item.label : undefined}>
              <item.icon className={`w-5 h-5 flex-shrink-0 ${currentPage === item.id ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'}`} />
              <AnimatePresence>
                {isSidebarExpanded && <motion.span initial={{
              opacity: 0,
              width: 0
            }} animate={{
              opacity: 1,
              width: 'auto'
            }} exit={{
              opacity: 0,
              width: 0
            }} transition={{
              duration: 0.2
            }} className="font-normal text-medium whitespace-nowrap overflow-hidden">
                    {item.label}
                  </motion.span>}
              </AnimatePresence>
            </motion.button>)}
        </nav>

        <div className={`${isSidebarExpanded ? 'p-6' : 'p-4'} border-t border-gray-200/60 flex-shrink-0`}>
          <motion.div onClick={() => isSidebarExpanded && setIsProfileExpanded(!isProfileExpanded)} className={`flex items-center ${isSidebarExpanded ? 'space-x-4' : 'justify-center'} mb-3 ${isSidebarExpanded ? 'cursor-pointer hover:bg-gray-50' : ''} p-3 rounded-xl transition-colors`}>
            <Avatar className="h-11 w-11 border-2 border-gray-200 flex-shrink-0">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {isSidebarExpanded && <motion.div initial={{
              opacity: 0,
              width: 0
            }} animate={{
              opacity: 1,
              width: 'auto'
            }} exit={{
              opacity: 0,
              width: 0
            }} transition={{
              duration: 0.2
            }} className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin User'}</p>
                      <p className="text-xs font-light text-gray-600 truncate">{user?.email || 'admin@example.com'}</p>
                    </div>
                    <div className="flex items-center justify-center ml-2">
                      {isProfileExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isProfileExpanded && isSidebarExpanded && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            duration: 0.2
          }} className="space-y-2 overflow-hidden">
                <motion.button onClick={() => onPageChange(ROUTES.profile)} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === ROUTES.profile ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}>
                  <User className="w-4 h-4" />
                  <span className="text-sm font-normal">Edit Profile</span>
                </motion.button>

                <motion.button onClick={() => onPageChange(ROUTES.changePassword)} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === ROUTES.changePassword ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}>
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-normal">Change Password</span>
                </motion.button>

                <motion.button onClick={logout} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-50 text-red-600 hover:text-red-700">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className="text-sm font-normal">Logout</span>
                </motion.button>
              </motion.div>}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md ml-3 mr-3 mt-3 mb-0 rounded-2xl p-6 flex items-center shadow-lg border border-gray-200/50 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">
              {currentPage === ROUTES.userList && 'User Management'}
              {currentPage === ROUTES.courseList && 'Course Management'}
              {currentPage === ROUTES.staticPages && 'Pages Management'}
              {currentPage === ROUTES.faqList && 'FAQ Management'}
              {currentPage === ROUTES.profile && 'Profile Settings'}
              {currentPage === ROUTES.changePassword && 'Change Password'}
            </h1>
            <p className="text-sm font-light text-gray-600 mt-1">
              {currentPage === ROUTES.userList && 'Manage system users and their permissions'}
              {currentPage === ROUTES.courseList && 'Create, edit and organize courses'}
              {currentPage === ROUTES.staticPages && 'Edit and organize your website pages'}
              {currentPage === ROUTES.faqList && 'Maintain frequently asked questions'}
              {currentPage === ROUTES.profile && 'Update your personal information'}
              {currentPage === ROUTES.changePassword && 'Secure your account with a new password'}
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-3 pb-3 pt-3 overflow-hidden">
          <motion.div key={currentPage} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3
        }} className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200/50 h-full overflow-auto py-[32px]">
            {children}
          </motion.div>
        </main>
      </div>
    </div>;
};
export default DashboardLayout;