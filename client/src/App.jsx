import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/layoutComponents/Layout"
import Quiz from "./pages/Quiz"
import Colleges from "./pages/Collages"
import Courses from "./pages/Courses"
import JobsInternships from "./pages/JobInternsip"
import AICareerRoadmap from "./pages/AIRoadmap"
import AIResumeAnalyser from "./pages/AIResumeAnalyser"
import AIMentor from "./pages/AIMentor"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react"
import TestMyComponent from "./pages/test"


const ProtectedRoute = ({children}) => {
  return (
    <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
    </>
  )

}

function App() { // NeuraPath

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
            <ProtectedRoute>
              <Dashboard/>
              </ProtectedRoute>
            // </Layout>
           }
        />

        <Route  

        path="/test"
           element= {
            <ProtectedRoute>
              <TestMyComponent/>
              </ProtectedRoute>
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

        <Route 
        path="/ai-mentor"
           element= {
            <Layout>
              <AIMentor/>
            </Layout>
           }
        />


      </Routes>
    </div>
  )
}

export default App

