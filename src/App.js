import React,{createContext,useState} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./context";
export const ThemeContext = createContext()

function App() {
  const [theme,setTheme]=useState("light")
  const toggleTheme=()=>{
    setTheme(theme==="light"?"dark":"light")
  }

  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>       
      </AuthProvider>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
