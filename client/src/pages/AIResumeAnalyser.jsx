


import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Briefcase, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AIResumeAnalyser = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (validTypes.includes(uploadedFile.type)) {
      setFile(uploadedFile);
      analyzeResume();
    } else {
      alert('Please upload a PDF or DOCX file');
    }
  };

  const analyzeResume = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const mockResults = {
    overallScore: 78,
    atsScore: 85,
    sections: [
      {
        title: 'ATS Compatibility',
        score: 85,
        icon: CheckCircle,
        status: 'excellent',
        details: 'Your resume is well-formatted for Applicant Tracking Systems. Keywords are properly distributed.',
        suggestions: ['Add more industry-specific keywords', 'Include metrics in achievements']
      },
      {
        title: 'Skills Match',
        score: 72,
        icon: Target,
        status: 'good',
        details: 'Good alignment with modern tech stack requirements.',
        suggestions: ['Consider adding cloud platforms experience', 'Highlight soft skills more prominently']
      },
      {
        title: 'Experience Depth',
        score: 80,
        icon: Briefcase,
        status: 'excellent',
        details: 'Well-documented career progression with clear achievements.',
        suggestions: ['Quantify more achievements with numbers', 'Add leadership examples']
      },
      {
        title: 'Professional Impact',
        score: 75,
        icon: Award,
        status: 'good',
        details: 'Strong demonstration of value delivered in previous roles.',
        suggestions: ['Include more client/customer impact stories', 'Add certifications if available']
      }
    ],
    keyStrengths: [
      'Clear career progression',
      'Strong technical skills',
      'Quantified achievements',
      'Clean formatting'
    ],
    topRecommendations: [
      'Add a professional summary at the top',
      'Include 3-5 more relevant technical keywords',
      'Expand on leadership experiences',
      'Add links to portfolio or LinkedIn'
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-primary';
    return 'text-destructive';
  };

  const getStatusBadge = (status) => {
    const styles = {
      excellent: 'bg-accent/10 text-accent border-accent/20',
      good: 'bg-primary/10 text-primary border-primary/20',
      needs_work: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return styles[status] || styles.good;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant AI-powered insights to optimize your resume for ATS systems and recruiters
          </p>
        </div>

        {!showResults ? (
          /* Upload Section */
          <Card className="max-w-2xl mx-auto p-8 shadow-soft hover:shadow-glow transition-all duration-300 bg-gradient-card">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
              
              <div className="mb-6">
                <Upload className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
                  dragActive ? 'text-primary scale-110' : 'text-muted-foreground'
                }`} />
                <h3 className="text-2xl font-semibold mb-2 text-foreground">
                  {analyzing ? 'Analyzing Your Resume...' : 'Upload Your Resume'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Drag & drop your resume here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF and DOCX files
                </p>
              </div>

              {analyzing ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Processing with AI...</p>
                </div>
              ) : (
                <label htmlFor="resume-upload">
                  <Button 
                    className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300"
                    size="lg"
                    type="button"
                    onClick={() => document.getElementById('resume-upload').click()}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Choose File
                  </Button>
                </label>
              )}
            </div>
          </Card>
        ) : (
          /* Results Section */
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Overall Score */}
            <Card className="p-8 shadow-soft bg-gradient-card">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Overall Resume Score</h2>
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-primary p-1 shadow-glow">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <span className={`text-5xl font-bold ${getScoreColor(mockResults.overallScore)}`}>
                        {mockResults.overallScore}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Your resume performs better than 68% of analyzed resumes
                </p>
                <Button 
                  className="mt-6 bg-gradient-primary text-primary-foreground"
                  onClick={() => {
                    setShowResults(false);
                    setFile(null);
                  }}
                >
                  Analyze Another Resume
                </Button>
              </div>
            </Card>

            {/* Detailed Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {mockResults.sections.map((section, index) => (
                <Card 
                  key={index} 
                  className="p-6 shadow-soft hover:shadow-glow transition-all duration-300 bg-gradient-card group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{section.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(section.status)}`}>
                          {section.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <span className={`text-2xl font-bold ${getScoreColor(section.score)}`}>
                      {section.score}
                    </span>
                  </div>
                  
                  <Progress value={section.score} className="mb-4" />
                  
                  <p className="text-sm text-muted-foreground mb-3">{section.details}</p>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground">Suggestions:</p>
                    {section.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <AlertCircle className="w-3 h-3 mt-1 shrink-0 text-primary" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Strengths & Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-soft bg-gradient-card">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-lg text-foreground">Key Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {mockResults.keyStrengths.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 shadow-soft bg-gradient-card">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-lg text-foreground">Top Recommendations</h3>
                </div>
                <ul className="space-y-2">
                  {mockResults.topRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-secondary font-semibold shrink-0">{index + 1}.</span>
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResumeAnalyser;
