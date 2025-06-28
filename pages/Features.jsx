/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 gap-x-12 lg:grid-cols-2 items-center">
          {/* Left Side - Text and Features */}
          <div className="lg:pr-12">
            <h2 className="text-lg font-semibold text-blue-700 uppercase tracking-wide">
              Discover # वार्ता-लाभ 
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Empowering Community Voices
            </p>
            <p className="mt-6 text-lg text-gray-700">
              # वार्ता-लाभ  is your digital space to express, collaborate, and engage with a vibrant community.
              Built for connection, powered by purpose.
            </p>
          </div>

          {/* Right Side - Image grid with posters */}
          <div className="flex justify-center bg-black rounded-2xl p-4">
            <div className="grid grid-cols-5 grid-rows-5 gap-4 max-w-xl w-full">

              {/* Blog Bazzar */}
              <Link to="/blogbazzar_explain" className="col-span-3 row-span-2 relative rounded-lg overflow-hidden shadow-lg group">
                <img
                  src="https://i.pinimg.com/736x/81/0a/ec/810aecc8ad131aff091778d02e475271.jpg"
                  alt="Blog Bazzar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
                  <p className="text-white text-lg font-semibold transition-opacity duration-300 group-hover:opacity-0">
                    Blog Bazzar
                  </p>
                  <p className="text-white text-lg font-semibold absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ब्लॉग बाज़ार
                  </p>
                </div>
              </Link>

              {/* Poochho Bolo */}
              <Link to="/poochhobolo_explain" className="col-span-3 row-span-3 col-start-1 row-start-3 relative rounded-lg overflow-hidden shadow-lg group">
                <img
                  src="https://i.pinimg.com/736x/c4/b9/0c/c4b90c36f5941a3f3daabc385f00c8b4.jpg"
                  alt="Pooch Bolo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
                  <p className="text-white text-lg font-semibold transition-opacity duration-300 group-hover:opacity-0">
                    Poochho Bolo
                  </p>
                  <p className="text-white text-lg font-semibold absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    पूछ बोलो
                  </p>
                </div>
              </Link>

              {/* Samuhik Charcha */}
              <Link to="/samuhikcharcha_explain" className="col-span-2 row-span-3 col-start-4 row-start-1 relative rounded-lg overflow-hidden shadow-lg group">
                <img
                  src="https://i.pinimg.com/736x/9d/34/04/9d3404a487687eae4d1fa055dc6eb12f.jpg"
                  alt="Samuhik Charcha"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
                  <p className="text-white text-lg font-semibold transition-opacity duration-300 group-hover:opacity-0">
                    Samuhik Charcha
                  </p>
                  <p className="text-white text-lg font-semibold absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    सामूहिक चर्चा
                  </p>
                </div>
              </Link>

              {/* Kaaryakendra */}
              <Link to="/kaaryakendra_explain" className="col-span-2 row-span-2 col-start-4 row-start-4 relative rounded-lg overflow-hidden shadow-lg group">
                <img
                  src="https://i.pinimg.com/736x/e9/d7/8b/e9d78bb7b60d07fc58ade74d494aa672.jpg"
                  alt="Kaaryakendra"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
                  <p className="text-white text-lg font-semibold transition-opacity duration-300 group-hover:opacity-0">
                    Kaaryakendra
                  </p>
                  <p className="text-white text-lg font-semibold absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    कार्यकेंद्र
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
