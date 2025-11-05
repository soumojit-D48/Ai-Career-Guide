

// import { useState } from 'react';
// import { Search, Briefcase, GraduationCap, MapPin, Clock, ExternalLink } from 'lucide-react';

// import { OpportunityCard } from '@/components/OppotunityCard';

// // Sample data
// const careerPaths = [
//   { id: '1', name: 'Software Development' },
//   { id: '2', name: 'Data Science' },
//   { id: '3', name: 'UI/UX Design' },
//   { id: '4', name: 'Product Management' },
//   { id: '5', name: 'Marketing' }
// ];

// const opportunities = [
//   {
//     id: '1',
//     type: 'job',
//     title: 'Senior Frontend Developer',
//     company: 'TechCorp Inc.',
//     location: 'Remote',
//     description: 'We are looking for an experienced frontend developer to join our team and build amazing user experiences.',
//     posted_date: '2024-10-15',
//     career_path_id: '1',
//     salary: '$80k - $120k',
//     experience: '3-5 years',
//     career_paths: { id: '1', name: 'Software Development' }
//   },
//   {
//     id: '2',
//     type: 'internship',
//     title: 'Data Science Intern',
//     company: 'Analytics Co.',
//     location: 'New York, NY',
//     description: 'Join our data science team for a summer internship working on real-world machine learning projects.',
//     posted_date: '2024-10-20',
//     career_path_id: '2',
//     salary: '$25/hour',
//     experience: 'Student',
//     career_paths: { id: '2', name: 'Data Science' }
//   },
//   {
//     id: '3',
//     type: 'job',
//     title: 'UX Designer',
//     company: 'DesignHub',
//     location: 'San Francisco, CA',
//     description: 'Create beautiful and intuitive user interfaces for our growing suite of products.',
//     posted_date: '2024-10-18',
//     career_path_id: '3',
//     salary: '$70k - $100k',
//     experience: '2-4 years',
//     career_paths: { id: '3', name: 'UI/UX Design' }
//   },
//   {
//     id: '4',
//     type: 'internship',
//     title: 'Software Engineering Intern',
//     company: 'StartupXYZ',
//     location: 'Austin, TX',
//     description: 'Work alongside experienced engineers to build scalable web applications.',
//     posted_date: '2024-10-22',
//     career_path_id: '1',
//     salary: '$30/hour',
//     experience: 'Student',
//     career_paths: { id: '1', name: 'Software Development' }
//   },
//   {
//     id: '5',
//     type: 'job',
//     title: 'Product Manager',
//     company: 'InnovateTech',
//     location: 'Boston, MA',
//     description: 'Lead product strategy and development for our flagship product line.',
//     posted_date: '2024-10-12',
//     career_path_id: '4',
//     salary: '$90k - $130k',
//     experience: '4-6 years',
//     career_paths: { id: '4', name: 'Product Management' }
//   },
//   {
//     id: '6',
//     type: 'job',
//     title: 'Digital Marketing Specialist',
//     company: 'GrowthAgency',
//     location: 'Remote',
//     description: 'Drive digital marketing campaigns and help our clients grow their online presence.',
//     posted_date: '2024-10-16',
//     career_path_id: '5',
//     salary: '$60k - $85k',
//     experience: '2-3 years',
//     career_paths: { id: '5', name: 'Marketing' }
//   }
// ];

// // function OpportunityCard({ opportunity }) {
// //   return (
// //     <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
// //       <div className="flex items-start justify-between mb-3">
// //         <div className="flex-1">
// //           <div className="flex items-center gap-2 mb-2">
// //             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
// //               opportunity.type === 'job' 
// //                 ? 'bg-blue-100 text-blue-700' 
// //                 : 'bg-green-100 text-green-700'
// //             }`}>
// //               {opportunity.type === 'job' ? 'Job' : 'Internship'}
// //             </span>
// //             <span className="text-xs text-gray-500">{opportunity.career_paths.name}</span>
// //           </div>
// //           <h3 className="text-xl font-semibold text-gray-900 mb-1">
// //             {opportunity.title}
// //           </h3>
// //           <p className="text-gray-700 font-medium mb-3">{opportunity.company}</p>
// //         </div>
// //       </div>

// //       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
// //         {opportunity.description}
// //       </p>

// //       <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
// //         <div className="flex items-center gap-1">
// //           <MapPin className="w-4 h-4" />
// //           <span>{opportunity.location}</span>
// //         </div>
// //         <div className="flex items-center gap-1">
// //           <Clock className="w-4 h-4" />
// //           <span>{opportunity.experience}</span>
// //         </div>
// //         <div className="font-medium text-blue-600">
// //           {opportunity.salary}
// //         </div>
// //       </div>

// //       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
// //         View Details
// //         <ExternalLink className="w-4 h-4" />
// //       </button>
// //     </div>
// //   );
// // }

// export default function JobsInternships() {
//   const [activeTab, setActiveTab] = useState('all');
//   const [selectedCareerPath, setSelectedCareerPath] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredOpportunities = opportunities.filter((opp) => {
//     const matchesTab = activeTab === 'all' || opp.type === activeTab;
//     const matchesCareer = selectedCareerPath === 'all' || opp.career_path_id === selectedCareerPath;
//     const matchesSearch =
//       searchQuery === '' ||
//       opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       opp.description.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesTab && matchesCareer && matchesSearch;
//   });

//   const jobCount = opportunities.filter(o => o.type === 'job').length;
//   const internshipCount = opportunities.filter(o => o.type === 'internship').length;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-700">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Career Opportunities
//           </h1>
//           <p className="text-lg text-blue-100 max-w-2xl">
//             Discover jobs and internships tailored to your career path. Find the perfect opportunity to start or advance your career.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col gap-6 mb-8">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search opportunities..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
//               />
//             </div>
//             <select
//               value={selectedCareerPath}
//               onChange={(e) => setSelectedCareerPath(e.target.value)}
//               className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 cursor-pointer"
//             >
//               <option value="all">All Career Paths</option>
//               {careerPaths.map((path) => (
//                 <option key={path.id} value={path.id}>
//                   {path.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex gap-2 flex-wrap">
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
//                 activeTab === 'all'
//                   ? 'bg-blue-600 text-white shadow-lg'
//                   : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               All
//               <span className="px-2 py-0.5 rounded-full text-xs bg-white/20">
//                 {opportunities.length}
//               </span>
//             </button>
//             <button
//               onClick={() => setActiveTab('job')}
//               className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
//                 activeTab === 'job'
//                   ? 'bg-blue-600 text-white shadow-lg'
//                   : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <Briefcase className="w-4 h-4" />
//               Jobs
//               <span className="px-2 py-0.5 rounded-full text-xs bg-white/20">
//                 {jobCount}
//               </span>
//             </button>
//             <button
//               onClick={() => setActiveTab('internship')}
//               className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
//                 activeTab === 'internship'
//                   ? 'bg-blue-600 text-white shadow-lg'
//                   : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <GraduationCap className="w-4 h-4" />
//               Internships
//               <span className="px-2 py-0.5 rounded-full text-xs bg-white/20">
//                 {internshipCount}
//               </span>
//             </button>
//           </div>
//         </div>

//         {filteredOpportunities.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No opportunities found
//             </h3>
//             <p className="text-gray-600">
//               Try adjusting your filters or search query
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="mb-4 text-gray-600">
//               Showing {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredOpportunities.map((opportunity) => (
//                 <OpportunityCard key={opportunity.id} opportunity={opportunity} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';
import { Search, Briefcase, GraduationCap, MapPin, Clock, ExternalLink } from 'lucide-react';

// Sample data
const careerPaths = [
  { id: '1', name: 'Software Development' },
  { id: '2', name: 'Data Science' },
  { id: '3', name: 'UI/UX Design' },
  { id: '4', name: 'Product Management' },
  { id: '5', name: 'Marketing' }
];

const opportunities = [
  {
    id: '1',
    type: 'job',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    description: 'We are looking for an experienced frontend developer to join our team and build amazing user experiences.',
    posted_date: '2024-10-15',
    career_path_id: '1',
    salary: '$80k - $120k',
    experience: '3-5 years',
    career_paths: { id: '1', name: 'Software Development' }
  },
  {
    id: '2',
    type: 'internship',
    title: 'Data Science Intern',
    company: 'Analytics Co.',
    location: 'New York, NY',
    description: 'Join our data science team for a summer internship working on real-world machine learning projects.',
    posted_date: '2024-10-20',
    career_path_id: '2',
    salary: '$25/hour',
    experience: 'Student',
    career_paths: { id: '2', name: 'Data Science' }
  },
  {
    id: '3',
    type: 'job',
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'San Francisco, CA',
    description: 'Create beautiful and intuitive user interfaces for our growing suite of products.',
    posted_date: '2024-10-18',
    career_path_id: '3',
    salary: '$70k - $100k',
    experience: '2-4 years',
    career_paths: { id: '3', name: 'UI/UX Design' }
  },
  {
    id: '4',
    type: 'internship',
    title: 'Software Engineering Intern',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    description: 'Work alongside experienced engineers to build scalable web applications.',
    posted_date: '2024-10-22',
    career_path_id: '1',
    salary: '$30/hour',
    experience: 'Student',
    career_paths: { id: '1', name: 'Software Development' }
  },
  {
    id: '5',
    type: 'job',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Boston, MA',
    description: 'Lead product strategy and development for our flagship product line.',
    posted_date: '2024-10-12',
    career_path_id: '4',
    salary: '$90k - $130k',
    experience: '4-6 years',
    career_paths: { id: '4', name: 'Product Management' }
  },
  {
    id: '6',
    type: 'job',
    title: 'Digital Marketing Specialist',
    company: 'GrowthAgency',
    location: 'Remote',
    description: 'Drive digital marketing campaigns and help our clients grow their online presence.',
    posted_date: '2024-10-16',
    career_path_id: '5',
    salary: '$60k - $85k',
    experience: '2-3 years',
    career_paths: { id: '5', name: 'Marketing' }
  }
];

function OpportunityCard({ opportunity }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-glow transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              opportunity.type === 'job' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-accent/10 text-accent'
            }`}>
              {opportunity.type === 'job' ? 'Job' : 'Internship'}
            </span>
            <span className="text-xs text-muted-foreground">{opportunity.career_paths.name}</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {opportunity.title}
          </h3>
          <p className="text-card-foreground font-medium mb-3">{opportunity.company}</p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {opportunity.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{opportunity.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{opportunity.experience}</span>
        </div>
        <div className="font-medium text-primary">
          {opportunity.salary}
        </div>
      </div>

      <button className="w-full bg-primary hover:bg-primary text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-glow">
        View Details
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function JobsInternships() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCareerPath, setSelectedCareerPath] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesTab = activeTab === 'all' || opp.type === activeTab;
    const matchesCareer = selectedCareerPath === 'all' || opp.career_path_id === selectedCareerPath;
    const matchesSearch =
      searchQuery === '' ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCareer && matchesSearch;
  });

  const jobCount = opportunities.filter(o => o.type === 'job').length;
  const internshipCount = opportunities.filter(o => o.type === 'internship').length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* <div className="bg-gradient-primary border-b border-border ">
        <div className="max-w-7xl mx-auto px-4 py-12 ">
          <h1 className= " text-4xl md:text-5xl font-bold text-foreground mb-4">
            Career Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover jobs and internships tailored to your career path. Find the perfect opportunity to start or advance your career.
          </p>
        </div>
      </div> */}

      <div className="bg-gradient-primary border-b border-border">
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Career Opportunities
    </h1>
    <p className="text-lg text-white/90 max-w-2xl">
      Discover jobs and internships tailored to your career path. Find the perfect opportunity to start or advance your career.
    </p>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={selectedCareerPath}
              onChange={(e) => setSelectedCareerPath(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground cursor-pointer"
            >
              <option value="all">All Career Paths</option>
              {careerPaths.map((path) => (
                <option key={path.id} value={path.id}>
                  {path.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              All
              <span className="px-2 py-0.5 rounded-full text-xs bg-background/20">
                {opportunities.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('job')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'job'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Jobs
              <span className="px-2 py-0.5 rounded-full text-xs bg-background/20">
                {jobCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('internship')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'internship'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Internships
              <span className="px-2 py-0.5 rounded-full text-xs bg-background/20">
                {internshipCount}
              </span>
            </button>
          </div>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No opportunities found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-muted-foreground">
              Showing {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}