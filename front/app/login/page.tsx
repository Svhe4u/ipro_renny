"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    action: "login",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  }, []);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.resultCode === 200) {
        const pid = data.data[0].pid.toString();
        localStorage.setItem("token", pid);
  
        alert("Login successful!");
        router.push("/");
      } else {
        alert(data.resultMessage);
        setIsSubmitting(false);
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
            disabled={isSubmitting}
            className="bg-blue-600 py-4 w-full rounded-xl text-white font-semibold"
          >
            {isSubmitting ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>
          <br />
          <br />
        </form>

        <button
          onClick={() => router.push("/register")}
          className="bg-green-600 py-4 w-full rounded-xl text-white font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
