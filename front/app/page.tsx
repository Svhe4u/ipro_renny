"use client";
import { useEffect, useState } from "react";
import ModernResume from "@/components/templates/ModernResume";
import ClassicResume from "@/components/templates/ClassicResume";
import DarkResume from "@/components/templates/DarkResume";
import FancyResume from "@/components/templates/FancyResume";
import { useRouter } from "next/navigation";

const templateMap = {
  modern: ModernResume,
  classic: ClassicResume,
  dark: DarkResume,
  fancy: FancyResume,
};

const thumbnails = [
  { key: "modern", label: "Modern", image: "/thumbnails/modern.png" },
  { key: "classic", label: "Classic", image: "/thumbnails/classic.png" },
  { key: "dark", label: "Dark", image: "/thumbnails/dark.png" },
  { key: "fancy", label: "Fancy", image: "/thumbnails/fancy.png" },
];

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState(null);
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
      .then((data) => setResumeData(data.data[0]));
  }, []);

  if (!resumeData) return <p>Уншиж байна...</p>;

  const SelectedTemplate = templateMap[selectedTemplate];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 mb-8 w-max">
        {thumbnails.map((thumb) => (
          <div
            key={thumb.key}
            className={`cursor-pointer border-4 rounded-xl overflow-hidden transition hover:scale-105 min-w-[180px] ${
              selectedTemplate === thumb.key
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => {
              router.push(`/resume?template=${thumb.key}`);
              setSelectedTemplate(thumb.key);
            }}
          >
            <img
              src={thumb.image}
              alt={thumb.label}
              className="w-full h-48 object-cover"
            />
            <div className="text-center font-semibold p-2">{thumb.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
