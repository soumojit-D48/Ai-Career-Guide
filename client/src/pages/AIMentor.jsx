

import { useState } from 'react';
import { Mic, MicOff, Sparkles, Target, TrendingUp, Award, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AIMentor = () => {
  const [isListening, setIsListening] = useState(false);

  const careerAreas = [
    {
      icon: Target,
      title: 'Career Assessment',
      description: 'Discover your strengths and ideal career paths',
      color: 'primary'
    },
    {
      icon: TrendingUp,
      title: 'Skill Development',
      description: 'Get personalized learning recommendations',
      color: 'secondary'
    },
    {
      icon: Award,
      title: 'Goal Setting',
      description: 'Define and achieve your career milestones',
      color: 'accent'
    },
    {
      icon: BookOpen,
      title: 'Industry Insights',
      description: 'Stay updated with market trends',
      color: 'primary'
    }
  ];

//   const handleVoiceToggle = () => {
//     setIsListening(!isListening);
//     // Vapi integration will go here
//   };

    const handleVoiceToggle = () => {
    const newState = !isListening;
    setIsListening(newState);
    
    if (newState) {
      console.log('Microphone turned ON - Ready to listen');
      // Vapi integration will go here
    } else {
      console.log('Microphone turned OFF');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Career Mentor
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent companion for personalized career guidance and professional growth
          </p>
        </div>

        {/* Main Interaction Area */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-card shadow-soft border-border p-8">
            <div className="flex flex-col items-center gap-6">
              {/* Voice Interaction Zone */}
              <div className="relative">
                <div className={`w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isListening ? 'shadow-glow scale-110' : 'shadow-soft hover:shadow-glow hover:scale-105'
                }`}
                onClick={handleVoiceToggle}>
                  {isListening ? (
                    <Mic className="w-16 h-16 text-white animate-pulse" />
                  ) : (
                    <MicOff className="w-16 h-16 text-white" />
                  )}
                </div>
                {isListening && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                )}
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  {isListening ? 'Listening...' : 'Start Your Conversation'}
                </h2>
                <p className="text-muted-foreground">
                  {isListening 
                    ? 'I\'m here to help you navigate your career journey' 
                    : 'Click the microphone to begin your AI-powered career guidance session'}
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <Button 
                  variant="outline" 
                  className="bg-primary/10 border-primary/20 hover:bg-primary hover:text-white transition-all"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Networking Tips
                </Button>
                <Button 
                  variant="outline"
                  className="bg-secondary/10 border-secondary/20 hover:bg-secondary hover:text-white transition-all"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Career Planning
                </Button>
                <Button 
                  variant="outline"
                  className="bg-accent/10 border-accent/20 hover:bg-accent hover:text-white transition-all"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Skill Assessment
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Career Areas Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-card-foreground">
            What Can I Help You With?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card 
                  key={index}
                  className="bg-gradient-card shadow-soft border-border p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${area.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${area.color}`} />
                  </div>
                  <h4 className="font-semibold mb-2 text-card-foreground">{area.title}</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-muted/30 backdrop-blur-md rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              🎯 Ready to transform your career? Start the conversation above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
