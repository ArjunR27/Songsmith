import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx"
import Songs from "./pages/Songs.jsx"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
              <BrowserRouter>
                  <Routes>
                      <Route exact path="/" element={<Home />}>
                      </Route>
                      <Route exact path="/songs" element={<Songs />}>
                      </Route>
                  </Routes>
              </BrowserRouter>
      </header>
    </div>
  )
}

export default App
