"use client";

import Head from "next/head";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Settings() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Settings | Coincise</title>
      </Head>
      <Navbar />

      <main className="bg-[#F9FAFB] dark:bg-[#0d1117] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-2xl dark:text-white sm:text-3xl font-semibold text-[#0A2540] mb-6">
          Account Settings
        </h1>

        {/* Profile Info */}
        <section className="bg-white dark:bg-[#0A2540] border border-[#E6EBF2] rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-[#0A2540] dark:text-white mb-4">
            Profile Information
          </h3>
          <p className="text-sm text-gray-600 dark:text-white">
            Name: {user?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-white">
            Email: {user?.email}
          </p>
        </section>

        {/* Change Password (Non-functional placeholder) */}
        <section className="bg-white dark:bg-[#0A2540] border border-[#E6EBF2] rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold dark:text-white text-[#0A2540] mb-4">
            Change Password
          </h3>
          <p className="text-sm text-gray-500 dark:text-white mb-2">
            This feature is coming soon. For now, please contact support for
            password changes.
          </p>
        </section>

        {/* Delete Account */}
        <section className="bg-white dark:bg-[#0A2540] border border-[#E6EBF2] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#FF3D57] mb-4">
            Delete Account
          </h3>
          <p className="text-sm text-gray-500 dark:text-white mb-4">
            Permanently delete your Coincise account. This action is
            irreversible.
          </p>
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-white text-sm rounded-md cursor-not-allowed"
          >
            Delete Account (Coming Soon)
          </button>
        </section>
      </main>
    </>
  );
}
