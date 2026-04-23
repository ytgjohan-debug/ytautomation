import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Step1Players from "./pages/studio/Step1Players";
import Step2Script from "./pages/studio/Step2Script";
import Step3Video from "./pages/studio/Step3Video";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Step1Players />} />
        <Route path="/studio/script" element={<Step2Script />} />
        <Route path="/studio/video" element={<Step3Video />} />
      </Routes>
    </Router>
  );
}

export default App;