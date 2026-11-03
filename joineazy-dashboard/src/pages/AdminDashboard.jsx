
import { useState } from "react";

function AdminDashboard({ user, users, assignments, setAssignments, onLogout }) {
  const students = users.filter((item) => item.role === "student");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const myAssignments = assignments.filter(
    (item) => item.createdBy === user.email
  );

  function handleStudentChange(email) {
    if (selectedStudents.includes(email)) {
      setSelectedStudents(
        selectedStudents.filter((item) => item !== email)
      );
    } else {
      setSelectedStudents([...selectedStudents, email]);
    }
  }

  function selectAllStudents() {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((item) => item.email));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    if (editId) {
      setAssignments(
        assignments.map((item) =>
          item.id === editId
            ? {
                ...item,
                title,
                description,
                dueDate,
                driveLink,
                assignedTo: selectedStudents,
              }
            : item
        )
      );
    } else {
      const newAssignment = {
        id: Date.now(),
        title,
        description,
        dueDate,
        driveLink,
        createdBy: user.email,
        assignedTo: selectedStudents,
        statusByStudent: {},
      };

      setAssignments([...assignments, newAssignment]);
    }

    resetForm();
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setDriveLink("");
    setSelectedStudents([]);
    setEditId(null);
  }

  function handleEdit(assignment) {
    setEditId(assignment.id);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDueDate(assignment.dueDate);
    setDriveLink(assignment.driveLink);
    setSelectedStudents(assignment.assignedTo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (confirmDelete) {
      setAssignments(
        assignments.filter((item) => item.id !== id)
      );
    }
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

      <main className="max-w-6xl mx-auto p-6">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h2>
          <p className="text-gray-500 mt-2">
            Welcome {user.name}, manage your assignments here.
          </p>
        </div>

        {/* Create Assignment Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">

          <h3 className="text-xl font-bold text-gray-800 mb-5">
            {editId ? "Edit Assignment" : "Create New Assignment"}
          </h3>

          <form onSubmit={handleSubmit}>

            <label className="block mb-2 font-medium">
              Assignment Title
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              className="w-full border p-3 rounded-lg mb-4"
            />

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter assignment description"
              className="w-full border p-3 rounded-lg mb-4"
              rows="3"
            />

            <label className="block mb-2 font-medium">
              Due Date
            </label>

            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <label className="block mb-2 font-medium">
              Google Drive Link
            </label>

            <input
              type="url"
              required
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full border p-3 rounded-lg mb-5"
            />

            {/* Student Selection */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">
                Assign to Students
              </h4>

              <button
                type="button"
                onClick={selectAllStudents}
                className="text-blue-600 text-sm font-medium"
              >
                {selectedStudents.length === students.length
                  ? "Unselect All"
                  : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">

              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.email)}
                    onChange={() => handleStudentChange(student.email)}
                  />

                  <span className="text-sm">
                    {student.name}
                  </span>
                </label>
              ))}

            </div>

            <div className="flex gap-3">

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {editId ? "Update Assignment" : "Create Assignment"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* Assignment List */}
        <h3 className="text-2xl font-bold text-gray-800 mb-5">
          My Assignments ({myAssignments.length})
        </h3>

        {myAssignments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center text-gray-500">
            You have not created any assignments yet.
          </div>
        ) : (
          <div className="space-y-5">

            {myAssignments.map((assignment) => {

              const totalStudents = assignment.assignedTo.length;

              const submittedCount = assignment.assignedTo.filter(
                (email) =>
                  assignment.statusByStudent?.[email] === "Submitted"
              ).length;

              const progress = totalStudents
                ? (submittedCount / totalStudents) * 100
                : 0;

              return (
                <div
                  key={assignment.id}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >

                  <div className="flex flex-col sm:flex-row justify-between gap-4">

                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {assignment.title}
                      </h4>

                      <p className="text-gray-500 text-sm mt-2">
                        {assignment.description}
                      </p>

                      <p className="text-sm text-gray-600 mt-3">
                        Due Date: {assignment.dueDate}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(assignment)}
                        className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg h-fit"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(assignment.id)}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg h-fit"
                      >
                        Delete
                      </button>
                    </div>

                  </div>

                  {/* Class Progress */}
                  <div className="mt-6">

                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-semibold">
                        Class Progress
                      </span>

                      <span className="text-blue-600 font-semibold">
                        {submittedCount} / {totalStudents} Submitted
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 h-3 rounded-full">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {Math.round(progress)}% completed
                    </p>

                  </div>

                  {/* Student Status */}
                  <div className="mt-6">

                    <h5 className="font-semibold mb-3">
                      Student Submission Status
                    </h5>

                    <div className="space-y-2">

                      {assignment.assignedTo.map((email) => {
                        const student = students.find(
                          (item) => item.email === email
                        );

                        const status =
                          assignment.statusByStudent?.[email] || "Pending";

                        return (
                          <div
                            key={email}
                            className="flex justify-between items-center border-b pb-2"
                          >
                            <span className="text-sm text-gray-700">
                              {student?.name || email}
                            </span>

                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                status === "Submitted"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                        );
                      })}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;
