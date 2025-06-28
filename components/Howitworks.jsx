/* eslint-disable no-unused-vars */
import React from "react";
import { FaExchangeAlt, FaLightbulb, FaHandHoldingHeart } from "react-icons/fa";

const items = [
  {
    title: "Varta ",
    icon: <FaExchangeAlt className="w-6 h-6 text-white" />,
    color: "from-indigo-500 to-purple-600",
    desc: "Open dialogue through town halls, podcasts, and online forums exposes people to diverse perspectives, encourages democratic thinking, and nurtures cultural understanding.",
    image: "https://i.pinimg.com/736x/9d/34/04/9d3404a487687eae4d1fa055dc6eb12f.jpg"
  },
  {
    title: "Bodh ",
    icon: <FaLightbulb className="w-6 h-6 text-white" />,
    color: "from-yellow-500 to-orange-500",
    desc: "Meaningful conversations foster empathy, awareness, and informed decision-making. Greater understanding leads to thoughtful policies and a more conscious society.",
    image: "https://i.pinimg.com/736x/2d/48/9f/2d489fe55b41c641eb36ff3f0ece1dea.jpg"
  },
  {
    title: "Laabh ",
    icon: <FaHandHoldingHeart className="w-6 h-6 text-white" />,
    color: "from-green-500 to-teal-500",
    desc: "When shared understanding is turned into action, it drives social progress, collective well-being, and innovation for a better future.",
    image: "https://i.pinimg.com/736x/c2/46/d6/c246d64250350abc013baeea695c4c9b.jpg"
  }
];

const Howitworks = () => {
  const clipPathStyle = {
    clipPath: "polygon(0 0, 100% 8%, 100% 92%, 0% 100%)"
  };

  return (
    <section className="py-16 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            How Does <span className="text-blue-600"># वार्ता-लाभ </span> Work?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Vaarta-Laabh is your all-in-one intelligent platform to ask questions, join discussions,
            stay informed, and grow within a vibrant, AI-powered community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8 mt-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative w-full sm:w-1/3 bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              {/* Angled Image */}
              <div
                className="h-64 bg-cover bg-center transition-all duration-300"
                style={{
                  ...clipPathStyle,
                  backgroundImage: `url(${item.image})`
                }}
              ></div>

              {/* Card Content */}
              <div className="p-6 text-center">
                <div
                  className={`flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-gradient-to-r ${item.color} shadow-md`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Howitworks;
