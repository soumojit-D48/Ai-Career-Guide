// import React, { useState, useEffect, createContext, useContext } from "react";
// import { Navbar } from "../Navbar";
// import Sidebar from "../Sidebar";
// import { useUser } from "@clerk/clerk-react";
// import { useSyncUserMutation } from "@/api/authApi";

// export const LayoutContext = createContext();

// export const useLayout = () => {
//   const context = useContext(LayoutContext);
//   if (!context) {
//     throw new Error("useLayout must be used within Layout");
//   }
//   return context;
// };

// const Layout = ({ children }) => {
//    const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const {user, isLoaded} = useUser()
//   const [synced, setSynced] = useState(false); // ✅ Track if already synced


//   //  useEffect(() => {
//   //   const syncUser = async () => {
//   //     // ✅ Only sync once per session
//   //     if (isLoaded && user && !synced) {
//   //       try {
//   //         const response = await fetch('http://localhost:5000/api/auth/sync', {
//   //           method: 'POST',
//   //           headers: {
//   //             'Content-Type': 'application/json',
//   //           },
//   //           body: JSON.stringify({
//   //             clerkId: user.id,
//   //             email: user.primaryEmailAddress?.emailAddress,
//   //             name: user.fullName || user.firstName || 'User',
//   //             avatar: user.imageUrl || ''
//   //           })
//   //         });
          
//   //         const data = await response.json();
          
//   //         if (data.success) {
//   //           console.log('✅ User synced:', data.message);
//   //           setSynced(true); // ✅ Mark as synced
//   //         }
//   //       } catch (err) {
//   //         console.error('❌ Sync failed:', err);
//   //       }
//   //     }
//   //   };

//   //   syncUser();
//   // }, [isLoaded, user, synced]); // ✅ Depends on synced



//    const [syncUserApi] = useSyncUserMutation(); // hook

//   useEffect(() => {
//     const syncUser = async () => {
//       if (isLoaded && user && !synced) {
//         try {
//           const result = await syncUserApi({
//             clerkId: user.id,
//             email: user.primaryEmailAddress?.emailAddress,
//             name: user.fullName || user.firstName || "User",
//             avatar: user.imageUrl || "",
//           }).unwrap();

//           console.log("✅ User synced:", result.message);
//           setSynced(true);
//         } catch (error) {
//           console.error("❌ Sync failed:", error);
//         }
//       }
//     };

//     syncUser();
//   }, [isLoaded, user, synced]);


//   return (
//     <LayoutContext.Provider
//       value={{
//         sidebarOpen,
//         setSidebarOpen,
//         sidebarCollapsed,
//         setSidebarCollapsed,
//         activeTab,
//         setActiveTab,
//       }}
//     >
//       <div className="min-h-screen bg-background">
//         <Navbar mode="dashboard" />
//         <Sidebar />

//         {/* Mobile overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Main content */}
//         <main
//           className={`pt-16 transition-all duration-300 ${
//             sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
//           }`}
//         >
//           {children}
//         </main>
//       </div>
//     </LayoutContext.Provider>
//   );
// };

// export default Layout














// import React, { useState, useEffect, createContext, useContext, useRef } from "react";
// import { Navbar } from "../Navbar";
// import Sidebar from "../Sidebar";
// import { useUser } from "@clerk/clerk-react";
// import { useSyncUserMutation } from "@/api/authApi";
// // import { toast } from "sonner";
//  // or your toast library

// export const LayoutContext = createContext();

// export const useLayout = () => {
//   const context = useContext(LayoutContext);
//   if (!context) {
//     throw new Error("useLayout must be used within Layout");
//   }
//   return context;
// };

// const Layout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
  
//   // Clerk user data
//   const { user, isLoaded, isSignedIn } = useUser();
  
//   // Sync mutation
//   const [syncUserApi, { isLoading: isSyncing }] = useSyncUserMutation();
  
//   // Track if sync has been attempted (use ref to persist across renders)
//   const hasSyncedRef = useRef(false);
//   const [syncCompleted, setSyncCompleted] = useState(false);
//   // Add this inside your Layout component
// const testSync = async () => {
//   console.log("🧪 MANUAL TEST SYNC");
//   console.log("User object:", user);
//   console.log("User ID:", user?.id);
//   console.log("Email:", user?.primaryEmailAddress?.emailAddress);
  
//   try {
//     const result = await syncUserApi({
//       clerkId: user.id,
//       email: user.primaryEmailAddress?.emailAddress,
//       name: user.fullName || "Test User",
//       avatar: user.imageUrl || "",
//     }).unwrap();
    
//     console.log("✅ Manual sync result:", result);
//     alert("Check console and MongoDB!");
//   } catch (error) {
//     console.error("❌ Manual sync error:", error);
//     alert("Error: " + JSON.stringify(error));
//   }
// };

// // Add this button somewhere visible
// <button onClick={testSync} className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
//   TEST SYNC
// </button>

//   useEffect(() => {
//     const syncUser = async () => {
//       // ✅ Prevent multiple sync attempts
//       if (hasSyncedRef.current) {
//         console.log("⏭️ Sync already attempted, skipping...");
//         return;
//       }

//       // ✅ Wait for Clerk to load
//       if (!isLoaded) {
//         console.log("⏳ Waiting for Clerk to load...");
//         return;
//       }

//       // ✅ Check if user is signed in
//       if (!isSignedIn || !user) {
//         console.log("❌ No user signed in");
//         return;
//       }

//       // ✅ Validate user data
//       const email = user.primaryEmailAddress?.emailAddress || 
//                     user.emailAddresses?.[0]?.emailAddress;

//       if (!email) {
//         console.error("❌ No email found for user");
//         return;
//       }

//       // Mark as attempting sync
//       hasSyncedRef.current = true;

//       try {
//         console.log("🚀 Starting user sync...");
//         console.log("📦 User ID:", user.id);
//         console.log("📧 Email:", email);

//         const userData = {
//           clerkId: user.id,
//           email: email,
//           name: user.fullName || 
//                 `${user.firstName || ''} ${user.lastName || ''}`.trim() || 
//                 user.username || 
//                 email.split('@')[0],
//           avatar: user.imageUrl || '',
//         };

//         console.log("📤 Sending sync request:", userData);

//         const result = await syncUserApi(userData).unwrap();

//         console.log("✅ Sync successful:", result);
        
//         setSyncCompleted(true);

//         // Show success message
//         if (result.isNewUser) {
//           // toast.success("Welcome! Your account has been created.");
//         } else {
//           console.log("✅ User data synced");
//         }

//       } catch (error) {
//         console.error("❌ Sync failed:", error);
        
//         // Reset sync flag on error to allow retry
//         hasSyncedRef.current = false;
        
//         // Show error message
//         // toast.error("Failed to sync user data. Please refresh the page.");
//       }
//     };

//     syncUser();
//   }, [isLoaded, isSignedIn, user, syncUserApi]);

//   // Show loading state while syncing
//   if (isLoaded && isSignedIn && !syncCompleted && isSyncing) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Setting up your account...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <LayoutContext.Provider
//       value={{
//         sidebarOpen,
//         setSidebarOpen,
//         sidebarCollapsed,
//         setSidebarCollapsed,
//         activeTab,
//         setActiveTab,
//       }}
//     >
//       <div className="min-h-screen bg-background">
//         <Navbar mode="dashboard" />
//         <Sidebar />

//         {/* Mobile overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Main content */}
//         <main
//           className={`pt-16 transition-all duration-300 ${
//             sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
//           }`}
//         >
//           {children}
//         </main>
//       </div>
//     </LayoutContext.Provider>
//   );
// };

// export default Layout;















import React, { useState, useEffect, createContext, useContext, useRef } from "react";
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
  
  // Clerk user data
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Sync mutation
  const [syncUserApi, { isLoading: isSyncing }] = useSyncUserMutation();
  
  // Track if sync has been attempted (use ref to persist across renders)
  const hasSyncedRef = useRef(false);
  const [syncCompleted, setSyncCompleted] = useState(false);

  // ✅ TEST SYNC FUNCTION (for debugging)
  const testSync = async () => {
    console.log("🧪 MANUAL TEST SYNC");
    console.log("User object:", user);
    console.log("User ID:", user?.id);
    console.log("Email:", user?.primaryEmailAddress?.emailAddress);
    
    try {
      const result = await syncUserApi({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || "Test User",
        avatar: user.imageUrl || "",
      }).unwrap();
      
      console.log("✅ Manual sync result:", result);
      alert("Check console and MongoDB!");
    } catch (error) {
      console.error("❌ Manual sync error:", error);
      alert("Error: " + JSON.stringify(error));
    }
  };

  useEffect(() => {
    console.log("🔵 Clerk Status:");
    console.log("- isLoaded:", isLoaded);
    console.log("- isSignedIn:", isSignedIn);
    console.log("- user:", user);
    console.log("- user.id:", user?.id);
    console.log("- email:", user?.primaryEmailAddress?.emailAddress);

    const syncUser = async () => {
      // ✅ Prevent multiple sync attempts
      if (hasSyncedRef.current) {
        console.log("⏭️ Sync already attempted, skipping...");
        return;
      }

      // ✅ Wait for Clerk to load
      if (!isLoaded) {
        console.log("⏳ Waiting for Clerk to load...");
        return;
      }

      // ✅ Check if user is signed in
      if (!isSignedIn || !user) {
        console.log("❌ No user signed in");
        return;
      }

      // ✅ Validate user data
      const email = user.primaryEmailAddress?.emailAddress || 
                    user.emailAddresses?.[0]?.emailAddress;

      if (!email) {
        console.error("❌ No email found for user");
        return;
      }

      // Mark as attempting sync
      hasSyncedRef.current = true;

      try {
        console.log("🚀 Starting user sync...");
        console.log("📦 User ID:", user.id);
        console.log("📧 Email:", email);

        const userData = {
          clerkId: user.id,
          email: email,
          name: user.fullName || 
                `${user.firstName || ''} ${user.lastName || ''}`.trim() || 
                user.username || 
                email.split('@')[0],
          avatar: user.imageUrl || '',
        };

        console.log("📤 Sending sync request:", userData);

        const result = await syncUserApi(userData).unwrap();

        console.log("✅ Sync successful:", result);
        
        setSyncCompleted(true);

        // Show success message
        if (result.isNewUser) {
          console.log("🎉 Welcome! New user created.");
        } else {
          console.log("✅ User data synced");
        }

      } catch (error) {
        console.error("❌ Sync failed:", error);
        console.error("❌ Error details:", error.data || error.message);
        
        // Reset sync flag on error to allow retry
        hasSyncedRef.current = false;
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, syncUserApi]);

  // Show loading state while syncing
  if (isLoaded && isSignedIn && !syncCompleted && isSyncing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Setting up your account...</p>
        </div>
      </div>
    );
  }

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

        {/* ✅ DEBUG BUTTON - Remove this after testing */}
        {/* { <button 
          onClick={testSync} 
          className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50"
        >
          TEST SYNC
        </button> } */}
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;