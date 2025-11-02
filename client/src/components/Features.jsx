

import { motion } from "framer-motion";
import {
  Brain,
  GraduationCap,
  Map,
  Briefcase,
  FileText,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Career Quiz",
    description:
      "Take our intelligent career assessment that analyzes your skills, interests, and personality to recommend perfect career paths.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    title: "College Finder",
    description:
      "Discover the best colleges and universities that align with your career goals and academic preferences.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Map,
    title: "AI Roadmap",
    description:
      "Get a personalized step-by-step roadmap to achieve your career goals with actionable milestones and timelines.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Briefcase,
    title: "Job & Internship Finder",
    description:
      "Access curated job and internship opportunities that match your skills and career aspirations.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Get AI-powered feedback on your resume with suggestions to improve your chances of landing interviews.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Access comprehensive courses, tutorials, and learning materials to upskill and stay competitive.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Accelerate
            </span>{" "}
            Your Career
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed career decisions and achieve
            your professional goals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-glow transition-all">
                <div
                  className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
