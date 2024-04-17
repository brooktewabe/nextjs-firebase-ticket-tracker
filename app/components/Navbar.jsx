import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Logo from "./dojo-logo.png";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let isAuth = "false";

  // to get rid of the warning localStorage isn't defined
  if (typeof window !== "undefined") {
    isAuth = localStorage.getItem("isAuth") === "true";
  }

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/login");
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
  }, [user, router]);
  // console.log(user)
  return (
    <div className="header-styling h-20 w-full border-b-2 flex items-center justify-between p-2">
      {!isAuth || !user ? null : (
        <>
          <ul className="flex">
            <li>
              <Image
                src={Logo}
                alt="Dojo Helpdesk logo"
                width={70}
                placeholder="blur"
                quality={100}
              />
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/tickets">Tickets</Link>
            </li>

            <li className="p-2 cursor-pointer">
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
          <div>
            {/* <p>Welcome, {user.displayName}</p> */}
            <button className="btn-primary cursor-pointer flex" onClick={handleSignOut}>
            <BiLogOut />Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

