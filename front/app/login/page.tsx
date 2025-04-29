"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    action: "login",
    email: "",
    password: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Login successful!");
        // You can redirect here or store user data
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-white/10 text-white px-4 py-3 w-full rounded-xl"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="bg-white/10 text-white px-4 py-3 w-full rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 py-4 w-full rounded-xl text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
