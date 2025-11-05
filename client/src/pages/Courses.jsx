import { useState } from "react";
import { Search, Clock, TrendingUp, Sparkles, Filter, BookOpen, Star, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const categories = [
  { id: "all", label: "All Courses", icon: BookOpen },
  { id: "development", label: "Development", icon: BookOpen },
  { id: "design", label: "Design", icon: Sparkles },
  { id: "business", label: "Business", icon: TrendingUp },
  { id: "data", label: "Data Science", icon: Award },
];

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development Bootcamp",
    description: "Master modern web development with React, Node.js, and cloud deployment. Build production-ready applications.",
    category: "development",
    duration: "16 weeks",
    level: "Intermediate",
    aiMatch: 95,
    image: "/placeholder.svg",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    students: "12,450",
    rating: 4.9,
    udemyUrl: "https://www.udemy.com/course/example-fullstack",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn user-centered design principles, prototyping, and create stunning interfaces that users love.",
    category: "design",
    duration: "12 weeks",
    level: "Beginner",
    aiMatch: 88,
    image: "/placeholder.svg",
    tags: ["Figma", "Design Thinking", "Prototyping"],
    students: "8,320",
    rating: 4.8,
    udemyUrl: "https://www.udemy.com/course/example-ux-design",
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    description: "Dive into Python, statistics, and ML algorithms. Build predictive models and data visualizations.",
    category: "data",
    duration: "20 weeks",
    level: "Advanced",
    aiMatch: 92,
    image: "/placeholder.svg",
    tags: ["Python", "TensorFlow", "Pandas", "ML"],
    students: "15,670",
    rating: 4.9,
    udemyUrl: "https://www.udemy.com/course/example-data-science",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Master SEO, social media marketing, analytics, and campaign management for business growth.",
    category: "business",
    duration: "10 weeks",
    level: "Beginner",
    aiMatch: 85,
    image: "/placeholder.svg",
    tags: ["SEO", "Social Media", "Analytics"],
    students: "9,234",
    rating: 4.7,
    udemyUrl: "https://www.udemy.com/course/example-digital-marketing",
  },
  {
    id: 5,
    title: "Cloud Architecture & DevOps",
    description: "Learn AWS, Docker, Kubernetes, and CI/CD pipelines. Deploy scalable cloud applications.",
    category: "development",
    duration: "14 weeks",
    level: "Advanced",
    aiMatch: 90,
    image: "/placeholder.svg",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    students: "7,891",
    rating: 4.8,
    udemyUrl: "https://www.udemy.com/course/example-cloud-devops",
  },
  {
    id: 6,
    title: "Product Management Essentials",
    description: "Develop product strategy, roadmaps, and lead cross-functional teams to successful launches.",
    category: "business",
    duration: "8 weeks",
    level: "Intermediate",
    aiMatch: 87,
    image: "/placeholder.svg",
    tags: ["Strategy", "Agile", "Product Design"],
    students: "6,543",
    rating: 4.8,
    udemyUrl: "https://www.udemy.com/course/example-product-management",
  },
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Career Guidance</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Discover Your Path
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Personalized course recommendations powered by AI to accelerate your career growth
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses, skills, or career paths..."
                  className="pl-12 pr-4 py-6 text-lg shadow-soft bg-card border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-y border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="shrink-0 gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {filteredCourses.length} {selectedCategory === "all" ? "Courses" : "Matching Courses"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden hover:shadow-glow transition-all duration-300 bg-gradient-card border-border"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-primary overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-white/20" />
                </div>
                <div className="absolute top-4 left-4 bg-accent text-inverted px-3 py-1 rounded text-xs font-bold shadow-md">
                  udemy
                </div>
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {course.aiMatch}% Match
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Course Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {course.students}
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={
                      course.level === "Beginner"
                        ? "border-accent text-accent"
                        : course.level === "Intermediate"
                        ? "border-primary text-primary"
                        : "border-secondary text-secondary"
                    }
                  >
                    {course.level}
                  </Badge>
                  <Button 
                    className="bg-gradient-primary hover:shadow-glow transition-all gap-2"
                    asChild
                  >
                    <a href={course.udemyUrl} target="_blank" rel="noopener noreferrer">
                      Enroll Now
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
