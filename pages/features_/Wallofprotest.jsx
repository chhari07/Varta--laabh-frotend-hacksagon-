/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wallofprotest = () => {
  const [showModal, setShowModal] = useState(false);
  const [protests, setProtests] = useState([]);
  const [formData, setFormData] = useState({
    title: '', shortMessage: '', fullMessage: '', pollEnabled: false,
    pollQuestion: '', option1: '', option2: '', tags: '',
    media: '', mediaType: '', documentLink: '',
  });

  useEffect(() => {
    fetchProtests();
  }, []);

  const fetchProtests = async () => {
    const res = await axios.get('http://localhost:5000/api/protests'); // ✅ adjust URL if needed
    setProtests(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProtest = { ...formData };
    try {
      await axios.post('http://localhost:5000/api/protests', newProtest);
      fetchProtests(); // reload list
      setShowModal(false);
      setFormData({ title: '', shortMessage: '', fullMessage: '', pollEnabled: false, pollQuestion: '', option1: '', option2: '', tags: '', media: '', mediaType: '', documentLink: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'media' && files.length > 0) {
      const file = files[0];
      const mediaType = file.type.startsWith('video') ? 'video' : 'image';

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          media: reader.result,
          mediaType,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  return (
    <div className="p-6">
      {/* Banner */}
      <section className="relative h-[300px] md:h-[450px] w-full bg-center bg-cover rounded-3xl overflow-hidden shadow-xl"
        style={{ backgroundImage: 'url("https://i.pinimg.com/736x/40/37/87/4037879abe8061f4e9a73098121a66f7.jpg")' }}>
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">WALL OF THE PROTEST</h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-xl"># Built to Hold Stories, Not Just Bricks.</p>
        </div>
      </section>

      {/* Create Button */}
      <div className="flex justify-center mb-4">
        <button onClick={() => setShowModal(true)} className="bg-black text-white px-6 py-2 rounded">+ Start New Protest</button>
      </div>

      {/* Protest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protests.map((protest, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4">
            {protest.mediaType === 'image' ? (
              <img src={protest.media} alt="Protest" className="rounded mb-3" />
            ) : (
              <video src={protest.media} controls className="rounded mb-3" />
            )}
            <h2 className="font-bold text-xl">#{protest.title}</h2>
            <p>{protest.shortMessage}</p>
            <Link to={`/protest/${protest._id}`} className="text-indigo-600 underline mt-2 block">
              See Full Protest →
            </Link>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Protest</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Inputs same as before */}
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" required />
              {/* ... other fields ... */}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallofprotest;
