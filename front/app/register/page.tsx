

const Register = () => {
    return (
      <div className="max-w-sm mx-auto mt-10 p-4 border rounded-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block">Username</label>
            <input type="text" id="username" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">Password</label>
            <input type="password" id="password" className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
        </form>
      </div>
    );
  };
  
  export default Register;
  