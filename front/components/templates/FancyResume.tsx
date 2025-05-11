const FancyResume = ({ data }: { data: any }) => (
    <div className="p-10 bg-gradient-to-br from-pink-100 to-purple-200 rounded-xl shadow-xl text-purple-900">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold">{data.personal_details.firstname} {data.personal_details.lastname}</h1>
        <p className="text-xl mt-2 italic">{data.personal_details.headline}</p>
      </div>
      <div className="mt-6 text-lg">
        <p><strong>🌍 Address:</strong> {data.personal_details.address}</p>
        <p><strong>📞 Phone:</strong> {data.personal_details.phone}</p>
        <p><strong>✉️ Email:</strong> {data.personal_details.email}</p>
        <p><strong>🔗 LinkedIn:</strong> <a href={data.personal_details.linkedin} className="underline">{data.personal_details.linkedin}</a></p>
      </div>
    </div>
  );
  
  export default FancyResume;