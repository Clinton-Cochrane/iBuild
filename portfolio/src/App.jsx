import { Routes, Route } from "react-router-dom"
import Header from "./components/header/header.jsx";
import Consulting from "./pages/consulting/main.jsx";
import Projects from "./pages/projects/main.jsx";
import Contact from "./pages/contact/main.jsx";
import Photos from "./pages/photos/main.jsx";
import About from "./pages/about/main.jsx";
import Home from "./pages/home/main.jsx";
import "./styles/app.css" 
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </>
  );
}

export default App
