"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (username === "admin" && password === "securepassword") {
      document.cookie = "admin-auth=true; path=/";
      router.push("/admin"); // Redirect to admin after login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[var(--background)]">
      <div className="p-6 bg-[var(--foreground)] rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-[var(--muted)] text-[var(--foreground)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-[var(--muted)] text-[var(--foreground)]"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-2 text-white bg-[var(--primary)] rounded hover:bg-[var(--primary-foreground)]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
