

import { useState } from "react";
import { Search, MapPin, GraduationCap, TrendingUp, Star, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const colleges = [
  {
    id: 1,
    name: "Stanford University",
    location: "California, USA",
    ranking: 3,
    aiMatch: 95,
    majors: ["Computer Science", "Engineering", "Business"],
    acceptanceRate: 4,
    tuition: "$56,169",
    image: "🎓",
  },
  {
    id: 2,
    name: "MIT",
    location: "Massachusetts, USA",
    ranking: 1,
    aiMatch: 92,
    majors: ["Engineering", "Computer Science", "Physics"],
    acceptanceRate: 7,
    tuition: "$53,790",
    image: "🔬",
  },
  {
    id: 3,
    name: "Harvard University",
    location: "Massachusetts, USA",
    ranking: 2,
    aiMatch: 88,
    majors: ["Law", "Business", "Medicine"],
    acceptanceRate: 5,
    tuition: "$54,269",
    image: "📚",
  },
  {
    id: 4,
    name: "UC Berkeley",
    location: "California, USA",
    ranking: 15,
    aiMatch: 85,
    majors: ["Computer Science", "Engineering", "Data Science"],
    acceptanceRate: 17,
    tuition: "$14,312",
    image: "🐻",
  },
  {
    id: 5,
    name: "Carnegie Mellon",
    location: "Pennsylvania, USA",
    ranking: 25,
    aiMatch: 90,
    majors: ["Computer Science", "Robotics", "AI"],
    acceptanceRate: 17,
    tuition: "$59,864",
    image: "🤖",
  },
  {
    id: 6,
    name: "Caltech",
    location: "California, USA",
    ranking: 6,
    aiMatch: 87,
    majors: ["Physics", "Engineering", "Mathematics"],
    acceptanceRate: 6,
    tuition: "$56,364",
    image: "🚀",
  },
];

const Colleges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const allMajors = [...new Set(colleges.flatMap(c => c.majors))];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = !selectedMajor || college.majors.includes(selectedMajor);
    return matchesSearch && matchesMajor;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Perfect College
          </h1>
          <p className="text-xl text-white/90 mb-8">
            AI-powered recommendations based on your career goals and preferences
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search colleges by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white/95 backdrop-blur-md border-0 focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {selectedMajor && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                {selectedMajor}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedMajor(null)}
                />
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {filteredColleges.length} colleges found
          </p>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-6 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Filter by Major</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allMajors.map(major => (
                  <Badge
                    key={major}
                    variant={selectedMajor === major ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    onClick={() => setSelectedMajor(selectedMajor === major ? null : major)}
                  >
                    {major}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map(college => (
            <Card 
              key={college.id} 
              className="group hover:shadow-glow transition-all duration-300 bg-gradient-card overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="text-5xl mb-2">{college.image}</div>
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {college.aiMatch}% Match
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {college.name}
                </CardTitle>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  {college.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Ranking:</span>
                  </div>
                  <span className="font-semibold">#{college.ranking}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4 text-secondary" />
                    <span className="text-muted-foreground">Acceptance:</span>
                  </div>
                  <span className="font-semibold">{college.acceptanceRate}%</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Popular Majors:</p>
                  <div className="flex flex-wrap gap-1">
                    {college.majors.map(major => (
                      <Badge key={major} variant="secondary" className="text-xs">
                        {major}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">Annual Tuition</p>
                  <p className="text-lg font-bold text-primary">{college.tuition}</p>
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No colleges found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedMajor(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;
