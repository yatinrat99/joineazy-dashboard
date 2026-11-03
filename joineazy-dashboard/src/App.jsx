
import { useEffect, useState } from "react";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const users = [
  { id: 1, name: "Admin One", email: "admin1@gmail.com", password: "123456", role: "admin" },
  { id: 2, name: "Admin Two", email: "admin2@gmail.com", password: "123456", role: "admin" },
  { id: 3, name: "Rahul", email: "rahul@gmail.com", password: "123456", role: "student" },
  { id: 4, name: "Priya", email: "priya@gmail.com", password: "123456", role: "student" },
  { id: 5, name: "Amit", email: "amit@gmail.com", password: "123456", role: "student" },
  { id: 6, name: "Sneha", email: "sneha@gmail.com", password: "123456", role: "student" },
  { id: 7, name: "Rohan", email: "rohan@gmail.com", password: "123456", role: "student" },
];

const initialAssignments = [
  {
    id: 1,
    title: "HTML and CSS Assignment",
    description: "Create a responsive webpage using HTML and CSS.",
    dueDate: "2026-11-05",
    driveLink: "https://drive.google.com",
    createdBy: "admin1@gmail.com",
    assignedTo: ["rahul@gmail.com", "priya@gmail.com"],
    statusByStudent: {},
  },
  {
    id: 2,
    title: "JavaScript Assignment",
    description: "Practice JavaScript array and string methods.",
    dueDate: "2026-11-07",
    driveLink: "https://drive.google.com",
    createdBy: "admin1@gmail.com",
    assignedTo: ["rahul@gmail.com", "amit@gmail.com"],
    statusByStudent: {
      "rahul@gmail.com": "Submitted",
    },
  },
  {
    id: 3,
    title: "React Assignment",
    description: "Build a React application using hooks.",
    dueDate: "2026-11-09",
    driveLink: "https://drive.google.com",
    createdBy: "admin2@gmail.com",
    assignedTo: ["rahul@gmail.com", "sneha@gmail.com"],
    statusByStudent: {},
  },
];

function App() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const [assignments, setAssignments] = useState(() => {
    const savedData = localStorage.getItem("assignments");

    return savedData
      ? JSON.parse(savedData)
      : initialAssignments;
  });

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

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
    setRole("student");
  }

  if (currentUser) {
    if (currentUser.role === "student") {
      return (
        <StudentDashboard
          user={currentUser}
          assignments={assignments}
          setAssignments={setAssignments}
          onLogout={handleLogout}
        />
      );
    }

    return (
      <AdminDashboard
        user={currentUser}
        users={users}
        assignments={assignments}
        setAssignments={setAssignments}
        onLogout={handleLogout}
      />
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
            <p className="text-red-500 text-sm mt-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-7 hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <div className="mt-6 bg-slate-50 p-3 rounded-lg text-sm text-gray-500">
          <p className="font-semibold mb-1">
            Demo Password: 123456
          </p>
          <p>Student: rahul@gmail.com</p>
          <p>Admin: admin1@gmail.com</p>
        </div>

      </div>
    </div>
  );
}

export default App;
