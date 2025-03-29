import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts ";
import Reports from "./pages/Reports";
import Graphs from "./components/Graphs";
import Settings from "./pages/Settings";
import PageNotFound from "./components/PageNotFound";
import EditContactModal from "./Modals/EditContactModal";
import FileUploadModal from "./Modals/FileUploadModal";
import TeamManagement from "./pages/TeamManagement";
import AuthPages from './pages/Auth-Pages'
import { Provider } from 'react-redux';
import { store } from './app/store';
import ProtectedRoute from './components/ProtectedRoute';
import Members from "./pages/Members";
import ContactManagement from "./pages/ContactManagement";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AuthPages />} />
          <Route path="/login" element={<AuthPages />} />

          {/* Protected routes */}
          <Route path="/app" element={<ProtectedRoute> <Layout /></ProtectedRoute>}  >
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/contacts" element={<ContactManagement />} />
            <Route path="/app/members" element={<Members />} />
            <Route path="/app/reports" element={<Reports />} />
            <Route path="/app/settings" element={<Settings />} />
            <Route path="/app/settings/edit" element={<EditContactModal />} />
            <Route path="/app/settings/upload" element={<FileUploadModal />} />
            <Route path="/app/graphs" element={<Graphs />} />
            <Route path="/app/teams" element={<TeamManagement />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;