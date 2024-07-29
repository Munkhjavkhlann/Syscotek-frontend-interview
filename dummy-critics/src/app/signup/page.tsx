"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseData, setResponseData] = useState<{
    id?: string;
    email?: string;
  } | null>(null);

  const handleSignup = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    setResponseData(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        setSuccessMessage("Signup successful!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const { message } = await response.json();
        setErrorMessage(message || "Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-6 bg-inputBg rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-text">
          Sign Up
        </h2>
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
          onClick={handleSignup}
          className="w-full p-3 bg-buttonBg text-buttonText rounded"
          disabled={isSubmitting}
        >
          Signup
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-successText mt-4 text-center">{successMessage}</p>
        )}
        {responseData && (
          <div className="mt-4 p-4 border rounded border-inputBorder text-text">
            <h3 className="font-bold">Signup Response:</h3>
            <p>
              <strong>ID:</strong> {responseData.id}
            </p>
            <p>
              <strong>Email:</strong> {responseData.email}
            </p>
          </div>
        )}
        <p className="mt-4 text-center text-text">
          Already signed up?{" "}
          <Link href="/login" className="underline text-linkText">
            Click here to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
