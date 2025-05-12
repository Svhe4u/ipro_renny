"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    action: "register",
    email: "",
    password: "",
  });
  const [rePassword, setRePassword] = useState("");
  const [register, setRegister] = useState(false);
  const router = useRouter();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegister(true);
    if (rePassword !== form.password) {
      alert("Passwords do not match");
      setRegister(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`#####${JSON.stringify(data)}`)
        if (data.resultCode === 200) {
          alert("Login successful!");
          router.push("/login");

        } else {
          alert(data.resultMessage || "Login failed.");
        }
        setRegister(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setRegister(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-white/10 text-white px-4 py-3 w-full rounded-xl"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="bg-white/10 text-white px-4 py-3 w-full rounded-xl"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Re-enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="bg-white/10 text-white px-4 py-3 w-full rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={register}
            className="bg-blue-600 py-4 w-full rounded-xl text-white font-semibold"
          >
            {register ? "Registering..." : "Register"}
          </button>
        </form>
        <br />
        <br />
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="bg-green-600 py-4 w-full rounded-xl text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
