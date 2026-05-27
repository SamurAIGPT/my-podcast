"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FaCoins, FaUser, FaMicrophone, FaSignOutAlt, FaGoogle, FaBars, FaTimes } from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import clsx from "clsx";

const navLinks = [
  { name: "Narration Studio", href: "/" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const links = [...navLinks];
  if (session?.user) {
    links.splice(1, 0, { name: "My Podcast Studio", href: "/dashboard" });
  }

  const deployUrl = "https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/my-podcast";

  return (
    <nav className="relative sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-zinc-950/80 border-b border-zinc-800/50 backdrop-blur-md text-zinc-100 flex-shrink-0">
      {/* Brand logo */}
      <div className="flex items-center gap-5 sm:gap-7 min-w-0">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-white flex-shrink-0 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
            <FaMicrophone className="text-sm" />
          </div>
          <span className="text-sm sm:text-base leading-none">
            Podcast<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-black">Studio</span>
          </span>
        </Link>

        {/* Navigation links for Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-xs sm:text-sm font-semibold transition-colors py-1 relative",
                  isActive
                    ? "text-violet-400"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right toolbar items for Desktop */}
      <div className="hidden md:flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Deploy button */}
        <a
          href={deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all cursor-pointer group"
          title="Deploy your own to Vercel"
        >
          <SiVercel className="text-[10px] text-zinc-300 group-hover:text-white transition-colors" />
          <span>Deploy</span>
        </a>

        {session?.user ? (
          <>
            {/* Credits badge */}
            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-full shadow-inner">
              <FaCoins className="text-amber-450 text-xs animate-pulse" />
              <span>{session.user.credits ?? 0} Credits</span>
            </span>

            {/* User avatar */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center flex-shrink-0">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
                ) : (
                  <FaUser className="text-xs text-zinc-500" />
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold text-zinc-300 max-w-[80px] truncate">
                {session.user.name?.split(" ")[0]}
              </span>
            </div>

            {/* Sign out */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-red-400 hover:bg-red-950/20 transition-all cursor-pointer"
              title="Sign out"
            >
              <FaSignOutAlt className="text-xs" />
              <span className="hidden md:inline">Sign out</span>
            </button>
          </>
        ) : (
          /* Sign in with Google */
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 active:scale-[0.98] rounded-lg shadow-lg shadow-violet-500/20 transition-all cursor-pointer"
          >
            <FaGoogle className="text-[10px]" />
            <span>Sign in</span>
          </button>
        )}
      </div>

      {/* Hamburger Icon for Mobile Viewports */}
      <div className="flex items-center gap-2 md:hidden">
        {session?.user && (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-full">
            <FaCoins className="text-amber-450 text-[10px]" />
            <span>{session.user.credits ?? 0}</span>
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:text-white p-1 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Absolute Overlay Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[200] bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800 flex flex-col p-4 space-y-3 animate-in slide-in-from-top duration-200">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                  isActive ? "bg-violet-950/40 text-violet-400 border-l-2 border-violet-500" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="h-px bg-zinc-800 my-2" />

          <div className="flex items-center justify-between px-3">
            {session?.user ? (
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center flex-shrink-0">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
                  ) : (
                    <FaUser className="text-xs text-zinc-500" />
                  )}
                </div>
                <div className="text-xs font-bold text-zinc-300 max-w-[120px] truncate">
                  {session.user.name}
                </div>
              </div>
            ) : null}

            {session?.user ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                <FaSignOutAlt className="text-xs" />
                <span>Sign out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signIn("google");
                }}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg transition-all cursor-pointer"
              >
                <FaGoogle className="text-[10px]" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>

          <div className="px-3 pt-2">
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
            >
              <SiVercel className="text-xs text-zinc-350" />
              <span>Deploy to Vercel</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
