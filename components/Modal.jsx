/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// components/Modal.jsx
import React from "react";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl max-h-[90vh] overflow-y-auto w-full max-w-2xl relative">
      <button className="absolute top-2 right-3 text-gray-500 hover:text-black" onClick={onClose}>✖</button>
      {children}
    </div>
  </div>
);

export default Modal;
