/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [protest, setProtest] = useState(null);

  useEffect(() => {
    const fetchProtest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/protests/${id}`);
        setProtest(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProtest();
  }, [id]);

  if (!protest) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">No protest data found.</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mt-20 mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-white bg-black rounded-2xl p-1.5">#{protest.title}</h1>
      <div className="mb-8">
        {protest.mediaType === 'image' ? (
          <img src={protest.media} alt="Protest" className="w-full rounded-xl shadow-lg" />
        ) : (
          <video src={protest.media} controls className="w-full rounded-xl shadow-lg" />
        )}
      </div>
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md space-y-6 text-lg leading-relaxed text-gray-800">
        <p><strong className='text-white bg-black p-2 rounded-2xl'>Message:</strong><br />{protest.fullMessage}</p>
        <p><strong className='text-white bg-black p-2 rounded-2xl'>Tags:</strong> {protest.tags}</p>
        {protest.pollEnabled && (
          <div>
            <p><strong>📊 Poll Question:</strong> {protest.pollQuestion}</p>
            <ul className="list-disc pl-6 mt-1">
              <li>{protest.option1}</li>
              <li>{protest.option2}</li>
            </ul>
          </div>
        )}
        {protest.documentLink && (
          <div>
            <p><strong className='text-white bg-black p-2 rounded-2xl'>Related Document:</strong></p>
            <a href={protest.documentLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
              {protest.documentLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtestDetails;
