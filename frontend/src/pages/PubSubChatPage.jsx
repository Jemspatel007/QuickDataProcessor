import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header"; // Adjust path to your Header component
import Footer from "../components/Footer"; // Adjust path to your Footer component

const PubSubChatPage = () => {
  const [referenceCode, setReferenceCode] = useState("");
  const [concernText, setConcernText] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [fileIds, setFileIds] = useState([]); // State for file IDs
  const [dropdownLoading, setDropdownLoading] = useState(false); // Loading state for dropdown

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch file IDs when the component mounts
  useEffect(() => {
    const fetchFileIds = async () => {
      const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage
      if (!email) {
        setResponseMessage("Error: User email not found in local storage.");
        return;
      }

      try {
        setDropdownLoading(true);
        const response = await fetch(
          "https://c71c3c65hh.execute-api.us-east-1.amazonaws.com/dev/getFileIDS",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const parsedBody = JSON.parse(data.body); // Parse the `body` field
          setFileIds(parsedBody.file_ids || []); // Update file IDs
        } else {
          setResponseMessage("Error: Failed to fetch file IDs.");
        }
      } catch (error) {
        setResponseMessage(`Error: ${error.message}`);
      } finally {
        setDropdownLoading(false);
      }
    };

    fetchFileIds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("userEmail");

    if (!name || !email) {
      setLoading(false);
      setResponseMessage("Error: User information not found in local storage.");
      return;
    }

    const payload = {
      name,
      email,
      referenceCode,
      concernText,
    };

    try {
      const response = await fetch(
        "https://us-central1-quickdataprocessorbot-kxxq.cloudfunctions.net/publish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const message = await response.text();
        setResponseMessage(`Success: ${message}`);

        // Redirect to User Concerns page after publishing
        setTimeout(() => {
          navigate("/user-concerns");
        }, 1500);
      } else {
        const error = await response.text();
        setResponseMessage(`Error: ${error}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Publish Concern
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Reference Code Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="referenceCode"
                className="block text-gray-700 font-medium mb-2"
              >
                Reference Code
              </label>
              <select
                id="referenceCode"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              >
                <option value="" disabled>
                  {dropdownLoading ? "Loading..." : "Select a Reference Code"}
                </option>
                {fileIds.map((fileId) => (
                  <option key={fileId} value={fileId}>
                    {fileId}
                  </option>
                ))}
              </select>
            </div>
            {/* Concern Text */}
            <div className="mb-4">
              <label
                htmlFor="concernText"
                className="block text-gray-700 font-medium mb-2"
              >
                Concern Text
              </label>
              <textarea
                id="concernText"
                value={concernText}
                onChange={(e) => setConcernText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter your concern"
                rows="4"
                required
              ></textarea>
            </div>
            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 text-white font-bold rounded-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600"
                }`}
              >
                {loading ? "Publishing..." : "Publish Concern"}
              </button>
            </div>
            {/* Response Message */}
            {responseMessage && (
              <div
                className={`text-center font-medium mt-4 ${
                  responseMessage.startsWith("Success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {responseMessage}
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PubSubChatPage;
