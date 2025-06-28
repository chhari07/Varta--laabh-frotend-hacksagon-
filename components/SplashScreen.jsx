// src/components/SplashScreen.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-6xl md:text-3xl lg:text-7xl font-bold text-gray-800 mb-4">
        MANAD Presents
        </h1>
        <h2 className="text-4xl md:text-2xl lg:text-5xl text-gray-600">
          <Typewriter
            words={['# वार्ता-लाभ ']}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
      </div>
    </div>
  );
};

export default SplashScreen;
