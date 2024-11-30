import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase"; // Ensure the path to firebase.js is correct
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../components/Header"; // Adjust the path to your Header component
import Footer from "../components/Footer"; // Adjust the path to your Footer component

const UserConcerns = () => {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const customerEmail = localStorage.getItem("userEmail");

    if (!customerEmail) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchConcerns = async () => {
      setLoading(true); // Set loading to true while data is being fetched
      try {
        // Query Firestore for concerns related to the current customer
        const q = query(
          collection(db, "Concerns"),
          where("customerEmail", "==", customerEmail) 
        );
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot);

        // Map through the results and store them in state
        const concernsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(concernsData);
        setConcerns(concernsData);
      } catch (error) {
        console.error("Error fetching concerns:", error);
        setError("An error occurred while fetching your concerns.");
      } finally {
        setLoading(false); 
      }
    };

    fetchConcerns();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Your Concerns
          </h1>

          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : concerns.length === 0 ? (
            <div className="text-center text-gray-600">No concerns found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {concerns.map((concern) => (
                <div
                  key={concern.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Concern ID: {concern.concernId || "N/A"}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong>Concern:</strong> {concern.concernText || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Agent Name:</strong> {concern.agentName || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Agent Email:</strong> {concern.agentEmail || "N/A"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Customer Name:</strong> {concern.customerName || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status:</strong>{" "}
                    {concern.isActive ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Resolved</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserConcerns;