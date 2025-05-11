const ClassicResume = ({ data }: { data: any }) => (
    <div className="p-8 font-serif bg-white text-black border border-gray-300">
      <h1 className="text-3xl font-semibold">{data.personal_details.firstname} {data.personal_details.lastname}</h1>
      <h2 className="text-md text-gray-700">{data.personal_details.headline}</h2>
      <div className="mt-4">
        <p><b>Email:</b> {data.personal_details.email}</p>
        <p><b>Phone:</b> {data.personal_details.phone}</p>
        <p><b>City:</b> {data.personal_details.city}</p>
      </div>
    </div>
  );
  
  export default ClassicResume;