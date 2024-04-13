import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const isAuth =localStorage.getItem("isAuth")


  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/login')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      if (!user && !isAuth) {
        router.push("/login");
      } else {
      setLoading(false);
      }
    
  }, [user,router]);
    // console.log(user)
  return (
    <div className="header-styling h-20 w-full border-b-2 flex items-center justify-between p-2">
        {!isAuth ? null : (
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