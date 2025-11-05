


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


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";

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
















       <div className="space-y-6 max-w-[1200px] mx-auto">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 shadow-glow">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white/90">Welcome back</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Ready to advance your career?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl">
              Your personalized AI career advisor is here to help you navigate your professional journey
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Continue Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Career Progress
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Skills Mastered
              </CardTitle>
              <Award className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground mt-2">
                8 new this quarter
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Goals Achieved
              </CardTitle>
              <Target className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12/15</div>
              <Progress value={80} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                3 goals remaining
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Learning Hours
              </CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">127h</div>
              <p className="text-xs text-muted-foreground mt-2">
                23h this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Learning Path */}
          <Card className="lg:col-span-2 bg-gradient-card border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Your Learning Path</CardTitle>
              <CardDescription className="text-muted-foreground">
                Continue your journey to becoming a Full Stack Developer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary\/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">React Fundamentals</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <span className="text-white font-semibold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Advanced TypeScript</p>
                      <p className="text-sm text-muted-foreground">In Progress - 65%</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary hover:shadow-glow">
                    Continue
                  </Button>
                </div>

                <div className="flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground font-semibold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Node.js Backend</p>
                      <p className="text-sm text-muted-foreground">Locked</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-card border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Start exploring your options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Target className="w-4 h-4 mr-2 text-primary" />
                Take Career Quiz
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Sparkles className="w-4 h-4 mr-2 text-secondary" />
                Get AI Roadmap
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Award className="w-4 h-4 mr-2 text-accent" />
                Analyze Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

    </Layout>
  );
}