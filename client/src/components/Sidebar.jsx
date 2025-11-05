



import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  LogOut,
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  QrCode,
  MessageSquare,
  FileText,
  BarChart3,
  GraduationCap,
  Compass,
  Briefcase,
  BookOpen,
  Bot,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLayout } from './layoutComponents/Layout';

const Sidebar = () => {
  const navigate = useNavigate();
  
  // ✅ Get sidebar state from Context
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, activeTab, setActiveTab } = useLayout();
  
  // ✅ Static user data for demo
  const userData = {
    name: 'John Doe',
    // careerGoal: 'Frontend Devloper'
    
  };

    const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'career-quiz', icon: ClipboardList, label: 'Career Quiz', path: '/quiz' },
    { id: 'college-finder', icon: GraduationCap, label: 'College Finder', path: '/college-finder' },
    { id: 'ai-roadmap', icon: Compass, label: 'AI Roadmap', path: '/ai-roadmap' },
    { id: 'job-hunting', icon: Briefcase, label: 'Job Hunting', path: '/job-internships' },
    { id: 'resume-analyzer', icon: FileText, label: 'Resume Analyzer', path: '/resume-analyzer' },
    { id: 'courses', icon: BookOpen, label: 'Learning Resources', path: '/courses' },
    { id: 'ai-mentor', icon: Bot, label: '1v1 AI Mentor', path: '/ai-mentor' },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside
      className={`fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-card border-r border-border 
      transition-all duration-300 ease-in-out flex flex-col shadow-soft
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0
      ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
      w-64`}
    >

    
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {/* User Info - Full */}
        {!sidebarCollapsed && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {userData.name}
                </p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  {userData?.careerGoal}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Avatar Only - Collapsed */}
        {sidebarCollapsed && (
          <div className="hidden lg:flex mb-6 justify-center">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Menu Items */}
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                  navigate(item.path);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 
                  ${sidebarCollapsed ? 'lg:justify-center' : ''}
                  ${
                  activeTab === item.id
                    ? 'bg-primary/10 text-primary border-l-4 border-primary shadow-soft'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground border-l-4 border-transparent'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border p-3">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => {
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
                ${sidebarCollapsed ? 'lg:justify-center' : ''}
                ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              title={sidebarCollapsed ? 'Settings' : ''}
            >
              <Settings className={`w-5 h-5 shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && <span className="font-medium text-sm">Settings</span>}
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-3 text-destructive rounded-lg hover:bg-destructive/50 transition-all duration-200
                ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut className={`w-5 h-5 shrink-0 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;