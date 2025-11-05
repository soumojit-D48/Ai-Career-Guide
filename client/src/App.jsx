import { Route, Routes } from "react-router-dom"
import Landing from "./pages/landing"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/layoutComponents/Layout"
import Quiz from "./pages/Quiz"
import Colleges from "./pages/Collages"
import Courses from "./pages/Courses"
import JobsInternships from "./pages/JobInternsip"
import AICareerRoadmap from "./pages/AIRoadmap"
import AIResumeAnalyser from "./pages/AIResumeAnalyser"


function App() {

  return (
    <div className='relative'>
      <Routes>


        <Route 
        path="/"
           element= {
            <Landing/>
           }
        />

        <Route 
        path="/dashboard"
           element= {
            // <Layout>
              <Dashboard/>
            // </Layout>
           }
        />

        <Route 
        path="/quiz"
           element= {
            <Layout>
              <Quiz/>
            </Layout>
           }
        />

        <Route 
        path="/college-finder"
           element= {
            <Layout>
              <Colleges/>
            </Layout>
           }
        />

        <Route 
        path="/courses"
           element= {
            <Layout>
              <Courses/>
            </Layout>
           }
        />

        <Route 
        path="/job-internships"
           element= {
            <Layout>
              <JobsInternships/>
            </Layout>
           }
        />

        

        <Route 
        path="/ai-roadmap"
           element= {
            <Layout>
              <AICareerRoadmap/>
            </Layout>
           }
        />

        

        <Route 
        path="/ai-resume-analyzer"
           element= {
            <Layout>
              <AIResumeAnalyser/>
            </Layout>
           }
        />


      </Routes>
    </div>
  )
}

export default App

