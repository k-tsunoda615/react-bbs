import { Routes, Route, Navigate } from "react-router-dom";
import { ThreadsListPage } from "./pages/ThreadsListPage/index";
import { ThreadsNewPage } from "./pages/ThreadsNewPage/index";
import { ThreadDetailPage } from "./pages/ThreadDetailPage/index";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./assets/css/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/threads" />} />
        <Route path="/threads" element={<ThreadsListPage />} />
        <Route path="/threads/new" element={<ThreadsNewPage />} />
        <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
      </Routes>
      <SpeedInsights />
    </>
  );
}

export default App;
