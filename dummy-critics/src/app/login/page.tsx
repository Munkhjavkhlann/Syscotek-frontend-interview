"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "../store/store";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();

        setUser(user, token);

        setSuccessMessage("Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        const { message } = await response.json();
        setErrorMessage(message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text p-4">
      <div className="w-full max-w-md p-6 bg-inputBg rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Sign In</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded bg-inputBg border-inputBorder text-text"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded bg-inputBg border-inputBorder text-text"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-buttonBg text-buttonText rounded"
          disabled={isSubmitting}
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-successText mt-4 text-center">{successMessage}</p>
        )}
        <p className="mt-4 text-center">
          Haven't signed up yet?{" "}
          <Link href="/signup" className="underline text-linkText">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
