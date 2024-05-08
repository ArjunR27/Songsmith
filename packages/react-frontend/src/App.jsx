import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx"
import Songs from "./pages/Songs.jsx"
import Playlists from "./pages/Playlists.jsx"
import Sidebar from './components/SideBar';


function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
       <BrowserRouter>
      
      <header className="App-header">
      <Sidebar />
             
                  <Routes>
                      <Route exact path="/" element={<Home />}>
                      </Route>
                      <Route exact path="/playlists" element={<Playlists/>}>
                      </Route>
                      <Route exact path="/songs" element={<Songs />}>
                      </Route>
                  </Routes>
        </header>
        </BrowserRouter>
         
    </div>
    
  )
}

export default App
