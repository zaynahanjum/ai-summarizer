"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[1000px] h-[580px] bg-white rounded-xl shadow-lg flex overflow-hidden">

        <div className="w-1/2 bg-gray-800 text-white flex flex-col justify-center items-center px-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center mb-6 opacity-90">
            Log in to continue using the app.
          </p>
          <a
            href="/signup"
            className="border border-white px-12 py-3 rounded-full hover:bg-white hover:text-gray-800 transition"
          >
            SIGN UP
          </a>
        </div>

        
        <form
          onSubmit={handleLogin}
          className="w-1/2 flex flex-col justify-center px-12 items-center"
        >
          <h2 className="text-[30px] font-bold text-gray-800 mb-4 text-center">
            Sign in to Account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <p className="text-gray-400 text-sm text-center mb-4">
            use your email account
          </p>

        
          <div className="relative mb-3 w-[280px]">
           
            <input
              type="email"
              placeholder="Email"
              className="p-3 pl-10 rounded w-full bg-gray-100 border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

        
          <div className="relative mb-6 w-[280px]">
         
            <input
              type="password"
              placeholder="Password"
              className="p-3 pl-10 rounded w-full bg-gray-100 border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gray-800 text-white py-3 rounded-full hover:bg-gray-700 transition w-[200px]"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
