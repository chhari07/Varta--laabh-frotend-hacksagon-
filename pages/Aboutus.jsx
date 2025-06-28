// eslint-disable-next-line no-unused-vars
import React from 'react';

const Aboutus = () => {
  return (
    <div className="container mx-auto mt-10 px-6 py-12">
      <div className="flex flex-col-reverse shadow-2xl px-9 lg:flex-row items-center lg:space-x-16 space-y-12 lg:space-y-0">
        {/* Text Section */}
        <div className="text w-full lg:w-1/2 space-y-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center lg:text-left">
            About # वार्ता-लाभ 
          </h1>
          <p className="text-lg text-gray-600 mb-6">
          # वार्ता-लाभ  is a knowledge-sharing and learning community where curiosity meets clarity. The name # वार्ता-लाभ comes from Sanskrit roots, meaning “gain through conversation” — symbolizing our core belief that every conversation is an opportunity to grow.
          </p>

          {/* Our Purpose Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Purpose</h2>
            <p className="text-lg text-gray-600 mb-6">
            # वार्ता-लाभ  aims to bring together learners, experts, and thinkers across domains — from science and technology to philosophy, literature, and beyond. We believe in creating a respectful space where questions are welcomed, knowledge is shared freely, and diverse viewpoints are appreciated.
            </p>
          </section>

          {/* What We Offer Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-600">
              <li>Well-organized Q&A system with topic-based discussions</li>
              <li>Support for Markdown formatting and threaded replies</li>
              <li>Profile customization and reputation-building through helpful answers</li>
              <li>Badges and milestones to celebrate your journey</li>
              <li>Admin and moderator support for a safe and positive experience</li>
            </ul>
          </section>

          {/* Our Vision Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 mb-6">
              We envision # वार्ता-लाभ  as a digital gurukul — a space for modern minds to connect through meaningful dialogue, respectful debate, and shared curiosity. It’s not just about answers; it’s about understanding.
            </p>
            <p className="text-lg text-gray-600">
              Join # वार्ता-लाभ  and be part of a growing community that values learning, sharing, and mutual respect.
            </p>
          </section>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <img 
            className="w-full h-auto rounded-xl shadow-lg transform transition duration-500 hover:scale-105" 
            src="https://i.pinimg.com/736x/03/32/fd/0332fd6f15c967af56fa6d9e06f66bc6.jpg" 
            alt="Vaarta-Laab" 
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
