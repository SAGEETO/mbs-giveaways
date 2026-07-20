import { Routes, Route } from "react-router-dom";

import ManageUsers from "./pages/ManageUsers";
import GiveawayDetails from "./pages/GiveawayDetails";
import WonPrizes from "./pages/WonPrizes";
import Settings from "./pages/Settings";
import Giveaways from "./pages/Giveaways";
import Notifications from "./pages/Notifications";
import Winners from "./pages/Winners";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Apply from "./pages/Apply";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateGiveaway from "./pages/CreateGiveaway";
import ManageApplications from "./pages/ManageApplications";
import ManageGiveaways from "./pages/ManageGiveaways";
import EditGiveaway from "./pages/EditGiveaway";
import AdminSettings from "./pages/AdminSettings";

import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/giveaways" element={<Giveaways />} />
      <Route path="/winners" element={<Winners />} />
      <Route
  path="/giveaway/:id"
  element={<GiveawayDetails />}
/>
      <Route path="/apply/:id" element={<Apply />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <ManageUsers />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/my-applications"
  element={
    <ProtectedRoute>
      <MyApplications />
    </ProtectedRoute>
  }
/>
<Route
  path="/won-prizes"
  element={
    <ProtectedRoute>
      <WonPrizes />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      {/* User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/create-giveaway"
        element={
          <AdminProtectedRoute>
            <CreateGiveaway />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/giveaways"
        element={
          <AdminProtectedRoute>
            <ManageGiveaways />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-giveaway/:id"
        element={
          <AdminProtectedRoute>
            <EditGiveaway />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-applications"
        element={
          <AdminProtectedRoute>
            <ManageApplications />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminProtectedRoute>
            <AdminSettings />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;