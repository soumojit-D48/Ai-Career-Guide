import { Route, Routes } from "react-router-dom"
import Landing from "./pages/landing"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/layoutComponents/Layout"


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


      </Routes>
    </div>
  )
}

export default App

