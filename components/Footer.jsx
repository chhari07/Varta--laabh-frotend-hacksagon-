/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mx-auto w-full max-w-container bg-white  px-4 sm:px-6 lg:px-8"
    
    
    >
      <div className="border-t border-slate-900/5 py-10">
        <Link to="/" className="flex flex-col items-center justify-center space-y-1">
          <span className="relative inline-block  bg-white rounded-2xl      px-4   text-red-500">
            &quot; # वार्ता-लाभ  &quot;
          </span>
          <p className="text-black    font-extrabold    text-center text-5xl  ">
            मात्र चर्चा नहीं, संस्कारों का संवाहक;
          </p>
        </Link>

        <p className="mt-5 text-sm leading-6 text-black  bg-white rounded-2xl  text-center text-5x">
          © {new Date().getFullYear()} # वार्ता-लाभ All rights reserved.
        </p>

        
      </div>
    </footer>
  );
};

export default Footer;
