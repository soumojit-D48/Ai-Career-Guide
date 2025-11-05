


import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content:
      "NeuraPath helped me discover my passion for software development. The personalized roadmap was spot-on and I landed my dream job within 6 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Medical Student",
    content:
      "The AI quiz revealed career paths I never considered. Now I'm pursuing medicine and couldn't be happier with my decision. Truly life-changing!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    content:
      "Best career guidance platform out there! The resume analyzer and job finder features saved me countless hours and helped me secure multiple offers.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who transformed their careers with
            NeuraPath
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-lg bg-card border border-border shadow-soft relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary opacity-20" />

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-primary bg-muted">
                  <User className="w-8 h-8 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent"
                    style={{ fill: "currentColor" }}
                  />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};










// import { motion } from "framer-motion";
// import { Star, Quote } from "lucide-react";

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Software Engineer",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
//     content:
//       "CareerPath AI helped me discover my passion for software development. The personalized roadmap was spot-on and I landed my dream job within 6 months!",
//     rating: 5,
//   },
//   {
//     name: "Michael Chen",
//     role: "Medical Student",
//     image:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
//     content:
//       "The AI quiz revealed career paths I never considered. Now I'm pursuing medicine and couldn't be happier with my decision. Truly life-changing!",
//     rating: 5,
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Marketing Manager",
//     image:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
//     content:
//       "Best career guidance platform out there! The resume analyzer and job finder features saved me countless hours and helped me secure multiple offers.",
//     rating: 5,
//   },
// ];

// export const Testimonials = () => {
//   return (
//     <section className="py-20 px-4 bg-muted/30">
//       <div className="container mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
//             What Our Users Say
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Real stories from people who transformed their careers with
//             CareerPath AI
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className="p-6 rounded-lg bg-card border border-border shadow-soft relative"
//             >
//               <Quote className="absolute top-4 right-4 w-8 h-8 text-primary opacity-20" />

//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-16 h-16 rounded-full object-cover border-2 border-primary"
//                 />
//                 <div>
//                   <h3 className="font-semibold text-foreground">
//                     {testimonial.name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     {testimonial.role}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-1 mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   //   <Star
//                   //     key={i}
//                   //     className="w-4 h-4 fill-accent text-accent"
//                   //   />

//                   <Star
//                     key={i}
//                     className="w-4 h-4 text-accent"
//                     style={{ fill: "currentColor" }}
//                   />
//                 ))}
//               </div>

//               <p className="text-muted-foreground leading-relaxed">
//                 "{testimonial.content}"
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

