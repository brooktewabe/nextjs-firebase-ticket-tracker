"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(false);
      const isAuth = localStorage.getItem("isAuth");

      if (!user && !isAuth) {
        router.push("/login");
      }
    };
    checkAuthentication();
  }, [user, router]);
  // console.log(user);
  return (
    <div className="p-4">
      {loading && <Spinner/>}
      {!loading && user && (
        <p>
          Welcome, {user.displayName} - you are logged in to the profile page -
          a protected route.
        </p>
      )}
    </div>
  );
};

export default page;
