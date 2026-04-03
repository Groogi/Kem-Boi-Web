import React from "react";
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import FamilyBonusDashboard from "./pages/FamilyBonusDashboard";
import SignUpLogin from "./pages/SignUpLogin";

/* Routes for pages */
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' element={<LandingPage/>}/>
      <Route path= 'admin' element={<AdminPanel/>}/>
      <Route path= 'family' element={<FamilyBonusDashboard/>}/>
      <Route path= 'login' element={<SignUpLogin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
