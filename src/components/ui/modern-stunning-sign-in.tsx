"use client" 

import * as React from "react"
import { Hexagon } from "lucide-react";

const SignIn1 = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
 
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
 
  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert("Backend authentication module pending integration...");
  };
 
  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden w-full rounded-xl py-12">
      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#ffffff10] to-transparent border border-white/10 backdrop-blur-md shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ff7300]/20 mb-6 shadow-lg border border-[#ff7300]/40">
          <Hexagon className="text-[#ff7300]" size={24} />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-black text-white mb-6 text-center tracking-widest font-[Syncopate] uppercase">
          SECURE NODE
        </h2>
        {/* Form */}
        <div className="flex flex-col w-full gap-4 font-mono">
          <div className="w-full flex flex-col gap-3">
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full px-5 py-3 rounded-xl bg-black/40 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 border border-white/5"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full px-5 py-3 rounded-xl bg-black/40 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 border border-white/5"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>
          <hr className="opacity-10 border-white" />
          <div>
            <button
              onClick={handleSignIn}
              className="w-full bg-[#6b21a8] text-white font-bold px-5 py-3 rounded-full shadow-[0_0_20px_rgba(107,33,168,0.4)] hover:bg-[#832bc9] transition mb-3 text-sm tracking-wider uppercase"
            >
              Sign in
            </button>
            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center gap-2 bg-white/5 rounded-full px-5 py-3 font-medium text-white shadow hover:bg-white/10 transition mb-2 text-sm border border-white/10 uppercase tracking-wide">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Link
            </button>
            <div className="w-full text-center mt-2">
              <span className="text-xs text-white/40">
                NO ACCOUNT?{" "}
                <a
                  href="#"
                  className="underline text-[#00f3ff] hover:text-[#00f3ff]/80 font-bold"
                >
                  INITIALIZE HERE
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* User count and avatars */}
      <div className="relative z-10 mt-8 flex flex-col items-center text-center font-mono">
        <p className="text-white/40 text-xs mb-3">
          SECURE ENCLAVE ACTIVE. JOIN <span className="font-bold text-white">4,000+</span> CLIENTS.
        </p>
        <div className="flex">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-black object-cover -ml-2 first:ml-0 opacity-80 mix-blend-luminosity"
          />
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100&h=100"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-black object-cover -ml-2 opacity-80 mix-blend-luminosity"
          />
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-black object-cover -ml-2 opacity-80 mix-blend-luminosity"
          />
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-black object-cover -ml-2 opacity-80 mix-blend-luminosity"
          />
        </div>
      </div>
    </div>
  );
};
 
export { SignIn1 };
