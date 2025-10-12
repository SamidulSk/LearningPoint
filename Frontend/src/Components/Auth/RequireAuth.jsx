import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // Check if the user is logged in and has one of the allowed roles
  const hasAccess = isLoggedIn && allowedRoles.includes(role);

  if (hasAccess) return <Outlet />;           // Authorized, render nested routes
  if (isLoggedIn) return <Navigate to="/denied" />; // Logged in but unauthorized
  return <Navigate to="/login" />;           // Not logged in
}

export default RequireAuth;
