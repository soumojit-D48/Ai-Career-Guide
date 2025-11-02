import { Route, Routes } from "react-router-dom"
import Landing from "./pages/landing"


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
      </Routes>
    </div>
  )
}

export default App

