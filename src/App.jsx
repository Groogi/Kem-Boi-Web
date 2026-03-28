import React from "react";
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import FamilyBonusDashboard from "./pages/FamilyBonusDashboard";

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' element={<LandingPage/>}/>
      <Route path= 'admin' element={<AdminPanel/>}/>
      <Route path= 'Family' element={<FamilyBonusDashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App