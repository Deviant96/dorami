'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import Input from '@/components/Input';
import prisma from '@/db/prisma';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { createUser, findByUsername } from '@/datas/users';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      // const existingUser = await axios.get(`/api/auth/user?email=${email}`);
      const existingUser = await findByUsername(username);
      if (existingUser?.username) {
       console.log('Username is already registered.');
        return;
      }

      // await axios.post('/api/auth/signup', { name, email, password });
      await createUser(username, password, email)
      await signIn('credentials', { username, password });
    } catch (error:any) {
      console.log('error', error)
    }
  };

  if (status === "authenticated") return router.push('/')

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-xl w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" type="text" value={username} onChange={(e: any) => setUsername(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
            <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </form>
          <button onClick={() => signIn('google')} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
            Sign Up with Google
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/">
              <span className="text-blue-500 hover:underline">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
