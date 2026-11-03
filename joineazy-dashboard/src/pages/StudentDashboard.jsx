import React from "react";
import { useState } from "react";


function StudentDashboard({ user, assignments, setAssignments, onLogout }) {

  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedTo.includes(user.email)
  );

  const submittedCount = myAssignments.filter(
    (assignment) =>
      assignment.statusByStudent?.[user.email] === "Submitted"
  ).length;

  const progress = myAssignments.length
    ? (submittedCount / myAssignments.length) * 100
    : 0;

  function confirmSubmission(id) {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              statusByStudent: {
                ...assignment.statusByStudent,
                [user.email]: "Submitted",
              },
            }
          : assignment
      )
    );
  }

  const [selectedAssignment, setSelectedAssignment] = React.useState(null);

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Joineazy
        </h1>

        <div className="flex items-center gap-4">
          <span className="font-medium">{user.name}</span>

          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {user.name}!
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Manage your assignments and track your progress.
        </p>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Overall Progress</h3>

            <span className="text-blue-600 font-bold">
              {submittedCount} of {myAssignments.length} Submitted
            </span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {Math.round(progress)}% completed
          </p>

        </div>

        <h3 className="text-2xl font-bold mb-5">
          My Assignments
        </h3>

        {myAssignments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center text-gray-500">
            No assignments assigned yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {myAssignments.map((assignment) => {

              const status =
                assignment.statusByStudent?.[user.email] || "Pending";

              return (
                <div
                  key={assignment.id}
                  className="bg-white rounded-xl shadow-sm p-6"
                >

                  <div className="flex justify-between gap-3">
                    <h4 className="text-xl font-semibold">
                      {assignment.title}
                    </h4>

                    <span
                      className={`text-xs px-3 py-1 rounded-full h-fit ${
                        status === "Submitted"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <p className="text-gray-500 mt-3 text-sm">
                    {assignment.description}
                  </p>

                  <p className="text-sm mt-4">
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

                  {status === "Pending" && (
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700"
                    >
                      Yes, I have submitted
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </main>

      {/* Confirmation Dialog */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl p-6 max-w-sm w-full">

            <h3 className="text-xl font-bold">
              Confirm Submission
            </h3>

            <p className="text-gray-500 mt-3">
              Are you sure you have submitted this assignment?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setSelectedAssignment(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  confirmSubmission(selectedAssignment.id);
                  setSelectedAssignment(null);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
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


