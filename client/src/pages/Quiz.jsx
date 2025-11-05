

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, Target, Award, ArrowRight, ArrowLeft } from "lucide-react";
import Layout from "@/components/layoutComponents/Layout";

const quizQuestions = [
  {
    id: 1,
    question: "What type of work environment energizes you most?",
    type: "multiple",
    options: [
      { text: "Fast-paced startup with constant innovation", value: "startup" },
      { text: "Structured corporate environment with clear processes", value: "corporate" },
      { text: "Creative agency with diverse projects", value: "creative" },
      { text: "Remote-first with flexible schedule", value: "remote" }
    ]
  },
  {
    id: 2,
    question: "Which skills do you enjoy using the most?",
    type: "multiple",
    options: [
      { text: "Problem-solving and analytical thinking", value: "analytical" },
      { text: "Creative design and visual communication", value: "creative" },
      { text: "Leadership and people management", value: "leadership" },
      { text: "Technical implementation and coding", value: "technical" }
    ]
  },
  {
    id: 3,
    question: "What motivates you in your career?",
    type: "multiple",
    options: [
      { text: "Making a positive impact on society", value: "impact" },
      { text: "Financial growth and stability", value: "financial" },
      { text: "Continuous learning and skill development", value: "learning" },
      { text: "Work-life balance and flexibility", value: "balance" }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to work on projects?",
    type: "multiple",
    options: [
      { text: "Independently with minimal supervision", value: "independent" },
      { text: "Collaboratively in cross-functional teams", value: "collaborative" },
      { text: "Leading and delegating to others", value: "leading" },
      { text: "Supporting and executing team decisions", value: "supporting" }
    ]
  },
  {
    id: 5,
    question: "Which industry excites you most?",
    type: "multiple",
    options: [
      { text: "Technology and Software", value: "tech" },
      { text: "Healthcare and Life Sciences", value: "healthcare" },
      { text: "Finance and Banking", value: "finance" },
      { text: "Education and Non-profit", value: "education" }
    ]
  }
];

const careerPaths = {
  "tech-analytical": {
    title: "Software Engineer / Data Scientist",
    description: "Perfect for analytical minds who love solving complex problems with code and data.",
    skills: ["Python", "JavaScript", "SQL", "Machine Learning"],
    icon: "💻"
  },
  "tech-creative": {
    title: "UX/UI Designer / Product Designer",
    description: "Ideal for creative thinkers who want to shape user experiences through design.",
    skills: ["Figma", "User Research", "Prototyping", "Visual Design"],
    icon: "🎨"
  },
  "tech-leadership": {
    title: "Product Manager / Tech Lead",
    description: "Great for leaders who want to drive product vision and team success.",
    skills: ["Strategy", "Agile", "Stakeholder Management", "Roadmapping"],
    icon: "🚀"
  },
  "creative-analytical": {
    title: "Marketing Analyst / Growth Hacker",
    description: "Combines creativity with data-driven decision making for business growth.",
    skills: ["Analytics", "SEO/SEM", "A/B Testing", "Content Strategy"],
    icon: "📊"
  },
  "creative-leadership": {
    title: "Creative Director / Brand Manager",
    description: "Lead creative teams and shape brand identities that resonate.",
    skills: ["Brand Strategy", "Team Leadership", "Creative Direction", "Campaign Management"],
    icon: "✨"
  },
  "default": {
    title: "Career Consultant / Business Analyst",
    description: "Versatile role perfect for those who enjoy variety and strategic thinking.",
    skills: ["Research", "Consulting", "Strategic Planning", "Communication"],
    icon: "🎯"
  }
};

const Quiz = () => {
  const [step, setStep] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [quizQuestions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const answerValues = Object.values(answers);
    
    const hasTech = answerValues.some(v => ["tech", "technical", "startup", "remote"].includes(v));
    const hasCreative = answerValues.some(v => ["creative", "creative"].includes(v));
    const hasAnalytical = answerValues.some(v => ["analytical", "financial"].includes(v));
    const hasLeadership = answerValues.some(v => ["leadership", "leading", "corporate"].includes(v));

    let resultKey = "default";
    
    if (hasTech && hasAnalytical) resultKey = "tech-analytical";
    else if (hasTech && hasCreative) resultKey = "tech-creative";
    else if (hasTech && hasLeadership) resultKey = "tech-leadership";
    else if (hasCreative && hasAnalytical) resultKey = "creative-analytical";
    else if (hasCreative && hasLeadership) resultKey = "creative-leadership";

    setResult(careerPaths[resultKey]);
    setStep("results");
  };

  const restartQuiz = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (step === "intro") {
    return (
        
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-card shadow-soft p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-card-foreground">
              Discover Your Ideal Career Path
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Take our AI-powered career assessment to find personalized career recommendations 
              based on your interests, skills, and work preferences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>5 Questions</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Target className="w-5 h-5 text-secondary" />
                <span>3 Minutes</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="w-5 h-5 text-accent" />
                <span>Personalized Results</span>
              </div>
            </div>

            <Button 
              onClick={() => setStep("quiz")}
              className="bg-gradient-primary text-white px-8 py-6 text-lg rounded-lg hover:shadow-glow transition-all mt-6"
            >
              Start Career Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-card shadow-soft p-8 md:p-12">
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl mb-4">{result.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-3">
                Your Recommended Career Path
              </h2>
              <h3 className="text-2xl font-semibold bg-gradient-primary bg-clip-text text-transparent mb-4">
                {result.title}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
              <h4 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Key Skills to Develop
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-card rounded-lg p-4 shadow-soft text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold text-card-foreground mb-1">Growth Potential</h5>
                <p className="text-sm text-muted-foreground">High demand field</p>
              </div>

              <div className="bg-gradient-card rounded-lg p-4 shadow-soft text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h5 className="font-semibold text-card-foreground mb-1">Skill Match</h5>
                <p className="text-sm text-muted-foreground">95% compatibility</p>
              </div>

              <div className="bg-gradient-card rounded-lg p-4 shadow-soft text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h5 className="font-semibold text-card-foreground mb-1">Career Fit</h5>
                <p className="text-sm text-muted-foreground">Excellent match</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={restartQuiz}
                variant="outline"
                className="px-6 py-5 text-base"
              >
                Retake Quiz
              </Button>
              <Button 
                className="bg-gradient-primary text-white px-6 py-5 text-base hover:shadow-glow transition-all"
              >
                Explore Career Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const selectedAnswer = answers[question.id];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-card shadow-soft p-8 md:p-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === option.value
                      ? "border-primary bg-primary/10 shadow-soft"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.value
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {selectedAnswer === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-card-foreground font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
              className="px-6 py-5"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-gradient-primary text-white px-6 py-5 hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;