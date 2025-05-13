interface ResumeData {
  personal_details: {
    firstname: string;
    lastname: string;
    headline: string;
    email: string;
    phone: string;
    city: string;
    address?: string;
    linkedin?: string;
    summary?: string;
  };
  experience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills?: Array<{
    category: string;
    items: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

const ClassicResume = ({ data }: { data: ResumeData }) => (
  <div className="p-8 font-serif bg-white text-black">
    {/* Header Section */}
    <header className="text-center border-b-2 border-gray-300 pb-4">
      <h1 className="text-3xl font-bold mb-2">{data.personal_details.firstname} {data.personal_details.lastname}</h1>
      <h2 className="text-xl text-gray-700 mb-3">{data.personal_details.headline}</h2>
      <div className="text-sm text-gray-600 flex justify-center gap-4 flex-wrap">
        <span>{data.personal_details.city}</span>
        <span>•</span>
        <span>{data.personal_details.phone}</span>
        <span>•</span>
        <span>{data.personal_details.email}</span>
        {data.personal_details.linkedin && (
          <>
            <span>•</span>
            <a href={data.personal_details.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </>
        )}
      </div>
    </header>

    {/* Professional Summary */}
    {data.personal_details.summary && (
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-2 border-b border-gray-300">Professional Summary</h2>
        <p className="text-gray-700 text-justify">{data.personal_details.summary}</p>
      </section>
    )}

    {/* Experience Section */}
    {data.experience && data.experience.length > 0 && (
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-2 border-b border-gray-300">Professional Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <h4 className="text-gray-700">{exp.company}</h4>
                </div>
                <div className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <p className="text-gray-700 mt-1 text-justify">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {data.education && data.education.length > 0 && (
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-2 border-b border-gray-300">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.school}</h3>
                  <h4 className="text-gray-700">{edu.degree} in {edu.field}</h4>
                </div>
                <div className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              {edu.gpa && <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {data.skills && data.skills.length > 0 && (
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-2 border-b border-gray-300">Skills</h2>
        <div className="space-y-2">
          {data.skills.map((skillGroup, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-700">{skillGroup.category}</h3>
              <p className="text-gray-600">{skillGroup.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Projects Section */}
    {data.projects && data.projects.length > 0 && (
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-2 border-b border-gray-300">Projects</h2>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index}>
              <h3 className="font-bold">
                {project.name}
                {project.link && (
                  <a href={project.link} className="text-blue-600 hover:underline ml-2 text-sm" target="_blank" rel="noopener noreferrer">
                    (View Project)
                  </a>
                )}
              </h3>
              <p className="text-gray-700 mt-1 text-justify">{project.description}</p>
              <p className="text-gray-600 mt-1 text-sm">
                <span className="font-bold">Technologies:</span> {project.technologies.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
);

export default ClassicResume;