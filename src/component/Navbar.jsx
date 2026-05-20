'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FiChevronDown,
  FiHome,
  FiLogOut,
  FiMenu,
  FiPlusSquare,
  FiUser,
  FiX,
} from 'react-icons/fi';
import logo from '@/assets/Logo2.png';
import { authClient, signOut, useSession } from '@/lib/auth-client';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore-car', label: 'Explore Cars' },
  { href: '/add-car', label: 'Add Car' },
  { href: '/my-bookings', label: 'My Bookings' },
];

const profileLinks = [
  { href: '/add-car', label: 'Add Car', icon: FiPlusSquare },
  { href: '/my-bookings', label: 'My Bookings', icon: FiHome },
  { href: '/my-added-cars', label: 'My Added Cars', icon: FiUser },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fallbackUser, setFallbackUser] = useState(null);
  const menuRef = useRef(null);
  const { data: session } = useSession();
  const user =
    session?.user ||
    session?.data?.user ||
    session?.session?.user ||
    fallbackUser;
  const hasSessionCookie =
    typeof document !== "undefined" &&
    (
      document.cookie.includes("drivefleet-auth.session_token=") ||
      document.cookie.includes("drivefleet-auth.session=") ||
      document.cookie.includes("better-auth.session_token=")
    );
  const isLoggedIn = Boolean(user || hasSessionCookie);
  const userName = user?.name?.trim();
  const fallbackInitial = userName?.charAt(0)?.toUpperCase() || 'N';
  const hasUserImage = typeof user?.image === 'string' && user.image.trim().length > 0;

  useEffect(() => {
    function handlePointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await authClient.getSession();
      const nextUser =
        data?.user ||
        data?.data?.user ||
        data?.session?.user ||
        null;
      setFallbackUser(nextUser);
    };
    loadSession();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.location.replace("/signin");
  };

  return (
    <header className="border-b border-orange-100 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="DriveFleet logo"
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="relative inline-flex">
                    {link.label}
                    {isActive ? (
                      <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-orange-400" />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="menu"
                onClick={() => setIsProfileMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-2 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {hasUserImage ? (
                  <img
                    src={user.image}
                    alt={userName || 'User avatar'}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 text-sm font-bold text-white">
                    {fallbackInitial}
                  </span>
                )}
                <FiChevronDown
                  className={`text-slate-500 transition ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProfileMenuOpen ? (
                <div className="absolute right-0 top-[calc(100%+12px)] z-20 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_-18px_rgba(15,23,42,0.35)]">
                  <div className="space-y-1">
                    {profileLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Icon className="text-slate-500" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="my-2 h-px bg-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 transition hover:bg-rose-50"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:px-4"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:px-4"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-orange-100 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar
