import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyAccessToken } from "../api/auth/verifyToken";

/**
 * ProtectedRoute Component
 * Validates access token on the server before rendering the route.
 */
const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await verifyAccessToken();
      setIsValid(valid);
    };
    checkAuth();
  }, []);

  if (isValid === null) {
    return <p>Validating session...</p>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
