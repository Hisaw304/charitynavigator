import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("cnAdminAuth");

  return isAuthenticated === "true" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
