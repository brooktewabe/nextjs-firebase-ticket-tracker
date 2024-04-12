"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    const storage = localStorage.getItem("isAuth");
    if (user && storage) {
      router.push("/");
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("isAuth", true);
      router.push("/");
    } catch (err) {
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email address is already in use by another account."
          );
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        case "auth/missing-password":
          setErrorMessage("Password is required.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/4 bg-cover"></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Sign Up</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500">{errorMessage}</p>}
          <div className="mt-8">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Create Account
            </button>
          </div>
          <button
            className="flex items-center justify-center mt-7 w-full text-white rounded-lg shadow-md hover:bg-gray-100"
            onClick={handleGoogleSignIn}
          >
            <div>
              <img src="/google.svg" alt="Google Icon" width={24} height={24} />
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Continue with Google
            </h1>
          </button>
          <div className="mt-4">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link href="/login" className="text-xs text-gray-500 uppercase">
              Already have an account? Sign in
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
