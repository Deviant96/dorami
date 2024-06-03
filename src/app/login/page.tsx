'use client';

import Link from 'next/link';
import { Form } from '@/app/form';
// import { signIn } from 'next-auth/react';
import { SubmitButton } from '@/components/SubmitButton';
import { FormEvent, useState } from 'react';
import { login } from '@/actions/login';
import credentials from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // "use server";
    console.log("login form action")
    // const username = formData.get("username") as string;
    // console.log('username', username)
    // const password = formData.get("password") as string;
    // console.log('password', password)

    try {
      // await signIn('credentials', { username, password });
      await signIn("credentials", {
        callbackUrl: callbackUrl,
        username: username as string,
        password: password as string,
        // redirect: false,
      });

      // console.log({ response });
    } catch(error: any) {
      console.error("Login Failed:", error);
    }
    // console.log('formData', formData)
    // const data = await login(formData);
    // console.log(data)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        {/* {error && (<div>{error}</div>)} */}
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your username and password to sign in
          </p>
        </div>
        <form onSubmit={handleSubmit}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-xs text-gray-600 uppercase"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="username"
            placeholder="theone11"
            autoComplete="username"
            value={username} 
            onChange={(e: any) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password} 
            onChange={(e: any) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </form>
      </div>
    </div>
  );
}