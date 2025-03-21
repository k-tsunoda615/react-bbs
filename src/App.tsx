import { Routes, Route, Navigate } from "react-router-dom";
import { ThreadsListPage } from "./pages/ThreadsListPage/index";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/threads" />} />
        <Route path="/threads" element={<ThreadsListPage />} />
        {/* <Route path="/threads/:id" element={<ThreadDetailPage />} /> */}
      </Routes>
      <SpeedInsights />
    </>
  );
}

export default App;
