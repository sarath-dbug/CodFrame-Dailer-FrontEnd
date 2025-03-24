import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts ";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";
import Graphs from "./components/Graphs";
import Settings from "./pages/Settings";
import PageNotFound from "./components/PageNotFound";
import EditContactModal from "./Modals/EditContactModal";
import FileUploadModal from "./Modals/FileUploadModal";
import TeamManagement from "./pages/TeamManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="agents" element={<Agents />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings" element={<EditContactModal />} />
          <Route path="settings" element={<FileUploadModal />} />
          <Route path="graphs" element={<Graphs />} />
          <Route path="teams" element={<TeamManagement />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
