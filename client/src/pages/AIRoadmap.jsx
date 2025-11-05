

import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, BookOpen, Award, TrendingUp, Sparkles, Target } from 'lucide-react';

const AICareerRoadmap = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);

  // Static roadmap data (will be replaced with Gemini API response)
  const roadmapData = {
    careerPath: "Full Stack Web Developer",
    duration: "12-18 months",
    difficulty: "Intermediate",
    description: "A comprehensive path to becoming a professional full-stack web developer with modern technologies",
    phases: [
      {
        id: 1,
        title: "Foundation Phase",
        duration: "3 months",
        status: "current",
        skills: [
          { name: "HTML & CSS Fundamentals", completed: true },
          { name: "JavaScript Basics", completed: true },
          { name: "Git & Version Control", completed: false },
          { name: "Responsive Design", completed: false }
        ],
        resources: [
          { type: "course", name: "MDN Web Docs", url: "#" },
          { type: "book", name: "Eloquent JavaScript", url: "#" },
          { type: "practice", name: "Frontend Mentor", url: "#" }
        ]
      },
      {
        id: 2,
        title: "Frontend Mastery",
        duration: "4 months",
        status: "locked",
        skills: [
          { name: "React.js Fundamentals", completed: false },
          { name: "State Management (Redux/Context)", completed: false },
          { name: "Modern CSS (Tailwind)", completed: false },
          { name: "API Integration", completed: false }
        ],
        resources: [
          { type: "course", name: "React Official Docs", url: "#" },
          { type: "project", name: "Build Portfolio Website", url: "#" },
          { type: "practice", name: "Component Library", url: "#" }
        ]
      },
      {
        id: 3,
        title: "Backend Development",
        duration: "4 months",
        status: "locked",
        skills: [
          { name: "Node.js & Express", completed: false },
          { name: "Database Design (SQL/NoSQL)", completed: false },
          { name: "RESTful APIs", completed: false },
          { name: "Authentication & Security", completed: false }
        ],
        resources: [
          { type: "course", name: "Node.js Complete Guide", url: "#" },
          { type: "book", name: "You Don't Know JS", url: "#" },
          { type: "project", name: "Build REST API", url: "#" }
        ]
      },
      {
        id: 4,
        title: "Professional Skills",
        duration: "3-6 months",
        status: "locked",
        skills: [
          { name: "Testing (Jest, React Testing Library)", completed: false },
          { name: "DevOps Basics (Docker, CI/CD)", completed: false },
          { name: "Cloud Services (AWS/Azure)", completed: false },
          { name: "System Design", completed: false }
        ],
        resources: [
          { type: "course", name: "Testing JavaScript", url: "#" },
          { type: "practice", name: "Build Full-Stack App", url: "#" },
          { type: "certification", name: "AWS Cloud Practitioner", url: "#" }
        ]
      }
    ],
    milestones: [
      { name: "First Personal Project", completed: true },
      { name: "Contribute to Open Source", completed: false },
      { name: "Build Full-Stack Application", completed: false },
      { name: "Land First Job/Internship", completed: false }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'border-primary bg-primary/10';
      case 'completed':
        return 'border-accent bg-accent/10';
      case 'locked':
      default:
        return 'border-border bg-muted/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':
        return <Clock className="w-5 h-5 text-primary" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      case 'locked':
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Your AI-Generated Career Roadmap</h1>
          </div>
          <p className="text-lg opacity-90 mb-6">
            Personalized learning path based on your career quiz results
          </p>
          
          {/* Career Path Card */}
          <div className="bg-background/80 backdrop-blur-md rounded-2xl p-6 shadow-soft">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex-1 min-w-64">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {roadmapData.careerPath}
                </h2>
                <p className="text-muted-foreground">{roadmapData.description}</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{roadmapData.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">{roadmapData.difficulty}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Key Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapData.milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 transition-all ${
                  milestone.completed
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  {milestone.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={milestone.completed ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    {milestone.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Phases */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Learning Phases
          </h3>
          
          <div className="space-y-6">
            {roadmapData.phases.map((phase, idx) => (
              <div key={phase.id} className="relative">
                {/* Connector Line */}
                {idx < roadmapData.phases.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-12 bg-border" />
                )}
                
                {/* Phase Card */}
                <div
                  className={`bg-gradient-card rounded-2xl border-2 shadow-soft transition-all ${getStatusColor(
                    phase.status
                  )}`}
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    className="w-full p-6 flex items-center gap-4 text-left"
                  >
                    <div className="shrink-0">
                      {getStatusIcon(phase.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-foreground">{phase.title}</h4>
                        <span className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-primary transition-all"
                            style={{
                              width: `${
                                (phase.skills.filter(s => s.completed).length / phase.skills.length) * 100
                              }%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {phase.skills.filter(s => s.completed).length}/{phase.skills.length}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedPhase === phase.id && (
                    <div className="px-6 pb-6 space-y-6">
                      {/* Skills */}
                      <div>
                        <h5 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                          <BookOpen className="w-4 h-4" />
                          Skills to Learn
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.skills.map((skill, skillIdx) => (
                            <div
                              key={skillIdx}
                              className="flex items-center gap-3 p-3 bg-background/50 rounded-lg"
                            >
                              {skill.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                              )}
                              <span className={skill.completed ? 'text-foreground' : 'text-muted-foreground'}>
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <h5 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                          <Award className="w-4 h-4" />
                          Recommended Resources
                        </h5>
                        <div className="space-y-2">
                          {phase.resources.map((resource, resIdx) => (
                            <a
                              key={resIdx}
                              href={resource.url}
                              className="flex items-center gap-3 p-3 bg-background/50 rounded-lg hover:bg-muted transition-all group"
                            >
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium uppercase">
                                {resource.type}
                              </span>
                              <span className="text-foreground group-hover:text-primary transition-all">
                                {resource.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-primary text-white rounded-2xl p-8 text-center shadow-glow">
          <h3 className="text-2xl font-bold mb-3">Ready to Start Your Journey?</h3>
          <p className="text-lg opacity-90 mb-6">
            Take the next step and begin your transformation today
          </p>
          <button className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-glow transition-all">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICareerRoadmap;