

// import { Navbar } from "@/components/Navbar";
// import { Hero } from "@/components/Hero";
// import { Features } from "@/components/Features";
// import { HowItWorks } from "@/components/HowItWorks";
// import { WhyChooseUs } from "@/components/WhyChooseUs";
// import { CTA } from "@/components/CTA";
// import { Footer } from "@/components/Footer";

import { CTA } from "../components/CTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonnials";
import { WhyChooseUs } from "@/components/WhyChooseUs";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar mode="public" />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials/>
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;