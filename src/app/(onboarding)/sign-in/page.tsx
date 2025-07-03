'use client';

import Image from "next/image";
import HomeNavbar from "@/components/layout/homeNavbar";
import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inter = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include', // sends cookies with request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
      }

      const data = await res.json();
      console.log(data)
      // Optional: redirect on success
      router.push('/profile') //if using next/navigation
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative h-screen w-full bg-[#FFFFFF] overflow-hidden ${inter.className}`}
      style={{
        background:
          "linear-gradient(90deg, #3B41C5 0%, #A981BB 49%, #FFC8A9 100%)",
      }}
    >
      <HomeNavbar />
      <h1 className="text-white text-center mt-[20px] mb-[60px] font-bold text-3xl">
        Sign In to Our Chat App
      </h1>
      <div className="w-[420px] h-auto shadow-md mx-auto mt-[20px] text-gray-900  rounded-3xl overflow-hidden  bg-[#ffffff]">
        <input
          className="input-field mt-[40px]"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`submit-btn bg-[#3B41C5] border-none`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
