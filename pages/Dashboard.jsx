/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Section = ({ title, subtitle, children, posterImage }) => (
  <section className="mb-6">
    {posterImage && (
      <div className="w-full h-[300px] mb-12 relative rounded-xl overflow-hidden md:h-[500px]">
        <img
          src={posterImage}
          alt="Poster"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-30 flex flex-col justify-end p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-black">{title}</h1>
          <p className="text-sm md:text-lg text-black">{subtitle}</p>
        </div>
      </div>
    )}
    {children}
  </section>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('blogbazzar');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tags, setTags] = useState(['']);
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [blogs, setBlogs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (image) URL.revokeObjectURL(image);
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim() || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    const newBlog = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      image,
      category,
      isAnonymous,
      tags: tags.filter(tag => tag.trim() !== ''),
      date: selectedDate.toISOString(),
      likes: 0,
      comments: [],
    };

    setBlogs(prev => [newBlog, ...prev]);
    setTitle('');
    setContent('');
    setImage(null);
    setCategory('');
    setTags(['']);
    setIsAnonymous(false);
    setSelectedDate(new Date());

    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleLike = (id) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

  const handleComment = (id) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, 'New Comment'] }
          : blog
      )
    );
  };

  const tabs = [
    {
      id: 'blogbazzar',
      label: 'Blog Bazzar',
      iconPath: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l2 2h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z',
      posterImage: 'https://i.pinimg.com/736x/81/0a/ec/810aecc8ad131aff091778d02e475271.jpg',
    },
    {
      id: 'poochhobolo',
      label: 'Pooch bolo',
      iconPath: 'M12 20l-8-8 8-8',
      posterImage: 'https://i.pinimg.com/736x/c4/b9/0c/c4b90c36f5941a3f3daabc385f00c8b4.jpg',
    },
    {
      id: 'samuhikcharcha',
      label: 'Samuhik Charcha',
      iconPath: 'M3 12h18M3 6h18M3 18h18',
      posterImage: 'https://i.pinimg.com/736x/80/34/0f/80340f7db5f0957b7a743a01a35975bb.jpg',
    },
    {
      id: 'kaaryakendra',
      label: 'Kaaryakendra',
      iconPath: 'M12 2L2 7l10 5 10-5-10-5z',
      posterImage: 'https://i.pinimg.com/736x/e9/d7/8b/e9d78bb7b60d07fc58ade74d494aa672.jpg',
    },
    {
      id: 'profile',
      label: 'Profile',
      iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
      posterImage: 'https://i.pinimg.com/736x/dc/11/68/dc11684785d87524272cb96bd74522b4.jpg',
    },
  ];

  // Close sidebar on tab click (for mobile)
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div>
      <div className="min-h-screen mt-16   bg-gray-100 text-gray-900 transition-colors duration-300">
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
          <h1 className="text-xl font-bold">Dashboard</h1>

          {/* Hamburger button for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </header>

        <div className="flex">
          {/* Sidebar: mobile drawer + desktop fixed */}
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          <aside
            className={`fixed top-20 left-0 z-50 h-full w-60 border-r border-gray-300 bg-white transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0 lg:static lg:h-auto`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full px-6 py-4 text-left hover:bg-blue-100 transition flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? 'bg-blue-200 text-blue-900 font-semibold'
                      : 'text-gray-600'
                  }`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={tab.iconPath} />
                </svg>
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1 px-6 py-8 max-w-screen-xl mx-auto mt-20 lg:mt-24">
            {activeTab === 'blogbazzar' && (
              <Section
                title="Blog Bazzar"
                subtitle="Welcome to the Blog Bazzar community! Share your thoughts, ideas, and creativity with fellow bloggers. Join discussions, post your blogs, and explore inspiring content."
                posterImage={tabs.find(t => t.id === 'blogbazzar').posterImage}
              >
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  >
                    <option value="">Select Category</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Tech">Tech</option>
                    <option value="Health">Health</option>
                  </select>
                  <div className="flex items-center mb-4 gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      Post Anonymously
                    </label>
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="text-blue-600 hover:underline"
                    >
                      Upload Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  {image && (
                    <img
                      src={image}
                      alt="Uploaded Preview"
                      className="w-full max-h-48 object-cover rounded mb-4"
                    />
                  )}

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={tags.join(', ')}
                      onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                      placeholder="e.g. travel, food, tech"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Publish Date</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="w-full p-2 border border-gray-300 rounded"
                      dateFormat="MMMM d, yyyy"
                    />
                  </div>

                  <button
                    onClick={handlePublish}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Publish
                  </button>
                </div>

                {/* Display Blogs */}
                <div>
                  {blogs.length === 0 && (
                    <p className="text-center text-gray-500">No blogs published yet.</p>
                  )}
                  {blogs.map(blog => (
                    <article
                      key={blog.id}
                      className="bg-white p-6 rounded-lg shadow-md mb-6"
                    >
                      <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                      <p className="text-gray-700 mb-4">{blog.content}</p>
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt="Blog"
                          className="w-full max-h-64 object-cover rounded mb-4"
                        />
                      )}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500 mr-4">
                            Category: <strong>{blog.category}</strong>
                          </span>
                          <span className="text-sm text-gray-500 mr-4">
                            {blog.isAnonymous ? 'Anonymous' : 'Known Author'}
                          </span>
                          <span className="text-sm text-gray-500">
                            Published on: {new Date(blog.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(blog.id)}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            ❤️ {blog.likes}
                          </button>
                          <button
                            onClick={() => handleComment(blog.id)}
                            className="text-blue-600 hover:underline"
                          >
                            Comments ({blog.comments.length})
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </Section>
            )}

            {/* Other tabs content */}
            {activeTab !== 'blogbazzar' && (
              <Section
                title={tabs.find(t => t.id === activeTab)?.label}
                subtitle="This section is under construction."
                posterImage={tabs.find(t => t.id === activeTab)?.posterImage}
              >
                <p className="text-gray-700">
                  Content for "{tabs.find(t => t.id === activeTab)?.label}" will be here soon.
                </p>
              </Section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
