"use client";

import { useEffect, useState } from "react";
import ModernResume from "@/components/templates/ModernResume";
import ClassicResume from "@/components/templates/ClassicResume";
import DarkResume from "@/components/templates/DarkResume";
import FancyResume from "@/components/templates/FancyResume";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const templateMap = {
  modern: ModernResume,
  classic: ClassicResume,
  dark: DarkResume,
  fancy: FancyResume,
};

export default function ResumePage() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const template = searchParams.get("template");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log(`##########1`);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    setChecked(true);
  }, [router]);

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
        setResumeData(data.data[0]);
      }); // ← JSON-ий бүтцээ тааруул
  }, []);

  if (!checked) return <p>Та нэвтэрч орно уу!</p>;
  if (!resumeData) return <p>Уншиж байна.....</p>;

  const SelectedTemplate = templateMap[template];
  return (
    <div className="p-8">
      <SelectedTemplate data={resumeData} />
      <Link href={"/"} className="text-blue-600 hover:text-blue-800">
        Буцах
      </Link>
    </div>
  );
}
