/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setSubmitted(true);
          setError('');
          form.current.reset();
        },
        (error) => {
          console.error('Email sending failed:', error.text);
          setError('An error occurred while sending your message. Please try again later.');
        }
      );
  };

  return (
    <section className="py-24 bg-white    ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          {/* Left Image Section */}
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img
                  src="https://i.pinimg.com/736x/b8/0d/45/b80d45641b2e2162cc6559254135d77c.jpg"
                  alt="Contact Us"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                />
                <h1 className="font-manrope text-black bg-white rounded-2xl   text-4xl font-bold leading-10 absolute top-11 left-11">
                  Contact us
                </h1>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-gradient-to-r from-orange-500 to-red-600 font-manrope text-4xl font-semibold leading-10 mb-11">
              Send Us A Message
            </h2>

            {submitted ? (
              <p className="text-center text-green-600 text-lg">Thank you for contacting us!</p>
            ) : (
              <form ref={form} onSubmit={sendEmail}>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  required
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  required
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                />

                {/* Preferred method of communication */}
                <div className="mb-6">
                  <h4 className="text-gray-500 text-lg font-normal leading-7 mb-2">
                    Preferred method of communication
                  </h4>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="communication"
                      value="email"
                      checked
                      readOnly
                      className="hidden"
                    />
                    <span className="text-gray-700">Email</span>
                  </div>
                </div>

                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  className="w-full h-32 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-lg border border-gray-200 focus:outline-none p-4 mb-6"
                ></textarea>
                <button
                  type="submit"
                  className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 bg-[#0C1B33]"
                >
                  Send
                </button>
              </form>
            )}

            {error && <p className="text-center text-red-600 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
