


// import React from "react";
// import DashboardLayout from "@/components/layoutComponents/Layout";
// import Layout from "@/components/layoutComponents/Layout";

// export default function Dashboard() {
//   return (
//     <Layout>
//       <div className="p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
//             Dashboard Overview
//           </h1>
//           <p className="text-muted-foreground text-lg">
//             Welcome back! Here's what's happening today.
//           </p>
//         </div>

//         {/* Placeholder for future components */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-glow transition-all">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 rounded-lg bg-gradient-primary opacity-20"></div>
//                 <span className="text-sm text-muted-foreground">+12%</span>
//               </div>
//               <h3 className="text-2xl font-bold text-foreground mb-1">0</h3>
//               <p className="text-sm text-muted-foreground">Stat Card {i}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-soft">
//             <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Events</h2>
//             <div className="space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary transition-colors">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="font-semibold text-foreground mb-1">Event Title {i}</h3>
//                       <p className="text-sm text-muted-foreground">Event details will appear here</p>
//                     </div>
//                     <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
//                       Upcoming
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
//             <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
//             <div className="space-y-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="flex items-start space-x-3 pb-4 border-b border-border last:border-0">
//                   <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm text-foreground font-medium truncate">
//                       Activity item {i}
//                     </p>
//                     <p className="text-xs text-muted-foreground">{i} hours ago</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-soft">
//           <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {['Create Event', 'View Reports', 'Manage Users', 'Settings'].map((action, i) => (
//               <button
//                 key={i}
//                 className="p-4 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all font-medium"
//               >
//                 {action}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }


















import React from "react";
import Layout from "@/components/layoutComponents/Layout";

export default function Dashboard() {
  return (
    <Layout>
      {/* <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's what's happening today.
          </p>
        </div> */}

        {/* Placeholder for future components */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-glow transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary opacity-20"></div>
                <span className="text-sm text-muted-foreground">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">0</h3>
              <p className="text-sm text-muted-foreground">Stat Card {i}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-soft">
            <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Event Title {i}</h3>
                      <p className="text-sm text-muted-foreground">Event details will appear here</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Upcoming
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-4 border-b border-border last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">
                      Activity item {i}
                    </p>
                    <p className="text-xs text-muted-foreground">{i} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Create Event', 'View Reports', 'Manage Users', 'Settings'].map((action, i) => (
              <button
                key={i}
                className="p-4 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all font-medium"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div> */}

    </Layout>
  );
}