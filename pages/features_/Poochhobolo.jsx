/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { supabase } from "/home/aman-kumar-chhari/Desktop/MERN/projects/Varta_laab-/forum/src/lib/supabaseClient";
const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const Poochhobolo = () => {
  const [activeTab, setActiveTab] = useState('justAsk');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('expert');
  const [topics, setTopics] = useState('');
  const [content, setContent] = useState('');
  const [tagExpert, setTagExpert] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [pollOptions, setPollOptions] = useState(['']);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [city, setCity] = useState("Varanasi");
  const [mythsft, setMythsft] = useState([]);
  const [newMyth, setNewMyth] = useState({ title: '', explanation: '', location: city });

  const [form, setForm] = useState({
    claim: "",
    belief: "",
    category: "",
    reason: "",
    evidence: "",
    file: null,
    comments: [],
    mediaUrl: null,
    mediaType: null
  });

  const [myths, setMyths] = useState([]);
  const [showMythForm, setShowMythForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalType, setModalType] = useState("");
  const [newImage, setNewImage] = useState(null);

  const previousMediaUrl = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const qRes = await api.get('/questions');
      setSubmittedQuestions(qRes.data);

      const mRes = await api.get('/myths');
      setMyths(mRes.data);

      const mfRes = await api.get(`/mythsft?city=${city}`);
      setMythsft(mfRes.data);
    };
    fetchData();
  }, [city]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email || '');
      } else if (error) {
        console.error('Failed to fetch user:', error.message);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      setSuccess('Profile updated!');
    } catch (err) {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      question_type: questionType,
      content,
      topics,
      tag_expert: tagExpert,
      verified_only: verifiedOnly,
      is_anonymous: isAnonymous,
      poll_options: questionType === 'poll' ? pollOptions.map(opt => ({ option: opt, votes: { up: 0, down: 0 } })) : null,
      attached_image: attachedImage,
      votes: { up: 0, down: 0 },
      comments: [],
    };
    await api.post('/questions', newQuestion);
    const res = await api.get('/questions');
    setSubmittedQuestions(res.data);

    setQuestion(''); setContent(''); setTopics(''); setTagExpert('');
    setVerifiedOnly(false); setIsAnonymous(false); setPollOptions(['']);
    setAttachedImage(null);
  };

  const handleOptionVote = async (qId, optIndex, type) => {
    await api.patch(`/questions/${qId}/vote`, { optIndex, type });
    const res = await api.get('/questions');
    setSubmittedQuestions(res.data);
  };

  const handleCommentSubmit = async (qId, comment) => {
    await api.patch(`/questions/${qId}/comment`, { comment });
    const res = await api.get('/questions');
    setSubmittedQuestions(res.data);
  };

  const handleMythSubmit = async (e) => {
    e.preventDefault();
    const mediaUrl = newImage ? URL.createObjectURL(newImage) : null;
    const mediaType = newImage ? newImage.type : null;
    const newMyth = { ...form, mediaUrl, mediaType };
    await api.post('/myths', newMyth);
    const res = await api.get('/myths');
    setMyths(res.data);
    setShowMythForm(false);
  };

  const handleMythCommentSubmit = async (e, index) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const myth = myths[index];
    await api.patch(`/myths/${myth._id}/comment`, { comment });
    const res = await api.get('/myths');
    setMyths(res.data);
    e.target.reset();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, file: { url: URL.createObjectURL(file), type: file.type } });
    }
  };

  const openMythModal = (url) => {
    setModalUrl(url);
    setModalType(url.endsWith('.pdf') ? 'pdf' : url.match(/.(jpeg|jpg|png|gif)$/i) ? 'image' : 'link');
    setShowModal(true);
  };

  const submitCulturalMyth = async (e) => {
    e.preventDefault();
    await api.post('/mythsft', newMyth);
    const res = await api.get(`/mythsft?city=${newMyth.location}`);
    setMythsft(res.data);
    setNewMyth({ title: '', explanation: '', location: newMyth.location });
  };

  const tabs = [
    { id: 'justAsk', name: 'Just Ask' },
    { id: 'Mythbuster', name: 'Mythbuster' },
    { id: 'culturaltrail', name: 'Cultural Trail' },
    { id: 'Profile', name: 'Profile' }
  ];

  // The rest of the JSX is defined below this logic block as shown previously.
  return (
    <div className="p-4 max-w-7xl mx-auto mt-20">
         <section className="relative w-full h-64 md:h-96 bg-cover bg-center rounded-3xl overflow-hidden mb-8"
        style={{ backgroundImage: `url("https://i.pinimg.com/736x/c4/b9/0c/c4b90c36f5941a3f3daabc385f00c8b4.jpg")` }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">Poocho bolo</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Thoughts, Expression & Dialogue</p>
        </div>
      </section>
    {/* Tabs Navigation */}
    <div className="flex space-x-4 mb-6 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-full font-medium ${
            activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </div>

    {/* Just Ask */}
    {activeTab === 'justAsk' && (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ask a Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="expert">Expert</option>
            <option value="poll">Poll</option>
          </select>

          {questionType === 'poll' && (
            <div className="space-y-2">
              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...pollOptions];
                    newOptions[idx] = e.target.value;
                    setPollOptions(newOptions);
                  }}
                  className="w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => setPollOptions([...pollOptions, ''])}
              >
                + Add Option
              </button>
            </div>
          )}

          <textarea
            placeholder="More context or content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Tags or Topics"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
              />
              Verified Only
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Ask Anonymously
            </label>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>

        {/* Submitted Questions List */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Submitted Questions</h3>
          {submittedQuestions.map((q, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h4 className="font-medium">{q.question}</h4>
              <p className="text-sm text-gray-600">{q.content}</p>

              {q.poll_options && (
                <div className="mt-2">
                  {q.poll_options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => handleOptionVote(q._id, i, 'up')}
                      >
                        👍
                      </button>
                      <span>{opt.option} – {opt.votes.up}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Mythbuster */}
    {activeTab === 'Mythbuster' && (
      <div>
        <h2 className="text-xl font-semibold mb-4">Myth Buster</h2>
        <form onSubmit={handleMythSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Claim"
            value={form.claim}
            onChange={(e) => setForm({ ...form, claim: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Belief"
            value={form.belief}
            onChange={(e) => setForm({ ...form, belief: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Evidence or Reason"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input type="file" onChange={handleFileChange} />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit Myth
          </button>
        </form>

        {/* Submitted Myths */}
        <div className="mt-6 space-y-4">
          {myths.map((m, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h4 className="font-semibold">{m.claim}</h4>
              <p className="text-sm text-gray-600">{m.reason}</p>
              <form
                onSubmit={(e) => handleMythCommentSubmit(e, index)}
                className="mt-2 flex gap-2"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add comment"
                  className="flex-1 p-2 border rounded"
                />
                <button type="submit" className="px-3 bg-blue-500 text-white rounded">
                  ➤
                </button>
              </form>
              <div className="mt-2 text-sm text-gray-700">
                {m.comments?.map((c, i) => (
                  <p key={i}>💬 {c}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Cultural Trail */}
    {activeTab === 'culturaltrail' && (
      <div>
        <h2 className="text-xl font-semibold mb-4">Cultural Trail</h2>
        <form onSubmit={submitCulturalMyth} className="space-y-4">
          <input
            type="text"
            placeholder="Myth Title"
            value={newMyth.title}
            onChange={(e) => setNewMyth({ ...newMyth, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Explanation"
            value={newMyth.explanation}
            onChange={(e) =>
              setNewMyth({ ...newMyth, explanation: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Location (City)"
            value={newMyth.location}
            onChange={(e) =>
              setNewMyth({ ...newMyth, location: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Submit Cultural Myth
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {mythsft.map((m, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h4 className="font-semibold">{m.title}</h4>
              <p>{m.explanation}</p>
              <p className="text-sm text-gray-500">{m.location}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Profile */}
    {activeTab === 'Profile' && (
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {user ? (
          <div className="space-y-2">
            <p><strong>Email:</strong> {email}</p>
            <form onSubmit={handleProfileUpdate} className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Update Profile
              </button>
            </form>
            <button onClick={handleLogout} className="text-red-600 mt-4 underline">
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No user logged in.</p>
        )}
      </div>
    )}
  </div>
  );
};

export default Poochhobolo;