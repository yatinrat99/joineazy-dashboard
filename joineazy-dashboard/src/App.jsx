
import { useState } from "react";

function App() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const users = [
    { id: 1, name: "Admin One", email: "admin1@gmail.com", password: "123456", role: "admin" },
    { id: 2, name: "Admin Two", email: "admin2@gmail.com", password: "123456", role: "admin" },
    { id: 3, name: "Rahul", email: "rahul@gmail.com", password: "123456", role: "student" },
    { id: 4, name: "Priya", email: "priya@gmail.com", password: "123456", role: "student" },
    { id: 5, name: "Amit", email: "amit@gmail.com", password: "123456", role: "student" },
    { id: 6, name: "Sneha", email: "sneha@gmail.com", password: "123456", role: "student" },
    { id: 7, name: "Rohan", email: "rohan@gmail.com", password: "123456", role: "student" },
  ];

  function handleLogin(e) {
    e.preventDefault();

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password &&
        item.role === role
    );

    if (user) {
      setCurrentUser(user);
      setError("");
    } else {
      setError("Invalid email or password!");
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setEmail("");
    setPassword("");
  }

  if (currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-blue-600">
            Welcome {currentUser.name}!
          </h1>

          <p className="mt-4 text-gray-600">
            You are logged in as {currentUser.role}.
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Joineazy
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Assignment & Review Dashboard
        </p>

        <form onSubmit={handleLogin}>

          <label className="block font-medium mt-8 mb-2">
            Select Your Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="student">Student</option>
            <option value="admin">Admin (Professor)</option>
          </select>

          <label className="block font-medium mt-5 mb-2">
            Email Address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3"
          />

          <label className="block font-medium mt-5 mb-2">
            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3"
          />

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-7 hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <div className="mt-6 bg-slate-50 p-3 rounded-lg text-sm text-gray-500">
          <p className="font-semibold mb-1">Demo Password: 123456</p>
          <p>Student: rahul@gmail.com</p>
          <p>Admin: admin1@gmail.com</p>
        </div>

      </div>
    </div>
  );
}

export default App;
