import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Step1Players from "./pages/studio/Step1Players";
import Step2Script from "./pages/studio/Step2Script";
import Step3Video from "./pages/studio/Step3Video";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/players" element={<Step1Players />} />
          <Route path="/studio/script" element={<Step2Script />} />
          <Route path="/studio/video" element={<Step3Video />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
