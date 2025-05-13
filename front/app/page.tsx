"use client";
import { useEffect, useState } from "react";
import ModernResume from "@/components/templates/ModernResume";
import ClassicResume from "@/components/templates/ClassicResume";
import DarkResume from "@/components/templates/DarkResume";
import FancyResume from "@/components/templates/FancyResume";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Sparkles, CheckCircle, Star, Zap, Award } from "lucide-react";

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

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-30 animate-pulse"></div>
          <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const SelectedTemplate = templateMap[selectedTemplate];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20 relative">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
              Create Your Professional Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose from our professionally designed templates and create a stunning resume that stands out to employers.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Get Started
              </button>
              <button className="px-8 py-3 bg-white text-gray-700 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200">
                View Examples
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Templates</h3>
                <p className="text-gray-600 leading-relaxed">Choose from our collection of ATS-friendly resume templates designed by experts</p>
              </div>
            </div>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Easy to Customize</h3>
                <p className="text-gray-600 leading-relaxed">Edit and customize your resume with our intuitive drag-and-drop interface</p>
              </div>
            </div>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Download</h3>
                <p className="text-gray-600 leading-relaxed">Download your professionally formatted resume in PDF format instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Choose Your Template
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our collection of professionally designed templates to create your perfect resume
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.key}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                  selectedTemplate === thumb.key
                    ? "border-blue-500"
                    : "border-gray-100 hover:border-blue-300"
                }`}
                onClick={() => {
                  router.push(`/resume?template=${thumb.key}`);
                  setSelectedTemplate(thumb.key);
                }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={thumb.image}
                    alt={thumb.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-2 bg-white text-blue-600 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{thumb.label}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-600">4.9</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Most popular choice</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
