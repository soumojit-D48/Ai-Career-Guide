import React, { useState, createContext, useContext } from "react";
import { Navbar } from "../Navbar";
import Sidebar from "../Sidebar";

export const LayoutContext = createContext();

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within Layout");
  }
  return context;
};

const Layout = ({ children }) => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
        activeTab,
        setActiveTab,
      }}
    >
      <div className="min-h-screen bg-background">
        <Navbar mode="dashboard" />
        <Sidebar />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main
          className={`pt-16 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
        >
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout