"use client";
import withAuth from '../withAuth';
import { UserAuth } from "../context/AuthContext";

const page = () => {
  const { user } = UserAuth();
  return (
    <div className="p-4">
      { user && (
        <p>
          Welcome, {user.displayName} - you are logged in to the profile page -
          a protected route.
        </p>
      )}
    </div>
  );
};

export default withAuth(page);
