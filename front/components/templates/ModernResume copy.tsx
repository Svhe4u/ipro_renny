const ModernResume = ({ data }: { data: any }) => (
  
  <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg">
    {/* Header Section */}
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        {data.personal_details.firstname} {data.personal_details.lastname}
      </h1>
      <p className="text-xl text-gray-600 mb-4">{data.personal_details.headline}</p>
      <div className="flex justify-center items-center space-x-4 text-gray-600">
        <span className="flex items-center">
          <span className="mr-2">📍</span> {data.personal_details.city}
        </span>
        <span className="flex items-center">
          <span className="mr-2">📧</span>
          <a href={`mailto:${data.personal_details.email}`} className="hover:text-blue-600">
            {data.personal_details.email}
          </a>
        </span>
        <span className="flex items-center">
          <span className="mr-2">📱</span>
          <a href={`tel:${data.personal_details.phone}`} className="hover:text-blue-600">
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
            className="text-blue-600 hover:text-blue-800"
          >
            LinkedIn
          </a>
        )}
        {data.personal_details.github && (
          <a
            href={data.personal_details.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            GitHub
          </a>
        )}
      </div>
    </header>

    <hr className="my-8 border-gray-200" />

    {/* Summary Section */}
    {data.personal_details.summary && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Summary</h2>
        <p className="text-gray-600 leading-relaxed">{data.personal_details.summary}</p>
      </section>
    )}

    {/* Experience Section */}
    {data.experience && data.experience.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{exp.job_title}</h3>
                <p className="text-gray-600">{exp.company}</p>
              </div>
              <div className="text-gray-600 text-sm">
                {exp.start_date} - {exp.end_date || 'Present'}
              </div>
            </div>
            <p className="text-gray-600 mt-1">{exp.location}</p>
            {exp.responsibilities && (
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {Array.isArray(exp.responsibilities) ? (
                  exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="mb-1">
                      {typeof resp === 'string' ? resp : resp.responsibilities}
                    </li>
                  ))
                ) : (
                  <li>{typeof exp.responsibilities === 'string' ? 
                    exp.responsibilities : 
                    exp.responsibilities.responsibilities}</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Education Section */}
    {data.education && data.education.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{edu.institution}</h3>
            {edu.degree && <p className="text-gray-600">{edu.degree}</p>}
            <div className="text-gray-600">
              {edu.start_year && (
                <span>{edu.start_year} - {edu.end || 'Present'}</span>
              )}
              {edu.location && <span className="ml-2">• {edu.location}</span>}
            </div>
            {edu.description && (
              <p className="text-gray-600 mt-2">{edu.description}</p>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Skills Section */}
    {data.skills && data.skills.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span className="text-gray-700">{skill.skill}</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < skill.proficiency ? 'bg-blue-500' : 'bg-gray-300'
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
);

export default ModernResume;