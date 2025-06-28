/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Newsletter = () => {
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
          setError('An error occurred while sending your subscription. Please try again later.');
        }
      );
  };

  return (
    <div className="mx-auto mt-32 max-w-7xl mb-10 px-6 sm:mt-56 lg:px-8">
      <div className="relative isolate overflow-hidden bg-[#0C1B33] px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Stay Updated with # वार्ता-लाभ 
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Join our newsletter to receive the latest discussions, trending Q&A, and updates from the # वार्ता-लाभ  community.
        </p>

        {submitted ? (
          <p className="text-center text-green-300 mt-6">Thank you for subscribing!</p>
        ) : (
          <form
            ref={form}
            onSubmit={sendEmail}
            className="mx-auto mt-10 flex max-w-md gap-x-4"
            aria-label="Newsletter Subscription Form"
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="user_email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white placeholder-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Enter your email"
              aria-required="true"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Subscribe to Newsletter"
            >
              Subscribe
            </button>
          </form>
        )}

        {error && <p className="text-center text-red-300 mt-6">{error}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
