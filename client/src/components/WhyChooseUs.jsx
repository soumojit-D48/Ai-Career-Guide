

import { motion } from "framer-motion";
import { Zap, Shield, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "AI-Powered Precision",
    description:
      "Our advanced AI algorithms analyze thousands of data points to provide highly accurate career recommendations tailored to your unique profile.",
  },
  {
    icon: Shield,
    title: "Trusted by Thousands",
    description:
      "Join over 50,000 students and professionals who have successfully navigated their career paths with our platform.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description:
      "Access guidance from career counselors and industry experts who are ready to help you succeed at every step.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description:
      "95% of our users report finding clearer career direction and increased confidence in their professional decisions.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CareerPath AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The smartest way to plan and navigate your professional journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-glow transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
