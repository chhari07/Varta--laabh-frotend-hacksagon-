/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative bg-white text-black overflow-hidden font-hind">
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/03/32/fd/0332fd6f15c967af56fa6d9e06f66bc6.jpg')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

        {/* Content */}
        <div className="relative z-20 px-6 py-24 md:px-12 lg:py-32 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-hind">
              <span className="inline-block">
                <Typewriter
                  options={{
                    strings: ["# वार्ता-लाभ "],
                    autoStart: true,
                    loop: true,
                    cursor: "|",
                    delay: 200,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </h1>
            <h2 className="text-4xl    sm:text-3xl md:text-4xl   lg:text-6xl font-semibold mb-6 font-hind">
              मात्र चर्चा नहीं, संस्कारों का संवाहक;
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl mb-8 text-gray-100 font-poppins">
              Whether you're here to ask questions, share knowledge, or engage in meaningful discussions, you've found the right community.
            </p>
            <div className="flex justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-md bg-[#0C1B33] text-white text-lg font-semibold shadow-lg hover:shadow-xl transition font-poppins"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>

          {/* Optional Placeholder for Future Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16"
          >
            {/* Add any illustration/image/animation here */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
