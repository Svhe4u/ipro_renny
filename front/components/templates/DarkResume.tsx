const DarkResume = ({ data }) => (
  <div className="p-8 bg-gray-900 text-white rounded-lg shadow-lg">
    <h1 className="text-4xl font-extrabold text-teal-400">
      {data.personal_details.firstname} {data.personal_details.lastname}
    </h1>
    <p className="text-lg text-gray-300">{data.personal_details.headline}</p>
    <div className="mt-6 text-sm text-gray-400">
      <p>📍 {data.personal_details.city}</p>
      <p>📧 {data.personal_details.email}</p>
      <p>📞 {data.personal_details.phone}</p>
    </div>
  </div>
);

export default DarkResume;
