"use client";

import NavItem from "@/components/NavBar/NavItem";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("An error occurred during sign out", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Job Tracker
              </Link>
            </div>
            <div className="hidden lg:flex lg:content-between w-full justify-between">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem>
                  <Link href={"job-tracker"}>Job Application Tracker</Link>
                </NavItem>
                <NavItem>
                  <Link href={"manage-stages"}>Manage Stages</Link>
                </NavItem>
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem>
                  {session ? (
                    <>
                      {`Hi ${session?.userData?.username}, `}
                      <button className="text-red-500" onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link href={"/login"}>Sign In</Link>
                  )}
                </NavItem>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "flex flex-col justify-between" : "hidden"
        } lg:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavItem>
            <Link href={"job-tracker"}>Job Application Tracker</Link>
          </NavItem>
          <NavItem>
            <Link href={"manage-stages"}>Manage Stages</Link>
          </NavItem>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavItem>
            {session ? (
              <>
                {`Hi ${session?.userData?.username}, `}
                <button className="text-red-500" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link href={"/login"}>Sign In</Link>
            )}
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
