

import { motion } from "framer-motion";
import { UserCircle, Target, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile with information about your education, skills, and interests.",
    step: "01",
  },
  {
    icon: Target,
    title: "Take AI Assessment",
    description:
      "Complete our comprehensive career quiz to help our AI understand your strengths and preferences.",
    step: "02",
  },
  {
    icon: Rocket,
    title: "Get Personalized Roadmap",
    description:
      "Receive a customized career roadmap with actionable steps, recommended courses, and opportunities.",
    step: "03",
  },
  {
    icon: Trophy,
    title: "Achieve Your Goals",
    description:
      "Follow your personalized path, track progress, and achieve your career aspirations with confidence.",
    step: "04",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to career success in four simple steps
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-12 last:mb-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Step Number */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                    <span className="text-3xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    // <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                    <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-linear-to-b from-primary to-transparent" />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-glow transition-all group">
                    <div className="flex items-start gap-6">
                      {/* <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"> */}
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
