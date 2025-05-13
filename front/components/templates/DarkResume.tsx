interface PersonalDetails {
  firstname: string;
  lastname: string;
  headline: string;
  city: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

interface Experience {
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  responsibilities: string | { responsibilities: string }[] | { responsibilities: string };
}

interface Education {
  institution: string;
  degree?: string;
  location?: string;
  start_year: string | number;
  end?: string | number;
  description?: string;
}

interface Skill {
  skill: string;
  proficiency: number;
}

interface ResumeData {
  personal_details: PersonalDetails;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
}

const DarkResume = ({ data }: { data: ResumeData }) => (
  <div className="min-h-screen bg-gray-900 text-gray-100">
    <div className="max-w-4xl mx-auto p-10">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
          {data.personal_details.firstname} {data.personal_details.lastname}
        </h1>
        <p className="text-xl text-gray-400 mb-6">{data.personal_details.headline}</p>
        <div className="flex justify-center items-center space-x-6 text-gray-400">
          <span className="flex items-center">
            <span className="mr-2">📍</span> {data.personal_details.city}
          </span>
          <span className="flex items-center">
            <span className="mr-2">📧</span>
            <a href={`mailto:${data.personal_details.email}`} className="hover:text-teal-400 transition-colors">
              {data.personal_details.email}
            </a>
          </span>
          <span className="flex items-center">
            <span className="mr-2">📱</span>
            <a href={`tel:${data.personal_details.phone}`} className="hover:text-teal-400 transition-colors">
              {data.personal_details.phone}
            </a>
          </span>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          {data.personal_details.linkedin && (
            <a
              href={data.personal_details.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {data.personal_details.github && (
            <a
              href={data.personal_details.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </header>

      <hr className="my-8 border-gray-700" />

      {/* Summary Section */}
      {data.personal_details.summary && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-teal-400 mb-4">Professional Summary</h2>
          <p className="text-gray-300 leading-relaxed">{data.personal_details.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-teal-400 mb-6">Work Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-8 bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">{exp.job_title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
                <div className="text-gray-400 text-sm">
                  {exp.start_date} - {exp.end_date || 'Present'}
                </div>
              </div>
              <p className="text-gray-400 mt-1">{exp.location}</p>
              {exp.responsibilities && (
                <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
                  {Array.isArray(exp.responsibilities) ? (
                    exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>
                        {typeof resp === 'string' ? resp : resp.responsibilities}
                      </li>
                    ))
                  ) : (
                    <li>
                      {typeof exp.responsibilities === 'string' ? 
                        exp.responsibilities : 
                        exp.responsibilities.responsibilities}
                    </li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-teal-400 mb-6">Education</h2>
          <div className="grid gap-6">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-100">{edu.institution}</h3>
                {edu.degree && <p className="text-gray-400 mt-1">{edu.degree}</p>}
                <div className="text-gray-400 mt-2">
                  {edu.start_year && (
                    <span>{edu.start_year} - {edu.end || 'Present'}</span>
                  )}
                  {edu.location && <span className="ml-2">• {edu.location}</span>}
                </div>
                {edu.description && (
                  <p className="text-gray-300 mt-3">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-teal-400 mb-6">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <span className="text-gray-100">{skill.skill}</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < skill.proficiency ? 'bg-teal-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

export default DarkResume;
