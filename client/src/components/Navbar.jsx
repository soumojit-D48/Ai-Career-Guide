


// import { useState } from "react";
// import { Moon, Sun, Menu, X, Globe, Compass } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { motion, AnimatePresence } from "framer-motion";

// export const Navbar = () => {
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark");
//   };

//   const navLinks = [
//     { label: "Features", href: "#features" },
//     { label: "How It Works", href: "#how-it-works" },
//     { label: "Why Us", href: "#why-us" },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
//               <Compass className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               CareerPath AI
//             </span>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link, index) => (
//               <motion.a
//                 key={link.href}
//                 href={link.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-foreground/70 hover:text-foreground transition-colors"
//               >
//                 {link.label}
//               </motion.a>
//             ))}
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-3">
//             {/* Language Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="hidden sm:flex">
//                   <Globe className="w-5 h-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="bg-card border-border">
//                 <DropdownMenuItem>English</DropdownMenuItem>
//                 <DropdownMenuItem>Español</DropdownMenuItem>
//                 <DropdownMenuItem>Français</DropdownMenuItem>
//                 <DropdownMenuItem>Deutsch</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleTheme}
//               className="hidden sm:flex"
//             >
//               {theme === "light" ? (
//                 <Moon className="w-5 h-5" />
//               ) : (
//                 <Sun className="w-5 h-5" />
//               )}
//             </Button>

//             {/* Login Button */}
//             <Button variant="ghost" className="hidden sm:inline-flex">
//               Login
//             </Button>

//             {/* Get Started Button */}
//             <Button className="hidden sm:inline-flex bg-gradient-primary hover:shadow-glow transition-all">
//               Get Started
//             </Button>

//             {/* Mobile Menu Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden border-t border-border"
//             >
//               <div className="py-4 space-y-3">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.href}
//                     href={link.href}
//                     className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {link.label}
//                   </a>
//                 ))}
//                 <div className="flex items-center gap-2 px-4 pt-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={toggleTheme}
//                   >
//                     {theme === "light" ? (
//                       <Moon className="w-5 h-5" />
//                     ) : (
//                       <Sun className="w-5 h-5" />
//                     )}
//                   </Button>
//                   <Button variant="ghost" className="flex-1">
//                     Login
//                   </Button>
//                   <Button className="flex-1 bg-gradient-primary">
//                     Get Started
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// };







// import { useState } from "react";
// import { Moon, Sun, Menu, X, Globe, Compass } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from "@/redux/themeSlice";

// export const Navbar = () => {

// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


//   const dispatch = useDispatch()
//   const theme = useSelector(state => state.theme.theme)

//   const navLinks = [
//     { label: "Features", href: "#features" },
//     { label: "How It Works", href: "#how-it-works" },
//     { label: "Why Us", href: "#why-us" },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
//               <Compass className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               CareerPath AI
//             </span>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link, index) => (
//               <motion.a
//                 key={link.href}
//                 href={link.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-foreground/70 hover:text-foreground transition-colors"
//               >
//                 {link.label}
//               </motion.a>
//             ))}
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-3">
//             {/* Language Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="hidden sm:flex">
//                   <Globe className="w-5 h-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="bg-card border-border">
//                 <DropdownMenuItem>English</DropdownMenuItem>
//                 <DropdownMenuItem>Español</DropdownMenuItem>
//                 <DropdownMenuItem>Français</DropdownMenuItem>
//                 <DropdownMenuItem>Deutsch</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => dispatch(toggleTheme())}
//               className="hidden sm:flex"
//             >
//               {theme === "light" ? (
//                 <Moon className="w-5 h-5" />
//               ) : (
//                 <Sun className="w-5 h-5" />
//               )}
//             </Button>

//             {/* Login Button */}
//             <Button variant="ghost" className="hidden sm:inline-flex">
//               Login
//             </Button>

//             {/* Get Started Button */}
//             <Button className="hidden sm:inline-flex bg-gradient-primary hover:shadow-glow transition-all">
//               Get Started
//             </Button>

//             {/* Mobile Menu Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden border-t border-border"
//             >
//               <div className="py-4 space-y-3">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.href}
//                     href={link.href}
//                     className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {link.label}
//                   </a>
//                 ))}
//                 <div className="flex items-center gap-2 px-4 pt-2">
//                   <Button variant="ghost" size="icon" onClick={toggleTheme}>
//                     {theme === "light" ? (
//                       <Moon className="w-5 h-5" />
//                     ) : (
//                       <Sun className="w-5 h-5" />
//                     )}
//                   </Button>
//                   <Button variant="ghost" className="flex-1">
//                     Login
//                   </Button>
//                   <Button className="flex-1 bg-gradient-primary">
//                     Get Started
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// };

































import { useState } from "react";
import { Moon, Sun, Menu, X, Globe, Compass, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import { useLayout } from './layoutComponents/Layout';

export const Navbar = ({mode = "dashboard"}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // ✅ Get sidebar state from Context
  // const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useLayout();

  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const layout = mode === "dashboard" ? useLayout() : null

  const sidebarOpen = layout?.sidebarOpen;
  const setSidebarOpen = layout?.setSidebarOpen;
  const sidebarCollapsed = layout?.sidebarCollapsed;
  const setSidebarCollapsed = layout?.setSidebarCollapsed;

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Us", href: "#why-us" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Sidebar Toggles + Logo */}
          <div className="flex items-center gap-2">
            {/* Mobile sidebar toggle */}

            {
              mode === "dashboard" && (

                <>
              
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>

            </>

          )}

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerPath AI
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              className="hidden sm:flex"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Login Button */}
            <Button variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>

            {/* Get Started Button */}
            <Button className="hidden sm:inline-flex bg-gradient-primary hover:shadow-glow transition-all">
              Get Started
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-2 px-4 pt-2">
                  <Button variant="ghost" size="icon" onClick={() => dispatch(toggleTheme())}>
                    {theme === "light" ? (
                      <Moon className="w-5 h-5" />
                    ) : (
                      <Sun className="w-5 h-5" />
                    )}
                  </Button>
                  <Button variant="ghost" className="flex-1">
                    Login
                  </Button>
                  <Button className="flex-1 bg-gradient-primary">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

