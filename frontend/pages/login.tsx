"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Head>
        <title>Login | Coincise</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-[#E6EBF2]">
          <h2 className="text-2xl font-semibold text-[#0A2540] mb-6 text-center">
            Log in to Coincise
          </h2>

          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6EBF2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#E6EBF2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0057FF] text-white py-2 rounded-md hover:bg-[#0040CC] transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#0057FF] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
