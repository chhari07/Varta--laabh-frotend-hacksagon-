/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { Users, MessageSquareQuote, Eye } from "lucide-react";
import { supabase } from "../lib/supabaseClient"; // adjust your path here

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const SamuhikCharcha = () => {
  const [activeTab, setActiveTab] = useState("lokmanthan");
  const [user, setUser] = useState(null);
  const [topics, setTopics] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const cardRefs = useRef({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    title: "",
    summary: "",
    opinion: "",
    articles: "",
    reference: "",
    docLink: "",
    options: ["", ""],
    image: null,
  });

  const [draftform, setDraftForm] = useState({
    title: "",
    summary: "",
    category: "Education",
    clauses: ["", "", ""],
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session fetch error:", error.message);
      } else {
        setUser(session?.user || null);
      }
    };

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      setUser(data.user);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicRes, draftRes] = await Promise.all([
          api.get("/topics"),
          api.get("/drafts"),
        ]);
        setTopics(topicRes.data);
        setDrafts(draftRes.data);
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageURL = null;

    if (form.image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageURL = reader.result;
        await submitTopic(imageURL);
      };
      reader.readAsDataURL(form.image);
    } else {
      await submitTopic(null);
    }
  };

  const submitTopic = async (imageURL) => {
    const topicData = {
      ...form,
      imageURL,
      comments: [],
      votes: form.options.map(() => ({ up: 0, down: 0 })),
    };

    try {
      await api.post("/topics", topicData);
      const res = await api.get("/topics");
      setTopics(res.data);
      setForm({
        title: "", summary: "", opinion: "", articles: "", reference: "",
        docLink: "", options: ["", ""], image: null,
      });
    } catch (err) {
      console.error("Submit topic error:", err);
    }
  };

  const handleVote = async (topicId, optIndex, type) => {
    try {
      await api.patch(`/topics/${topicId}/vote`, { optIndex, type });
      const res = await api.get("/topics");
      setTopics(res.data);
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  const handleComment = async (topicId) => {
    const comment = commentInputs[topicId]?.text?.trim();
    const location = commentInputs[topicId]?.location?.trim();
    if (!comment) return;

    const full = `${comment}${location ? ` — (${location})` : ""}`;
    try {
      await api.patch(`/topics/${topicId}/comment`, { comment: full });
      const res = await api.get("/topics");
      setTopics(res.data);
    } catch (err) {
      console.error("Comment error:", err);
    }

    setCommentInputs((prev) => ({
      ...prev,
      [topicId]: { text: "", location: "" },
    }));
  };

  const handledraftSubmit = async (e) => {
    e.preventDefault();
    const newDraft = {
      ...draftform,
      reactions: { support: 0, oppose: 0, neutral: 0 },
    };

    try {
      await api.post("/drafts", newDraft);
      const res = await api.get("/drafts");
      setDrafts(res.data);
      setDraftForm({ title: "", summary: "", category: "Education", clauses: ["", "", ""] });
    } catch (err) {
      console.error("Submit draft error:", err);
    }
  };

  const handleReaction = async (id, type) => {
    try {
      await api.patch(`/drafts/${id}/react`, { type });
      const res = await api.get("/drafts");
      setDrafts(res.data);
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  const handleDownload = async (id) => {
    const element = cardRefs.current[id];
    if (!element) return;
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${id}_draft_card.png`;
    link.click();
  };

  const handleShare = (draft) => {
    const text = `📜 *${draft.title}*\n\n${draft.summary}\n\nCategory: ${draft.category}\n\n#PeopleDraft`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const tabs = [
    { id: "lokmanthan", name: "Lok Manthan", icon: <MessageSquareQuote /> },
    { id: "drafts", name: "People’s Draft", icon: <Users /> },
    { id: "profile", name: "Profile", icon: <Eye /> },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
     <section className="relative w-full h-64 md:h-96 bg-cover bg-center rounded-3xl overflow-hidden mb-8"
        style={{ backgroundImage: `url("https://i.pinimg.com/736x/9d/34/04/9d3404a487687eae4d1fa055dc6eb12f.jpg")` }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">Samuhik Charcha</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Thoughts, Expression & Dialogue</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded ${activeTab === tab.id ? "bg-black text-white" : "bg-gray-200"}`}>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Lok Manthan Tab */}
      {activeTab === "lokmanthan" && (
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="text-lg font-bold text-indigo-700">📝 Raise a New Topic</h2>
            <input required placeholder="Title" className="w-full border p-2 rounded" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Summary" className="w-full border p-2 rounded" value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            <textarea placeholder="Opinion" className="w-full border p-2 rounded" value={form.opinion}
              onChange={(e) => setForm({ ...form, opinion: e.target.value })} />
            <input placeholder="Articles" className="w-full border p-2 rounded" value={form.articles}
              onChange={(e) => setForm({ ...form, articles: e.target.value })} />
            <input placeholder="Reference" className="w-full border p-2 rounded" value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })} />
            {form.options.map((opt, i) => (
              <input key={i} placeholder={`Option ${i + 1}`} className="w-full border p-2 rounded" value={opt}
                onChange={(e) => {
                  const updated = [...form.options];
                  updated[i] = e.target.value;
                  setForm({ ...form, options: updated });
                }} />
            ))}
            <button type="button" onClick={() => setForm({ ...form, options: [...form.options, ""] })}
              className="text-indigo-600 text-sm">+ Add Option</button>
            <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
            <input placeholder="Document Link" className="w-full border p-2 rounded" value={form.docLink}
              onChange={(e) => setForm({ ...form, docLink: e.target.value })} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">🚀 Submit</button>
          </form>

          {topics.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded shadow space-y-2">
              <h3 className="text-lg font-bold text-indigo-700">{t.title}</h3>
              <p>{t.summary}</p>
              <p className="italic text-sm">{t.opinion}</p>
              {t.imageURL && <img src={t.imageURL} alt="topic" className="rounded h-64 object-cover" />}
              {t.options.map((opt, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span>{opt}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleVote(t.id, i, "up")} className="bg-green-100 px-2 rounded">👍 {t.votes?.[i]?.up || 0}</button>
                    <button onClick={() => handleVote(t.id, i, "down")} className="bg-red-100 px-2 rounded">👎 {t.votes?.[i]?.down || 0}</button>
                  </div>
                </div>
              ))}
              <div>
                <p className="font-semibold">💬 Comments:</p>
                {t.comments?.map((c, i) => <p key={i}>• {c}</p>)}
                <div className="flex gap-2 mt-2">
                  <input placeholder="📍 Location" className="border rounded px-2 py-1 w-1/3"
                    value={commentInputs[t.id]?.location || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [t.id]: { ...prev[t.id], location: e.target.value } }))
                    } />
                  <input placeholder="Your Comment" className="border rounded px-2 py-1 w-1/2"
                    value={commentInputs[t.id]?.text || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [t.id]: { ...prev[t.id], text: e.target.value } }))
                    } />
                  <button onClick={() => handleComment(t.id)} className="bg-indigo-600 text-white px-3 py-1 rounded">Send</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Draft Tab */}
      {activeTab === "drafts" && (
        <div className="space-y-6">
          <form onSubmit={handledraftSubmit} className="bg-white p-4 rounded shadow space-y-3">
            <input placeholder="Draft Title" className="w-full border p-2 rounded" value={draftform.title}
              onChange={(e) => setDraftForm({ ...draftform, title: e.target.value })} />
            <textarea placeholder="Summary" className="w-full border p-2 rounded" value={draftform.summary}
              onChange={(e) => setDraftForm({ ...draftform, summary: e.target.value })} />
            <select className="w-full border p-2 rounded" value={draftform.category}
              onChange={(e) => setDraftForm({ ...draftform, category: e.target.value })}>
              <option>Education</option>
              <option>Health</option>
              <option>Technology</option>
            </select>
            {draftform.clauses.map((c, i) => (
              <input key={i} placeholder={`Clause ${i + 1}`} className="w-full border p-2 rounded" value={c}
                onChange={(e) => {
                  const updated = [...draftform.clauses];
                  updated[i] = e.target.value;
                  setDraftForm({ ...draftform, clauses: updated });
                }} />
            ))}
            <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Submit Draft</button>
          </form>

          {drafts.map((d) => (
            <div key={d.id} ref={(el) => (cardRefs.current[d.id] = el)} className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-bold text-indigo-800">{d.title}</h4>
              <p>{d.summary}</p>
              <p className="text-sm italic">Category: {d.category}</p>
              <ul className="list-disc ml-6">{d.clauses.map((c, i) => c && <li key={i}>{c}</li>)}</ul>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleReaction(d.id, "support")} className="bg-green-100 px-2 rounded">👍 {d.reactions?.support || 0}</button>
                <button onClick={() => handleReaction(d.id, "oppose")} className="bg-red-100 px-2 rounded">👎 {d.reactions?.oppose || 0}</button>
                <button onClick={() => handleReaction(d.id, "neutral")} className="bg-gray-100 px-2 rounded">😐 {d.reactions?.neutral || 0}</button>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleDownload(d.id)} className="bg-blue-100 px-2 rounded">⬇️ Download</button>
                <button onClick={() => handleShare(d)} className="bg-emerald-100 px-2 rounded">📤 Share</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "profile" && !user && (
        <div className="space-y-3 mb-6">
          <input type="email" placeholder="Email" className="border p-2 rounded w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="border p-2 rounded w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
        </div>
      )}

      }
    </div>
  );
};

export default SamuhikCharcha;
