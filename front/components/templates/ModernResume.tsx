const ModernResume = ({ data }: { data: any }) => (
    <div className="p-10 bg-gray-50 text-gray-800 font-sans">
      <h1 className="text-4xl font-bold text-blue-700">{data.personal_details.firstname} {data.personal_details.lastname}</h1>
      <p className="text-lg italic">{data.personal_details.headline}</p>
      <hr className="my-4" />
      <p><strong>📍 Хаяг:</strong> {data.personal_details.address}</p>
      <p><strong>📧 И-мэйл:</strong> {data.personal_details.email}</p>
      <p><strong>📱 Утас:</strong> {data.personal_details.phone}</p>
    </div>
  );
  
  export default ModernResume;