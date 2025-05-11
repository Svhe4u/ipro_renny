'use client';

import React from 'react';

const Resume = () => {
  const data = {
    firstname: "Жон",
    lastname: "Daaluu",
    headline: "өөрийн тухай",
    address: "1234 Элм гудамж, 567-р байр, Спрингфилд, Иллинойс 62704, АНУ",
    phone: "+1-234-567-8901",
    email: "john.doe@example.com",
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    facebook: "https://fb.com/johndoe",
    city: "Улаанбаатар",
    summary: "summary",
    education: [
      {
        institution: "Хүмүүнлэг",
        start_year: 2020,
      },
      {
        institution: "National univercity of Japan",
        start_year: 2019,
      },
    ],
    experience: [
      {
        job_title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "Chicago, IL",
        start_date: "2021-06",
        end_date: "Present",
        responsibilities: [
          "Lead a team of 5 engineers to develop and maintain a cloud-based SaaS platform.",
          "Implement microservices architecture to improve scalability and reduce latency.",
          "Conduct code reviews and mentor junior developers.",
        ],
      },
    ],
    skills: [
      {
        skill: "node",
        proficiency: 3,
      },
      {
        skill: "flutter",
        proficiency: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-xl shadow-md text-gray-800">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          {data.firstname} {data.lastname}
        </h1>
        <p className="text-lg text-gray-600">{data.headline}</p>
        <div className="mt-2 text-sm text-gray-500 space-x-2">
          <span>{data.email}</span> | <span>{data.phone}</span> | <span>{data.city}</span>
        </div>
        <div className="text-sm text-blue-600 mt-1 space-x-2">
          <a href={data.linkedin} target="_blank">LinkedIn</a>
          <a href={data.github} target="_blank">GitHub</a>
          <a href={data.facebook} target="_blank">Facebook</a>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-2">📄 Summary</h2>
        <p>{data.summary}</p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-2">🎓 Education</h2>
        {data.education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-medium">{edu.institution}</p>
            <p className="text-sm text-gray-500">Элссэн он: {edu.start_year}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-2">💼 Experience</h2>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold">
              {exp.job_title} – <span className="text-gray-600">{exp.company}</span>
            </p>
            <p className="text-sm text-gray-500">
              {exp.location} | {exp.start_date} - {exp.end_date}
            </p>
            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              {exp.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-1 mb-2">🛠 Skills</h2>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {data.skills.map((s, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{s.skill}</span>
              <span className="text-gray-500">Proficiency: {s.proficiency}/5</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Resume;
