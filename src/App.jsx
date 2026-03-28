import React from "react";
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import Test from "./pages/test";
import LandingPage from "./pages/LandingPage";

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' element={<LandingPage/>}/>
      <Route path= '/test' element={<Test/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App