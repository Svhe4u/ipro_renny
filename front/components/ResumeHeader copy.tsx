"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import SettingsModal from "@/components/SettingsModal";

const ResumeHeader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/whois/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "resumeOne",
        pid: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.data[0]?.personal_details);
      });
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="w-full px-6 py-4 shadow-md flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
        onClick={() => router.push("/")}
      >
        <span className="text-blue-600 dark:text-teal-400 text-2xl font-bold">
          📝 Whois
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Dark Mode солих"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => {
            setShowSettings(true);
          }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Тохиргоо"
        >
          <Settings size={20} />
        </button>

        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Гарах"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </header>
  );
};

export default ResumeHeader;
