import { Routes, Route, Navigate } from "react-router-dom"
import NewOrder from "./pages/NewOrder"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"

const isAuthenticated = () => {
  // Check for a valid auth token (not empty, not 'false', not null)
  const token = localStorage.getItem("auth");
  return Boolean(token && token !== "false" && token !== "null");
};

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated() ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/new-order"
        element={isAuthenticated() ? <NewOrder /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default RouteComponent