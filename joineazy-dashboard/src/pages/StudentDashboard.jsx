
import { useState } from "react";

function StudentDashboard({ user, onLogout }) {
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            title: "HTML and CSS Assignment",
            description: "Create a responsive webpage using HTML and CSS.",
            dueDate: "2026-11-05",
            driveLink: "https://drive.google.com",
            assignedTo: ["rahul@gmail.com", "priya@gmail.com"],
            status: "Pending",
        },
        {
            id: 2,
            title: "JavaScript Assignment",
            description: "Practice JavaScript array and string methods.",
            dueDate: "2026-11-07",
            driveLink: "https://drive.google.com",
            assignedTo: ["rahul@gmail.com", "amit@gmail.com"],
            status: "Submitted",
        },
        {
            id: 3,
            title: "React Assignment",
            description: "Build a simple React application using hooks.",
            dueDate: "2026-11-09",
            driveLink: "https://drive.google.com",
            assignedTo: ["rahul@gmail.com", "sneha@gmail.com"],
            status: "Pending",
        },
        {
            id: 4,
            title: "Node.js Assignment",
            description: "Create basic APIs using Express.js.",
            dueDate: "2026-11-12",
            driveLink: "https://drive.google.com",
            assignedTo: ["rahul@gmail.com", "rohan@gmail.com"],
            status: "Pending",
        },
        {
            id: 5,
            title: "MongoDB Assignment",
            description: "Practice MongoDB CRUD operations.",
            dueDate: "2026-11-15",
            driveLink: "https://drive.google.com",
            assignedTo: ["rahul@gmail.com", "priya@gmail.com"],
            status: "Pending",
        },
    ]);

    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const myAssignments = assignments.filter((assignment) =>
        assignment.assignedTo.includes(user.email)
    );

    const submittedCount = myAssignments.filter(
        (assignment) => assignment.status === "Submitted"
    ).length;

    const progress = myAssignments.length
        ? (submittedCount / myAssignments.length) * 100
        : 0;

    function confirmSubmission() {
        setAssignments(
            assignments.map((assignment) =>
                assignment.id === selectedAssignment.id
                    ? { ...assignment, status: "Submitted" }
                    : assignment
            )
        );

        setSelectedAssignment(null);
    }

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">
                    Joineazy
                </h1>

                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700">
                        {user.name}
                    </span>

                    <button
                        onClick={onLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Dashboard */}
            <main className="max-w-6xl mx-auto p-6">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome, {user.name}!
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Manage your assignments and track your progress.
                    </p>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Overall Progress
                        </h3>

                        <span className="font-bold text-blue-600">
                            {submittedCount} of {myAssignments.length} Submitted
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                        {Math.round(progress)}% completed
                    </p>
                </div>

                {/* Assignment List */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-5">
                        My Assignments
                    </h3>

                    {myAssignments.length === 0 ? (
                        <div className="bg-white p-10 rounded-xl text-center">
                            <p className="text-gray-500">
                                No assignments assigned yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {myAssignments.map((assignment) => (
                                <div
                                    key={assignment.id}
                                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                                >
                                    <div className="flex justify-between items-start gap-3">

                                        <h4 className="text-xl font-semibold text-gray-800">
                                            {assignment.title}
                                        </h4>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${assignment.status === "Submitted"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {assignment.status}
                                        </span>

                                    </div>

                                    <p className="text-gray-500 mt-3 text-sm">
                                        {assignment.description}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-4">
                                        <strong>Due Date:</strong> {assignment.dueDate}
                                    </p>

                                    <a
                                        href={assignment.driveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block text-blue-600 mt-4 underline text-sm"
                                    >
                                        Open Drive Link
                                    </a>

                                    {assignment.status === "Pending" && (
                                        <button
                                            onClick={() => setSelectedAssignment(assignment)}
                                            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700"
                                        >
                                            Yes, I have submitted
                                        </button>
                                    )}

                                </div>
                            ))}

                        </div>
                    )}
                </div>

            </main>

            {/* Confirmation Dialog */}
            {selectedAssignment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">

                        <h3 className="text-xl font-bold text-gray-800">
                            Confirm Submission
                        </h3>

                        <p className="text-gray-500 mt-3">
                            Are you sure you have submitted
                            {" "}{selectedAssignment.title}?
                        </p>

                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={() => setSelectedAssignment(null)}
                                className="flex-1 border border-gray-300 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmSubmission}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default StudentDashboard;
