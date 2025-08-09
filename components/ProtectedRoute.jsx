"use client";
import { useAuth } from "@/app/context/AuthContext";
import NotFound from "./NotFound";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--color-background-gray)]">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show 404 page if not authenticated
  if (!isAuthenticated()) {
    return (
      <NotFound
        title="Access Denied"
        message="You need to be logged in to access this page. Please login to continue."
        showLoginButton={true}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
