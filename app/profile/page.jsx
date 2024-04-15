"use client";
import withAuth from '../withAuth';
import { UserAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = UserAuth();
  
  return (
    <div className="p-4">
      { user && (
        <div>
          {/* <p>Welcome, {user.displayName} - you are logged in to the profile page - a protected route.</p> */}
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Name:</label>
              <input type="text" id="displayName" name="displayName" value={user.displayName} readOnly className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" name="email" value={user.email} readOnly className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
              <input type="phone" id="phone" name="phone" value={user.phoneNumber} readOnly className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default withAuth(ProfilePage);
