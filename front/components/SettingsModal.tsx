"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function SettingsModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
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
          const personal = data.data[0]?.personal_details;
          setFormData(personal);
        });
    }
  }, [show]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }

    payload.append("action", "updateUser");
    payload.append("pid", localStorage.getItem("token") || "");

    const res = await fetch("http://127.0.0.1:8000/api/whois/", {
      method: "POST",
      body: payload,
    });

    if (res.ok) {
      alert("Хадгалагдлаа!");
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">⚙️ Тохиргоо</h2>

        {/* Image */}
        <div className="flex items-center gap-4 mb-4">
          <label className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <Upload size={24} />
              </div>
            )}
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Зураг оруулах
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <input
            name="firstname"
            value={formData.firstname || ""}
            onChange={handleChange}
            placeholder="Нэр"
            className="w-full p-2 border rounded"
          />
          <input
            name="lastname"
            value={formData.lastname || ""}
            onChange={handleChange}
            placeholder="Овог"
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Имэйл"
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Утас"
            className="w-full p-2 border rounded"
          />
          <input
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="Хот"
            className="w-full p-2 border rounded"
          />
          <input
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            placeholder="LinkedIn"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Болих
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
