/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Blogbazzar_explain = () => {
  const flowVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
      },
    },
  };

  const elementVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="max-w-[1600px] mt-28 mx-auto px-6 lg:px-16 font-sans text-gray-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-14 mb-32"
      >
        <motion.img
          src="https://i.pinimg.com/736x/81/0a/ec/810aecc8ad131aff091778d02e475271.jpg"
          alt="Community"
          className="w-full h-full rounded-3xl object-cover shadow-2xl"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="space-y-6 backdrop-blur-xl bg-white/50 p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            A Place to Connect
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Welcome to Blog Bazzar — a modern social space to share stories,
            spark ideas, and inspire minds. Whether you're journaling or
            revolutionizing, your voice matters.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Blog Bazzar offers a suite of expressive tools: write freely in our{" "}
            <strong>Simple Blog</strong>, raise your voice on the{" "}
            <strong>Wall of Protest</strong>, or engage in spirited discussions
            in the <strong>Debate Corner</strong>.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            It’s more than a platform—it's a vibrant community where
            authenticity meets activism, and creativity fuels conversation.
          </p>

          {/* Varta Laabh Connection */}
          <div className="pt-6 border-t border-gray-300 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              How Varta Laabh is Connected to Blog Bazzar
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              <strong>Varta Laabh</strong> is a civic-tech platform designed to
              encourage meaningful public dialogue, inclusive participation, and
              democratic engagement across communities. It’s a digital ecosystem
              where ideas, opinions, and activism can thrive through structured
              yet open spaces.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Within this ecosystem, <strong>Blog Bazzar</strong> acts as the
              expressive and narrative heart — a storytelling and idea-sharing
              hub that fuels the conversations happening in Varta Laabh.
            </p>
            <h4 className="text-xl font-semibold text-gray-900 mt-2">
              How Blog Bazzar Fits Inside Varta Laabh
            </h4>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Blog Bazzar is not just a separate blogging site — it's deeply
              embedded in the mission of Varta Laabh. It empowers users by
              giving them tools to <strong>voice</strong>,{" "}
              <strong>amplify</strong>, and <strong>engage</strong>, helping turn
              thoughts into public dialogue.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Flowchart Section */}
      <motion.section
        variants={flowVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-24"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          How Blog Bazzar Works
        </h2>
        <div className="w-full overflow-x-auto rounded-xl p-4">
          <div className="min-w-[1400px]">
            <svg
              viewBox="0 0 1400 500"
              className="w-full h-auto"
              style={{ backgroundColor: "#ffffff", fontFamily: "monospace" }}
            >
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                </marker>
              </defs>

              <motion.text
                x="500"
                y="40"
                fontSize="20"
                fill="#1f2937"
                variants={elementVariant}
              >
                Features of Blog Bazzar
              </motion.text>

              <motion.text
                x="1000"
                y="40"
                fontSize="20"
                fill="#1f2937"
                variants={elementVariant}
              >
                Role in Varta Laabh
              </motion.text>

              <motion.rect
                x="100"
                y="225"
                width="160"
                height="50"
                rx="12"
                fill="#e0f2fe"
                stroke="#0284c7"
                strokeWidth="2"
                variants={elementVariant}
              />
              <motion.text
                x="125"
                y="255"
                fontSize="16"
                fill="#0f172a"
                variants={elementVariant}
              >
                Blog Bazzar
              </motion.text>

              {["110", "250", "390"].map((y, i) => (
                <motion.path
                  key={i}
                  d={`M 260 250 C 370 ${y}, 570 ${y}, 680 ${y}`}
                  stroke={["#f97316", "#10b981", "#8b5cf6"][i]}
                  fill="none"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                  variants={elementVariant}
                />
              ))}

              {[
                {
                  y: 85,
                  label: "Simple Blog",
                  fill: "#fef3c7",
                  stroke: "#f59e0b",
                },
                {
                  y: 225,
                  label: "Wall of Protest",
                  fill: "#d1fae5",
                  stroke: "#10b981",
                },
                {
                  y: 365,
                  label: "Debate Corner",
                  fill: "#ede9fe",
                  stroke: "#8b5cf6",
                },
              ].map((item, i) => (
                <g key={i}>
                  <motion.rect
                    x="680"
                    y={item.y}
                    width="200"
                    height="50"
                    rx="12"
                    fill={item.fill}
                    stroke={item.stroke}
                    strokeWidth="2"
                    variants={elementVariant}
                  />
                  <motion.text
                    x="690"
                    y={item.y + 30}
                    fontSize="16"
                    fill="#1f2937"
                    variants={elementVariant}
                  >
                    {item.label}
                  </motion.text>
                </g>
              ))}

              {[
                {
                  y: 110,
                  text: "Expression & Stories",
                  fill: "#fef9c3",
                  stroke: "#eab308",
                },
                {
                  y: 250,
                  text: "Activism & Civic Voice",
                  fill: "#bbf7d0",
                  stroke: "#22c55e",
                },
                {
                  y: 390,
                  text: "Debate & Policy Talks",
                  fill: "#ddd6fe",
                  stroke: "#7c3aed",
                },
              ].map((item, i) => (
                <g key={i}>
                  <motion.path
                    d={`M 880 ${item.y} C 980 ${item.y}, 980 ${item.y}, 1100 ${item.y}`}
                    fill="none"
                    stroke={item.stroke}
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    variants={elementVariant}
                  />
                  <motion.rect
                    x="1100"
                    y={item.y - 25}
                    width="280"
                    height="50"
                    rx="12"
                    fill={item.fill}
                    stroke={item.stroke}
                    strokeWidth="2"
                    variants={elementVariant}
                  />
                  <motion.text
                    x="1110"
                    y={item.y + 5}
                    fontSize="14"
                    fill="#111827"
                    variants={elementVariant}
                  >
                    {item.text}
                  </motion.text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </motion.section>

      {/* Explore Cards */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        className="text-center mb-36"
      >
        <h2 className="text-4xl font-extrabold mb-14">Explore Blog Bazzar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              name: "Simple Blog",
              title: "Share your everyday thoughts",
              img: "https://i.pinimg.com/736x/b9/03/c6/b903c6c23b47a129f798190599c1595d.jpg",
              link: "/blog/simple",
            },
            {
              name: "Wall of Protest",
              title: "Voices that shape ideas",
              img: "https://i.pinimg.com/736x/71/a1/a4/71a1a4e872643338438043bfbd99cddb.jpg",
              link: "/blog/protest",
            },
            {
              name: "Debate Corner",
              title: "Discuss. Disagree. Discover.",
              img: "https://i.pinimg.com/736x/b8/4e/08/b84e0848a610ff62b1661b1fe27a1127.jpg",
              link: "/blog/debate",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            >
              <motion.img
                src={item.img}
                alt={item.name}
                className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 flex flex-col justify-center items-center text-white text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <p className="text-sm mt-2">{item.title}</p>
                <Link
                  to={item.link}
                  className="mt-4 inline-block text-sm font-medium text-white underline hover:text-indigo-300"
                >
                  Explore →
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Blogbazzar_explain;
