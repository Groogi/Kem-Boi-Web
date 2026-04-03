import React from "react";
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' element={<LandingPage/>}/>
      <Route path= 'adminpanel' element={<AdminPanel/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App