import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter()


  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
    // console.log(user)
  return (
    <div className="header-styling h-20 w-full border-b-2 flex items-center justify-between p-2">
        {!user ? null : (
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>

          <li className="p-2 cursor-pointer">
            <Link href="/profile">Profile</Link>
          </li>
      </ul>
        )}

      {loading ? null : !user ? (
        <></>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;