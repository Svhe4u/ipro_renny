"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResumeForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(0);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [headline, setHeadline] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [facebook, setFacebook] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const pid = storedToken ? parseInt(storedToken) : null;

      if (!pid) {
        router.push("/login");
        return;
      }

      setToken(pid);
    }
  }, []);
  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:8000/api/whois/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "resumeOne",
          pid: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.resultCode === 200) {
            console.log(data);
            setFirstname(data.data[0].personal_details.firstname);
            setLastname(data.data[0].personal_details.lastname);
            setHeadline(data.data[0].personal_details.headline);
            setCity(data.data[0].personal_details.city);
            setAddress(data.data[0].personal_details.address);
            setPhone(data.data[0].personal_details.phone);
            setEmail(data.data[0].personal_details.email);
            setLinkedin(data.data[0].personal_details.linkedin);
            setGithub(data.data[0].personal_details.github);
            setFacebook(data.data[0].personal_details.facebook);
            setSummary(data.data[0].personal_details.summary);
          } else {
            console.log(data.resultMessage);
          }
        });
    }
  }, [token]);

  console.log(`phone: ${phone}`);
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/whois/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "updateResume",
          pid: token,
          firstname: firstname,
          lastname: lastname,
          headline: headline,
          city: city,
          address: address,
          phone: phone,
          email: email,
          linkedin: linkedin,
          github: github,
          facebook: facebook,
          summary: summary,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };
  const [educationList, setEducationList] = useState([
    {
      degree: "",
      institution: "",
      location: "",
      start: "",
      end: "",
      description: "",
    },
  ]);
  const [skills, setSkills] = useState([{ skill: "", proficiency: "" }]);

  const [experience, setExperience] = useState([
    {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      responsibilities: "",
    },
  ]);
  const [projects, setProjects] = useState([
    { name: "", description: "", url: "" },
  ]);

  const handleEducationChange = (index, e) => {
    const updated = [...educationList];
    updated[index][e.target.name] = e.target.value;
    setEducationList(updated);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        institution: "",
        location: "",
        start: "",
        end: "",
        description: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  const handleSkillChange = (index, e) => {
    const updated = [...skills];
    updated[index][e.target.name] = e.target.value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { skill: "", proficiency: "" }]);
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleExperienceChange = (index, e) => {
    const updated = [...experience];
    updated[index][e.target.name] = e.target.value;
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        job_title: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        responsibilities: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperience(updated);
  };

  const handleProjectChange = (index, e) => {
    const updated = [...projects];
    updated[index][e.target.name] = e.target.value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", url: "" }]);
  };

  const removeProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-800">
      <h1 className="text-3xl font-bold mb-6">📝 Resume Form</h1>

      {/* Personal Details */}
      <form onSubmit={submitHandle}>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">👤 Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="input"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              name="lastname"
            />
            <input
              className="input"
              placeholder="Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              name="headline"
            />
            <input
              className="input"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
            />
            <input
              className="input"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
            />
            <input
              className="input"
              placeholder="Phone"
              value={phone ?? ""}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <input
              className="input"
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              name="linkedin"
            />
            <input
              className="input"
              placeholder="GitHub"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              name="github"
            />
            <input
              className="input"
              placeholder="Facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              name="facebook"
            />
          </div>
        </section>
        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">📄 Summary</h2>
          <textarea
            className="input w-full h-32"
            name="summary"
            value={summary || ""}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A brief professional summary"
          />
        </section>
        <button type="submit">submit</button>{" "}
      </form>
      {/* Education */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">🎓 Education</h2>
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <input
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
              className="input"
              placeholder="Degree"
            />
            <input
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, e)}
              className="input"
              placeholder="Institution"
            />
            <input
              name="location"
              value={edu.location}
              onChange={(e) => handleEducationChange(index, e)}
              className="input"
              placeholder="Location"
            />
            <input
              name="start"
              value={edu.start}
              onChange={(e) => handleEducationChange(index, e)}
              className="input"
              placeholder="Start Year"
            />
            <input
              name="end"
              value={edu.end}
              onChange={(e) => handleEducationChange(index, e)}
              className="input"
              placeholder="Graduation Year"
            />
            <textarea
              name="description"
              value={edu.description}
              onChange={(e) => handleEducationChange(index, e)}
              className="input md:col-span-2 h-20"
              placeholder="Description"
            />
            {educationList.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 text-sm"
              >
                ❌ Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Add Education
        </button>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">💼 Experience</h2>
        {experience.map((exp, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <input
              name="job_title"
              value={exp.job_title}
              onChange={(e) => handleExperienceChange(index, e)}
              className="input"
              placeholder="Job Title"
            />
            <input
              name="company"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, e)}
              className="input"
              placeholder="Company"
            />
            <input
              name="location"
              value={exp.location}
              onChange={(e) => handleExperienceChange(index, e)}
              className="input"
              placeholder="Location"
            />
            <input
              name="start_date"
              value={exp.start_date}
              onChange={(e) => handleExperienceChange(index, e)}
              className="input"
              placeholder="Start Date"
            />
            <input
              name="end_date"
              value={exp.end_date}
              onChange={(e) => handleExperienceChange(index, e)}
              className="input"
              placeholder="End Date"
            />
            <textarea
              name="responsibilities"
              value={exp.responsibilities}
              onChange={(e) => handleExperienceChange(index, e)}
              className="input md:col-span-2 h-20"
              placeholder="Responsibilities"
            />
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-600 text-sm"
              >
                ❌ Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Add Experience
        </button>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">🚀 Projects</h2>
        {projects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <input
              name="name"
              value={project.name}
              onChange={(e) => handleProjectChange(index, e)}
              className="input"
              placeholder="Project Name"
            />
            <input
              name="url"
              value={project.url}
              onChange={(e) => handleProjectChange(index, e)}
              className="input"
              placeholder="Project URL"
            />
            <textarea
              name="description"
              value={project.description}
              onChange={(e) => handleProjectChange(index, e)}
              className="input md:col-span-2 h-20"
              placeholder="Project Description"
            />
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-600 text-sm"
              >
                ❌ Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Add Project
        </button>
      </section>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700"
        >
          Submit Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
