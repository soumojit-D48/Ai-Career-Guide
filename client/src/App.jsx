import { Route, Routes } from "react-router-dom"
import Landing from "./pages/landing"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/layoutComponents/Layout"
import Quiz from "./pages/Quiz"
import Colleges from "./pages/Collages"


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
        path="/collages"
           element= {
            <Layout>
              <Colleges/>
            </Layout>
           }
        />


      </Routes>
    </div>
  )
}

export default App

