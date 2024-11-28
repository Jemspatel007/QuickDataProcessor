import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const DataProcessingPage1 = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Handle file upload and processing
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('userEmail'); // Get email from localStorage
    if (!email) {
      alert('Email is missing. Please log in first.');
      return;
    }

    if (file) {
      setIsProcessing(true);

      try {
        // Read file content as base64
        const fileContent = await file.text(); // Read file as text
        const base64Content = btoa(fileContent); // Convert to base64
        console.log("base64content",base64Content)
        // Create payload
        const payload = {
          email: email,
          body: base64Content,
        };

        // API endpoint
        const apiUrl = 'https://6mbz407i73.execute-api.us-east-1.amazonaws.com/dev/uploaddp1';

        // Send payload to the backend
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log("response",response)
        if (response.ok) {
          setIsProcessing(false);
          alert('File uploaded and processing started!');
        } else {
          setIsProcessing(false);
          const errorMessage = await response.text();
          alert(`Error uploading file: ${errorMessage}`);
        }
      } catch (error) {
        setIsProcessing(false);
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
            Convert JSON to CSV
          </h1>

          {/* File Upload Section */}
          <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl mx-auto space-y-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Upload Your JSON File
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div className="border-4 border-dashed border-indigo-500 p-10 rounded-xl flex justify-center items-center">
                <label htmlFor="file-upload" className="text-center text-gray-600 cursor-pointer w-full">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="space-y-4">
                    <FontAwesomeIcon icon={faUpload} size="3x" className="text-indigo-600" />
                    <p className="text-lg font-semibold">Drag & Drop or Click to Browse</p>
                    <p className="text-sm text-gray-500">Only .json files are accepted</p>
                    {fileName && <p className="mt-2 text-gray-700">Selected file: {fileName}</p>}
                  </div>
                </label>
              </div>

              {/* Upload Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className={`${
                    isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white px-8 py-3 rounded-full shadow-md`}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Start Conversion'}
                </button>
              </div>
            </form>

            {/* Additional Notes */}
            <p className="text-center text-gray-600 text-sm">
              Please upload a valid JSON file for conversion. You will receive a CSV once the conversion is completed.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DataProcessingPage1;
