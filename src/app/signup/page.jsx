'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiCheckCircle, FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import signupImage from "@/assets/signin.png";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const inputClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-800 shadow-[0_10px_25px_-22px_rgba(15,23,42,0.22)] outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100";

const getErrorMessage = (error, fallback = "Registration failed. Please try again.") => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  if (error.error?.message) return error.error.message;
  return fallback;
};

const SignupPage = () => {
  const router = useRouter();
  
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordChecks = [
    {
      label: "1 uppercase (A–Z)",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "1 lowercase (a–z)",
      passed: /[a-z]/.test(password),
    },
    {
      label: "Minimum 6 characters",
      passed: password.length >= 6,
    },
  ];

  const onSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image
    })

    if (data) {
      toast.success('Successfully Created Your Account')
      router.push('/signin')
      router.refresh()
    }

    if (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL:"/"
    })
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff7ed,_#ffffff_38%,_#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-[1440px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_80px_-28px_rgba(15,23,42,0.25)] lg:grid-cols-[1fr_1fr]">
        <section className="relative flex min-h-[420px] overflow-hidden bg-[#fff8f3]">
          <Image
            src={signupImage}
            alt="DriveFleet signup visual"
            fill
            priority
            className="object-cover object-left"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,243,0.88)_0%,rgba(255,248,243,0.62)_38%,rgba(255,248,243,0.08)_100%)]" />

          <div className="relative z-10 flex w-full items-start p-8 sm:p-10 lg:p-16">
            <div className="max-w-sm">
              <p className="text-sm font-bold tracking-wide text-orange-500">
                + Join DriveFleet. Premium rides.
              </p>
              <h1 className="mt-8 text-4xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-5xl">
                Start your next
                <br />
                journey with
                <br />
                confidence.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Discover trusted cars, smooth booking, and prices that keep your
                trips stress-free.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-white px-0 py-6">
          <div className="w-full rounded-none bg-white px-8 py-5 sm:px-10 sm:py-6 lg:px-14 lg:py-7">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                Create account
              </h2>
              <p className="mt-2 text-base text-slate-500">
                Sign up for your DriveFleet account
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>
                <FiUser className="pointer-events-none absolute left-4 top-[3.15rem] text-slate-400" />
                <input
                  id="fullName"
                  type="text"
                  name="name"
                  placeholder="Write Your Name"
                  className={inputClassName}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <FiMail className="pointer-events-none absolute left-4 top-[3.15rem] text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Write Your Email"
                  className={inputClassName}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="imageUrl"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Image URL
                </label>
                <FiImage className="pointer-events-none absolute left-4 top-[3.15rem] text-slate-400" />
                <input
                  id="imageUrl"
                  type="text"
                  name="image"
                  placeholder="https://example.com/your-photo.jpg"
                  className={inputClassName}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <FiLock className="pointer-events-none absolute left-4 top-[3.15rem] text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-[3.15rem] text-slate-400 transition hover:text-orange-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Password must include 1 uppercase, 1 lowercase, and be at least 6 characters long."
                  className={inputClassName}
                />
              </div>

              <div className="space-y-2 pt-1">
                {passwordChecks.map((rule) => (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-2 text-sm ${
                      rule.passed ? "text-emerald-600" : "text-slate-500"
                    }`}
                  >
                    <FiCheckCircle
                      className={rule.passed ? "text-emerald-500" : "text-slate-300"}
                    />
                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-base font-semibold text-white shadow-[0_18px_35px_-18px_rgba(249,115,22,0.85)] transition hover:from-orange-600 hover:to-amber-600"
              >
                Register
              </button>

              <div className="flex items-center gap-4 pt-1">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-sm font-medium text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-base font-semibold text-slate-700 shadow-[0_10px_25px_-22px_rgba(15,23,42,0.22)] transition hover:border-orange-200 hover:bg-orange-50"
              >
                <FcGoogle className="h-6 w-6" />
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-base text-slate-500">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-orange-500 transition hover:text-orange-600"
              >
                Login
              </Link>
            </p>

            <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm text-slate-600">
              Your account helps you manage bookings, track added cars, and enjoy
              a faster rental experience.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
