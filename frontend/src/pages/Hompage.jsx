import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Homepage = () => {
    const [showBot, setShowBot] = useState(false);

    const toggleBot = () => {
        setShowBot((prevState) => !prevState);
    };

    const closeBot = () => {
        setShowBot(false);
    };

    return (
        <div className="flex flex-col min-h-screen justify-between relative">
            <Header />

            {/* Ask Me Anything button */}
            <button 
                onClick={toggleBot} 
                className="fixed bottom-4 right-4 bg-gray-500 text-white p-3 rounded-full shadow-lg"
            >
                Ask Me Anything
            </button>

            {/* Chatbot iframe with conditional rendering */}
            {showBot && (
                <div className="absolute bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg">
                    {/* Close Button */}
                    <button
    onClick={closeBot}
    className="absolute top-1 right-1 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 hover:text-gray-700"
>
    ✖
</button>
                    <iframe
                        id="dialogflow-iframe"
                        allow="microphone;"
                        width="350"
                        height="430"
                        src="https://console.dialogflow.com/api-client/demo/embedded/9d53a214-e4d0-462e-8403-9277d059e667"
                        style={{ border: 'none' }}
                    />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Homepage;
