import React, { useState, useEffect, createContext, useContext } from "react";
import { Navbar } from "../Navbar";
import Sidebar from "../Sidebar";
import { useUser } from "@clerk/clerk-react";
import { useSyncUserMutation } from "@/api/authApi";

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
  const {user, isLoaded} = useUser()
  const [synced, setSynced] = useState(false); // ✅ Track if already synced


  //  useEffect(() => {
  //   const syncUser = async () => {
  //     // ✅ Only sync once per session
  //     if (isLoaded && user && !synced) {
  //       try {
  //         const response = await fetch('http://localhost:5000/api/auth/sync', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             clerkId: user.id,
  //             email: user.primaryEmailAddress?.emailAddress,
  //             name: user.fullName || user.firstName || 'User',
  //             avatar: user.imageUrl || ''
  //           })
  //         });
          
  //         const data = await response.json();
          
  //         if (data.success) {
  //           console.log('✅ User synced:', data.message);
  //           setSynced(true); // ✅ Mark as synced
  //         }
  //       } catch (err) {
  //         console.error('❌ Sync failed:', err);
  //       }
  //     }
  //   };

  //   syncUser();
  // }, [isLoaded, user, synced]); // ✅ Depends on synced



   const [syncUserApi] = useSyncUserMutation(); // hook

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && user && !synced) {
        try {
          const result = await syncUserApi({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || user.firstName || "User",
            avatar: user.imageUrl || "",
          }).unwrap();

          console.log("✅ User synced:", result.message);
          setSynced(true);
        } catch (error) {
          console.error("❌ Sync failed:", error);
        }
      }
    };

    syncUser();
  }, [isLoaded, user, synced]);


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