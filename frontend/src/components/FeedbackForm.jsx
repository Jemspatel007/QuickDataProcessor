import React, { useState } from "react";

const FeedbackForm = ({ onClose }) => {
  const [referenceId, setReferenceId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve name from local storage
    const name = localStorage.getItem("name");
    if (!name) {
      alert("User name is not available in local storage. Please log in first.");
      return;
    }

    // Include name in the feedback data
    const feedbackData = { referenceId, description, name };

    try {
      const response = await fetch(
        "https://us-central1-serverless-440117.cloudfunctions.net/getFeedback/saveFeedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackData),
        }
      );

      if (response.ok) {
        // Clear form fields
        setReferenceId("");
        setDescription("");

        // Close the feedback form
        if (onClose) onClose();
        // alert("Feedback submitted successfully!");
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-purple-800">
        Quick Data Processor Feedback
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="referenceId"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Reference ID
          </label>
          <input
            type="text"
            id="referenceId"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Enter Reference ID"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Enter your feedback here"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;