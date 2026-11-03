
import { useState } from "react";

function App() {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Joineazy
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Assignment & Review Dashboard
        </p>

        <div className="mt-8">

          <label className="block font-medium mb-2">
            Select Your Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="admin">Admin (Professor)</option>
          </select>

          <label className="block font-medium mt-5 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block font-medium mt-5 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-7 hover:bg-blue-700"
          >
            Login as {role === "student" ? "Student" : "Admin"}
          </button>

        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Demo Assignment Portal
        </p>

      </div>
    </div>
  );
}

export default App;
