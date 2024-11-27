import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Homepage = () => {

    return (
        <div className="flex flex-col min-h-screen justify-between bg-gray-50">
            <Header />
            
            <Footer />
        </div>
    );
};

export default Homepage;
