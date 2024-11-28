import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const DataProcessingPage3 = () => {
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

  // Convert file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 part after data:image/png;base64,
      reader.onerror = reject;
      reader.readAsDataURL(file); // Read file as base64
    });
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
        // Convert file to base64
        const base64FileContent = await convertToBase64(file);
        console.log("base64FileContent", base64FileContent);

        // Create payload with base64 content
        const payload = {
          email: email,
          body: base64FileContent, // Send base64 encoded content
        };

        // API endpoint to process the file and generate word cloud
        const apiUrl = 'https://6mbz407i73.execute-api.us-east-1.amazonaws.com/dev/uploadtos3dp3'; // Replace with your Lambda endpoint
        console.log("payload", payload);

        // Send payload to the backend
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        console.log("res", response);
        if (response.ok) {
          setIsProcessing(false);
          const result = await response.json();
          alert(`Word Cloud Generated!`);

          // Redirect to Looker Studio URL with the generated word cloud data
          //const lookerStudioUrl = `https://datastudio.google.com/reporting/your-report-id?params=${result.wordCloudData}`;
          //window.open(lookerStudioUrl, '_blank');
        } else {
          setIsProcessing(false);
          const errorMessage = await response.text();
          alert(`Error generating word cloud: ${errorMessage}`);
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
            Word Cloud Generation
          </h1>

          {/* File Upload Section */}
          <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl mx-auto flex flex-col items-center text-center hover:shadow-2xl transition">
            <FontAwesomeIcon icon={faChartLine} size="3x" className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Your Text File
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div className="border-4 border-dashed border-purple-500 p-10 rounded-xl flex justify-center items-center">
                <label htmlFor="file-upload" className="text-center text-gray-600 cursor-pointer w-full">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="space-y-4">
                    <p className="text-lg font-semibold">
                      Drag & Drop or Click to Browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Only .txt files are accepted
                    </p>
                    {fileName && (
                      <p className="mt-2 text-gray-700">Selected file: {fileName}</p>
                    )}
                  </div>
                </label>
              </div>

              {/* Upload Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className={`${
                    isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                  } text-white px-6 py-2 rounded-full shadow-lg transition`}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Generate Word Cloud'}
                </button>
              </div>
            </form>

            {/* Additional Notes */}
            <p className="text-gray-600 text-sm mt-4">
              Upload a valid .txt file to generate a Word Cloud. The Word Cloud will be displayed in GCP Looker Studio.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DataProcessingPage3;
