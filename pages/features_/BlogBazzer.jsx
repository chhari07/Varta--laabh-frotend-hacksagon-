/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { supabase } from '/home/aman-kumar-chhari/Desktop/MERN/projects/Varta_laab-/forum/src/lib/supabaseClient';

import { Link } from "react-router-dom";
import { version } from 'styled-components';


const BlogBazzer = () => {
  // General states  for the simple blog feature 
  const [activeTab, setActiveTab] = useState('feed');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [popReactionId, setPopReactionId] = useState(null);
  const [popReactionEmoji, setPopReactionEmoji] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newHashtag, setNewHashtag] = useState('');
  const [newCategories, setNewCategories] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [user, setUser ] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isBehindStory, setIsBehindStory] = useState(false);
  const [behindTitle, setBehindTitle] = useState('');
  const [behindContent, setBehindContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentBehindStory, setCurrentBehindStory] = useState({ title: '', content: '' });
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStoryContent, setNewStoryContent] = useState('');
  const [showFallback, setShowFallback] = useState(false);
  const [showEmojiPickerFor, setShowEmojiPickerFor] = useState(null);
  const [userReactions, setUserReactions] = useState({});
  const [openPostOptions, setOpenPostOptions] = useState(null); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [debateCount, setDebateCount] = useState(0);
  const [wallCount, setWallCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);
  const [posts, setPosts] = useState(() => {
  const storedPosts = localStorage.getItem('blogPosts');
  return storedPosts ? JSON.parse(storedPosts) : [];
});

//states for debate
  const [showForm, setShowForm] = useState(false);
  const [debates, setDebates] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    author: '',
    pros: '',
    cons: '',
    image: null,
    video: null,
  });







// logic for the simple blog feature 

const userId = user?.uid;

  const shareUrl = window.location.href;

  // Fetch user info on mount and auth change
  useEffect(() => {
    const fetchUser  = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser ();
        if (error) throw error;
        if (user) {
          setUser (user);
          setEmail(user.email || '');
          setDisplayName(user.user_metadata?.full_name || '');
          setPhone(user.user_metadata?.phone || '');
          setDob(user.user_metadata?.dob || '');
          setGender(user.user_metadata?.gender || '');
          setBio(user.user_metadata?.bio || '');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser ();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser  = session?.user ?? null;
      setUser (currentUser );
      if (currentUser ) {
        setEmail(currentUser .email || '');
        setDisplayName(currentUser .user_metadata?.full_name || '');
        setPhone(currentUser .user_metadata?.phone || '');
        setDob(currentUser .user_metadata?.dob || '');
        setGender(currentUser .user_metadata?.gender || '');
        setBio(currentUser .user_metadata?.bio || '');
      } else {
        setEmail('');
        setDisplayName('');
        setPhone('');
        setDob('');
        setGender('');
        setBio('');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleCreatePost = () => {
    if (!newPost.trim() || !newTitle.trim()) return;

    let mediaUrl = null;
    let mediaType = null;

    if (newImage) {
      mediaUrl = URL.createObjectURL(newImage);
      const extension = newImage.name.split('.').pop().toLowerCase();
      mediaType = ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
    }

    const newEntry = {
      id: Date.now(),
      title: newTitle,
      content: newPost,
      time: new Date().toISOString(),
      author: isAnonymous ? 'Anonymous' : (displayName || email || 'User '),
      mediaUrl,
      mediaType,
      likes: 0,
      reactions: {},
      comments: [],
      hashtags: newHashtag.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      categories: newCategories.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0),
      behindStory: {
        title: newStoryTitle,
        content: newStoryContent,
      },
    };

    setPosts([newEntry, ...posts]);

    // Clear form inputs
    setNewPost('');
    setNewTitle('');
    setNewImage(null);
    setNewHashtag('');
    setNewCategories('');
    setNewStoryTitle('');
    setNewStoryContent('');
    setIsAnonymous(true);
    setActiveTab('feed');
  };

  // Function to handle viewing the behind story
  const handleViewBehindStory = (behindStory) => {
    setCurrentBehindStory(behindStory);
    setShowModal(true);
  };

  // local store 
  useEffect(() => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}, [posts]);
  


  // Search functionality
  useEffect(() => {
    const results = posts.filter(post => {
      const tagsMatch = post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const categoriesMatch = post.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()));
      return tagsMatch || categoriesMatch;
    });
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  // Toggle like count
  const toggleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
      setOpenPostOptions(null);
    }
  };

  if (openPostOptions !== null) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [openPostOptions]);

// backend connection for the user profile update
useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoadingStats(true);
      setStatsError(null);
      try {
        const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';
        if (!res.ok) throw new Error('Failed to fetch posts');
        const posts = await res.json();
        if (!Array.isArray(posts)) throw new Error('Unexpected data format');

        const countSectionPosts = (arr, section) =>
          arr.filter((post) => post.section === section).length;

        setBlogCount(countSectionPosts(posts, 'blog-bazzar'));
        setDebateCount(countSectionPosts(posts, 'debate'));
        setWallCount(countSectionPosts(posts, 'wall'));
      } catch (err) {
        console.error(err);
        setStatsError(err.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserData();
  }, [userId]);
  // Add a reaction emoji
  const addReaction = (id, emoji) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const newReactions = { ...post.reactions };
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
        return { ...post, reactions: newReactions };
      }
      return post;
    }));

    setPopReactionId(id);
    setPopReactionEmoji(emoji);
    setTimeout(() => {
      setPopReactionId(null);
      setPopReactionEmoji(null);
    }, 600);
  };



  
useEffect(() => {
  async function fetchFollowersData() {
    try {
      const res = await fetch(`/api/users/${userId}/stats`);
      const data = await res.json();
      setFollowersCount(data.followers || 0);
      setFollowingCount(data.following || 0);
    } catch (err) {
      console.error("Error fetching follow stats", err);
    }
  }

  if (userId) fetchFollowersData();
}, [userId]);

  // Add comment to post
  const addComment = (id, comment) => {
    if (!comment.trim()) return;
    setPosts(posts.map(post => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));
  };

const handleUserReaction = (postId, emoji) => {
  setUserReactions((prev) => ({ ...prev, [postId]: emoji }));

  setPosts((prevPosts) =>
    prevPosts.map((p) =>
      p.id === postId
        ? {
            ...p,
            reactions: {
              ...(p.reactions || {}),
              [emoji]: (p.reactions?.[emoji] || 0) + 1,
            },
          }
        : p
    )
  );
};



  

  // Fetch AI comment
  const fetchAIComment = async (content) => {
    const response = await fetch('YOUR_AI_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({ prompt: content }),
    });

    const data = await response.json();
    return data.comment; // Adjust based on the API response structure
  };

  // Add AI comment to post
  const addAIComment = async (postId) => {
    const post = posts.find(p => p.id === postId);
    const aiComment = await fetchAIComment(post.content);
    addComment(postId, `AI: ${aiComment}`);
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const updatedPost = { ...post, isBookmarked: !post.isBookmarked };
        if (updatedPost.isBookmarked) {
          setBookmarkedPosts([...bookmarkedPosts, updatedPost]);
        } else {
          setBookmarkedPosts(bookmarkedPosts.filter(p => p.id !== id));
        }
        return updatedPost;
      }
      return post;
    }));
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser (null);
  };

  // Update profile handler
  const handleUpdate = async () => {
    setLoading(true);
    setSuccess('');

    try {
      const updates = {
        data: {
          full_name: displayName,
          phone,
          dob,
          gender,
          bio,
        },
      };
      const { error } = await supabase.auth.updateUser (updates);
      if (error) throw error;

      setSuccess('Profile updated!');
      setShowSettings(false);
      setShowDetails(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
    setLoading(false);
  };
  

  // Function to toggle comment visibility
  const toggleComments = (id) => {
    setVisibleComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };



  


  // Updated handleShare function
  const handleShare = async (post) => {
    const shareData = {
      title: post.title,
      text: post.content,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Post shared successfully!');
      } catch (error) {
        console.error('Error sharing the post:', error);
      }
    } else {
      setShowFallback(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

 //  logic for the deabate 
 // Handles both text and file input updates
const handleChange = (e) => {
  const { name, value, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: files && files.length > 0 ? files[0] : value,
  }));
};

// Handles form submission
const handleSubmit = () => {
  const { title, description, tags, author, pros, cons, image, video } = formData;

  // Validation
  if (!title.trim() || !description.trim() || !author.trim()) {
    alert("Please fill in the required fields: Title, Description, and Author.");
    return;
  }

  const newDebate = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    author: author.trim(),
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    imageURL: image ? URL.createObjectURL(image) : '',
    videoURL: video ? URL.createObjectURL(video) : '',
    pros: pros
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((text) => ({ text, votes: 0 })),
    cons: cons
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((text) => ({ text, votes: 0 })),
  };

  setDebates((prev) => [...prev, newDebate]);
  setShowForm(false);

  // Reset form
  setFormData({
    title: '',
    description: '',
    tags: '',
    author: '',
    pros: '',
    cons: '',
    image: null,
    video: null,
  });
};


const handleVote = (debateId, type, index) => {
  const updated = debates.map((debate) => {
    if (debate.id === debateId) {
      const updatedItems = debate[type].map((item, i) =>
        i === index ? { ...item, votes: item.votes + 1 } : item
      );
      return { ...debate, [type]: updatedItems };
    }
    return debate;
  });
  setDebates(updated);
};





  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Blog Bazzar</h2>
          <p className="mb-4">Please log in to continue.</p>
          <a
            href="/login"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-[1700px] mx-auto">
        {/* Header Section */}
        <section
          className="relative w-full bg-cover bg-center h-64 md:h-96 rounded-3xl overflow-hidden mb-8 md:mb-10"
          style={{ backgroundImage: `url("https://i.pinimg.com/736x/81/0a/ec/810aecc8ad131aff091778d02e475271.jpg")` }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">Blog Bazzar</h1>
           <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
             Thoughts, Expression & Dialogue
            
          </p> 
          </div>
        </section>

        {/* User Info and Logout */}
        <div className="flex justify-end items-center mb-4">
          <p className="text-gray-700 mr-4">
            Logged in as: <strong>{displayName || email}</strong>
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
             <>
  {/* Mobile Bottom Navbar */}
  <aside className="fixed m-4   bottom-0 left-0 right-0 flex justify-between items-center bg-white   rounded-2xl   shadow-2xl border-2 border-black   px-2 py-1 md:hidden z-50 rounded-t-xl">
    {[
      { icon: 'fas fa-home', label: 'Home', tab: 'feed' },
      { icon: 'fas fa-users', label: 'Deabate', tab: 'Blog_Deabate_Corner' },
      { icon: 'fas fa-bullhorn', label: 'Wall of the protest', tab: 'protest', route: '/protestwall' },
      { icon: 'fa-solid fa-plus', label: 'Create Blog', tab: 'create' },
      { icon: 'fas fa-bell', label: 'Notifications', tab: 'notifications' },
      { icon: 'fas fa-user', label: 'Profile', tab: 'profile' },
    ].map(({ icon, label, tab, route }) => {
      const isBlogTab = tab === 'create'
      const isActive = activeTab === tab

      return (
        <Link
          key={label}
          to={route || '#'}
          onClick={() => setActiveTab(tab)}
          title={label}
          className={`flex flex-col items-center justify-center flex-1 py-2 rounded-full text-[10px] transition
            ${
              isBlogTab
                ? 'bg-red-500 text-white'
                : isActive
                ? 'bg-black text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
          <i className={`${icon} text-sm mb-0.5`}></i>
          <span>{label.split(' ')[0]}</span>
        </Link>
      )
    })}
  </aside>

  {/* Desktop Sidebar */}
  <aside className="hidden md:flex flex-col items-center bg-white border-2 border-black rounded-2xl p-2 w-16 sticky top-20 self-start space-y-4 shadow-lg">
    {[
      { icon: 'fas fa-home', label: 'Home', tab: 'feed' },
      { icon: 'fas fa-users', label: 'Blog_Deabate_Corner', tab: 'Blog_Deabate_Corner' },
      { icon: 'fas fa-bullhorn', label: 'Wall of the protest', tab: 'protest', route: '/protestwall' },
      { icon: 'fa-solid fa-plus', label: 'Create Blog', tab: 'create' },
      { icon: 'fas fa-bell', label: 'Notifications', tab: 'notifications' },
      { icon: 'fas fa-user', label: 'Profile', tab: 'profile' },
    ].map(({ icon, label, tab, route }) => {
      const isBlogTab = tab === 'create'
      const isActive = activeTab === tab

      return (
        <Link
          key={label}
          to={route || '#'}
          onClick={() => setActiveTab(tab)}
          title={label}
          className={`flex flex-col items-center justify-center rounded-full p-3 w-full transition
            ${
              isBlogTab
                ? 'bg-red-500 text-white'
                : isActive
                ? 'bg-black text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
          <i className={icon}></i>
          </Link>
          )
          })}
          </aside>
        </>


          {/* Main Content */}
          
          <main className="flex-1 bg-white   rounded-2xl p-6 shadow-lg  max-w-6xl ">
             {activeTab === 'feed' && (
                <section className="px-4 sm:px-8 lg:px-16">
               <h2 className="text-3xl font-bold mb-8 text-gray-800">Latest Blogs</h2>
                {posts.length === 0 ? (
                <p className="text-gray-500">No posts yet. Create one!</p>
                 ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                 {posts.map((post) => (
                 <article
                 key={post.id} 
                 className="bg-white rounded-2xl border-2 border-black shadow-md p-4 sm:p-6 space-y-4 w-full  max-w-96  sm:max-w-[650px] mx-auto relative"
                >


              {/* Header: Author Info and Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {post.author ? (
                    <a href={post.profileURL || '#'} className="flex items-center gap-3">
                      <img
                        src={post.photoURL || 'https://via.placeholder.com/150'}
                        className="w-10 h-10 border-black border-2 rounded-full object-cover"
                        alt="Author"
                      />
                    </a>
                  ) : (
                    <a href="/anonymous-profile" className="flex items-center gap-3">
                      <div className="w-10 h-10 border-black border-2 rounded-full overflow-hidden bg-gray-300">
                        <img
                          src="https://i.pinimg.com/736x/59/e7/60/59e760ce0dbf7afd0bdb63bb63397627.jpg"
                          alt="Anonymous User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  )}
                  <div>
                    <p className="font-semibold text-sm text-black">{post.author || 'Anonymous'}</p>
                    <p className="text-xs text-black">{new Date(post.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                {/* Post Options */}
                <div className="relative">
                  <button onClick={() => setOpenPostOptions(openPostOptions === post.id ? null : post.id)} className="text-black hover:text-black text-xl">⋮</button>
                  {openPostOptions === post.id && (
                    <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40 z-30">
                      <div className="flex justify-between items-center px-4 py-2 border-b">
                        <span className="text-sm font-medium text-gray-700">Share</span>
                        <button onClick={() => setOpenPostOptions(null)} className="text-gray-500 hover:text-black text-lg font-bold">×</button>
                      </div>
                      <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (post.mediaUrl || ''))}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" /> Share on WhatsApp
                      </a>
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + ' ' + (post.mediaUrl || ''))}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/x.svg" alt="X" className="w-5 h-5" /> Share on X
                      </a>
                      <a href={`https://www.instagram.com/?url=${encodeURIComponent(post.mediaUrl || '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/instagram.svg" alt="Instagram" className="w-5 h-5" /> Share on Instagram
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <p>{post.title || 'Post'}</p>
              <p className="text-sm text-gray-700">
                {(post.hashtags || []).map((tag, i) => (
                  <span key={i} className="text-blue-500">#{tag} </span>
                ))}
              </p>

              {/* Media */}
              <div className="relative">
                {post.mediaUrl && (
                  post.mediaType === 'video' ? (
                    <video src={post.mediaUrl} controls className="w-full max-h-[450px] rounded-lg object-cover" />
                  ) : (
                    <img src={post.mediaUrl} alt="media" className="w-full max-h-[450px] rounded-lg object-cover" />
                  )
                )}
                <div className="absolute top-2 right-2 bg-white/80 p-2 rounded-lg shadow text-sm text-gray-800 flex flex-col gap-2">
                  {Object.entries(post.reactions || {}).map(([emoji, count]) => (
                    <div key={emoji} className="flex items-center gap-1">
                      <span>{emoji}</span><span>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="flex flex-wrap gap-3 text-sm">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 border px-3 py-1 rounded-full">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFa0lEQVR4nO2ZXUxTZxzGG5278GIX8lHQQkVY5cNaEeioIpVRacUCSin0gyGIIvKx2y3csCv1asnmjJplN8uybDPqxXQ3XphsV8sU0Lanpx+UfkKhLcNJhDLNs7xdliwb7elpD2VLeJKTc3Mufs/b9/zP8z7l8ba0pS2lLWi12yP1w7KF+sGxhbrBO/NHByxB2YXFoOz82lxt/1pQem5xVtpnDtT03QlU9475Dp+tBW98G2+zFTl2qSAsH7oaqh/yh+ovIXRsEAt1FzF/ZADzsgsI1p5H8J1+zEnPYbamD7PVvQgcPotAZQ/8h97z+SXdV3xioyDj4L/VjeaEG0ZuheRD0bB8CCnAwy/phu8guYxRr1h/IyDSZ2cEfrFh2BA+PhwJHx8GB/Dwig3wHtDDXaELe0s7dRsGjqqBHeGGkc8jDSPgGt5ToYenXAd3WRfcpdqbj6sGdnAKH1AP7Aw3jP6w4fBlnZgp7YRrf8eDQL56J4crnzn4mf1auEQdcJVoHprLtW+mbSAj26bsH/BvazBdosF0cfuNtOAXG0eNmwZf0g5n8Rk4itu6UoJ/3jicFW4YCW0mvHPfaTiKWiO0SM1+xJI5v/nwbXDsbYOjsPU6O3j5qCCZj1RA2oeZ6h7YK42wSQywHzRgWmKAV2L8F/xMhQ72sk5YSjUwi9phErWDFmngFGkSwwtbYS9UR6f3qQtZGBi6ygTvrekFLe9H8Pq3WJ6yIeoLYnmSxty1b2CR9cEp1sMjNsBzQA97eRdMNT0IfPI1XjyxYtU7hxcTVvg//gpPD+lAF5+JDy9sIQZgE5y6khQ8xse3heov+RLBe2p64TSMYS30K9bTq+fL8H50C1SZFpZSLbzjN/Fq6cW6z0aDEVAt74Pa1xYfvkANek+zHzztdkYDJFUybRubYhC/h5fApNB3DxG6/ZDxubWFRUxV6mEral0X3iY4RQyQu5TRAInEiV5YsucXvrwPrjV76zbMwpa48LErX/Uhs4Fjg3cTTRu60oCob55zAyszAUwWNseH330SVP7J28wG6i6aE41Ki0SP16tRzg28XonilwJlXHhrzIDyGaOB+SMDkURznj6ox0vazbmBZbMDEwWquPDWfBWoPGWI2YDsQjTRR8olMcJ/+QvODbjGPoVJ0BwXPmaAr1xlNBCsPR9N9IX1SbpBSfSxec6Vnv9swhOhGnQCeGueChZ+UxIGpOciTPHALTbAUtePFacvbfiXdg8mJJ2gBM0J4ak8JSy5TcxbiLQHyWQbV4UOpqN9MYCU4Z0+TB7WJwVP8ZXkF2B+iWere+8mG8ymy7rwTHY2JRNs4Sl+E6jcJuYxSnobNqnSWarFs9oeViZShIc5R/EBowFSOrGNxE5RB55Ku5MykSq8JfcETFmNNYwGSGPmO9TtZZvnHSXtmKruxkube0PgLTknPEm3ebHGLIXDiL34DCarjOuaWJlOCx6WbMXlpOBj20hsFPzZmLE/SdmK2mKgfzeRLrw5W7Fq2/XuHh4bkbov1WMgLWzFZJUBSz9NYOnHJ5io1KW+8jlk9RuvsYKPGSjX7nJX6EIpnWGFrbAK1ZgqUGFSoEoL3pytCNP58tR6U9JVpgKfKBKzW3kFuWt56Yh0lZsFb8pu/IyXrsg51LW/416m4c1ZivuPePI3eFyIFK2uEs2DDMJ//5ircvcvkcqbdJWZ2DaPuFr59US6SsfethDX8OasxoW0X9hkRe0+nUXqPlthy2q68OZsxSqZ8+a3mnbxMi2b4NQe0pjRgmYve3iFl8QD1l/YjRAJWaR0Ir0NqT5Ie2DNU0WsfGWU4jdFqVxlxMI/8ZTkeRKJSar8T/zNuqUt8f7/+gM6KYM5OV1PYAAAAABJRU5ErkJggg==" alt="Like" className="w-6 h-6" /> {post.likes}
                </button>
                <button onClick={() => setVisibleComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))} className="flex items-center gap-1 border px-3 py-1 rounded-full">
                  <img src="data:image/png;base64,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" alt="Comment" className="w-6 h-6" /> {post.comments.length}
                </button>
                <button onClick={() => setShowEmojiPickerFor(prev => prev === post.id ? null : post.id)} className="flex items-center gap-1 border px-3 py-1 rounded-full">
                  <img src="https://static-00.iconduck.com/assets.00/emoji-add-icon-512x512-z7wwtx1x.png" alt="Emoji" className="w-6 h-6" />
                </button>
                    <button onClick={() => toggleBookmark(post.id)} className="ml-auto">
                      <img
                        src={
                          post.isBookmarked
                            ? 'https://img.icons8.com/?size=50&id=26083&format=png&color=000000'
                            : 'https://img.icons8.com/?size=50&id=25157&format=png&color=000000'
                        }
                        alt="Bookmark"
                        className="w-10 h-10"
                      />
                    </button>
              </div>

              {showEmojiPickerFor === post.id && (
                <div className="mt-2 bg-black border rounded-xl shadow-lg p-2 flex gap-2 text-xl z-20">
                  {['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉'].map((emoji) => (
                    <button key={emoji} onClick={() => { handleUserReaction(post.id, emoji); setShowEmojiPickerFor(null); }} className="hover:scale-110 transition-transform">{emoji}</button>
                  ))}
                </div>
              )}

              <button onClick={() => setSelectedPost(post)} className="text-left text-sm text-black   hover:underline">
               <p className="text-black">
               {post.content.length > 120 ? (
               <>
              {post.content.slice(0, 100)}
               <span className="bg-black text-white ml-1.5 px-2 rounded"> See more</span>
               </>
             ) : (
              post.content
              )}
             </p>

              </button>

              {selectedPost && selectedPost.id === post.id && (
              <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">

                  <div className="bg-white p-6 border-black border-2  rounded-lg max-w-md w-full relative shadow-lg">
                    <button onClick={() => setSelectedPost(null)} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">×</button>
                    <h2 className="text-xl font-bold mb-2">{selectedPost.title}</h2>
                     {post.mediaUrl && (
                      post.mediaType === 'video' ? (
                      <video src={post.mediaUrl} controls className="w-full max-h-[450px] rounded-lg object-cover" />
                      ) : (
                     <img src={post.mediaUrl} alt="media" className="w-full max-h-[450px] rounded-lg object-cover" />
                  )
                )}
                    <p className="text-black m-3 ">{selectedPost.content}</p>
                  </div>
                </div>
              )}

              {visibleComments[post.id] && (
                <div className="pt-3">
                  {post.comments.length === 0 ? (
                    <p className="text-sm text-black italic">No comments yet.</p>
                  ) : (
                    post.comments.map((comment, idx) => (
                      <p key={idx} className="text-sm text-white bg-black rounded-2xl p-2 border-b py-1">{comment}</p>
                    ))
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 pt-3 border-t">
                <img src="/user-avatar.png" className="w-8 h-8 rounded-full" alt="User avatar" />
                <input
                  type="text"
                  placeholder="Write a comment"
                  className="flex-1 border border-gray-200 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addComment(post.id, commentInputs[post.id] || '');
                      setCommentInputs({ ...commentInputs, [post.id]: '' });
                    }
                  }}
                />
              </div>
            </article>
          ))}
             </div>
         )}
            </section>
          )}

            {activeTab === 'create' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Create a New Blog</h2>

                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Blog Title"
                  className="w-full p-4 mb-4 rounded-lg border border-gray-300"
                />

                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Write your thoughts here..."
                  rows={6}
                  className="w-full p-4 mb-4 rounded-lg border border-gray-300 resize-none"
                />

                <div className="flex items-center mb-4 gap-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={e => setNewImage(e.target.files?.[0] || null)}
                    className="block"
                  />
                  {newImage && (
                    <img
                      src={URL.createObjectURL(newImage)}
                      alt="Preview"
                      className="h-20 w-auto rounded-md border border-gray-300"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Categories</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newCategories}
                    onChange={e => setNewCategories(e.target.value)}
                  >
                    <option value="Our Nation">Our Nation</option>
                    <option value="myth">Myth and mythology</option>
                    <option value="Enviroment & Sustainbility">Environment & Sustainability </option>
                    <option value="family">family</option>
                    <option value="Finance & Investment">Finance & Investment</option>
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Education & Career">Education & Career</option>
                    <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                    <option value="Food & Recipe">Food & Recipe</option>
                    <option value="Fashion & Beauty">Fashion & Beauty</option>
                    <option value="Digital Marketing & Blogging">Digital Marketing & Blogging</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Entertainment & Pop Culture">Entertainment & Pop Culture</option>
                  </select>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={newHashtag}
                    onChange={e => setNewHashtag(e.target.value)} // ✅ Correct function
                    placeholder="Add hashtags (optional)"
                    className="w-full p-4 rounded-lg border border-gray-300"
                  />
                </div>

                <label className="inline-flex items-center gap-2 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                    className="form-checkbox"
                  />
                  Post anonymously
                </label>

                <br />
                <input
                  type="text"
                  placeholder="Behind Story Title"
                  value={newStoryTitle}
                  onChange={(e) => setNewStoryTitle(e.target.value)}
                  className="w-full p-4 mb-4 rounded-lg border border-gray-300"
                />

                <textarea
                  placeholder="Behind Story Content"
                  value={newStoryContent}
                  onChange={(e) => setNewStoryContent(e.target.value)}
                  className="w-full p-4 mb-4 rounded-lg border border-gray-300 resize-none"
                  rows={6}
                />

                <button
                  onClick={handleCreatePost}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                  disabled={!newPost.trim() || !newTitle.trim()}
                >
                  Publish
                </button>
              </section>
            )}
            {activeTab === 'notifications' && (
              <div>
                hi
              </div>
            )}
      {activeTab === 'Blog_Deabate_Corner' && (
       
  <section className="relative min-h-screen bg-white p-4 font-sans">
    {/* Floating Button */}
    <button
      onClick={() => setShowForm(!showForm)}
      title="Start a Debate"
      className="fixed lg:bottom-6  bottom-20  right-6 w-14 h-14 rounded-full bg-black    text-white text-3xl font-bold shadow-xl hover:scale-110 transition-transform z-50"
    >
      +
    </button>

    {/* Responsive Debate Form */}
    {showForm && (
      <div
  className="fixed inset-0 lg:inset-auto lg:bottom-10 lg:right-10 z-40 m-4  mt-16   lg:m-8 
             flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl p-6 gap-4 
             w-[calc(100%-2rem)] lg:w-[70%] max-h-[90vh] overflow-auto"
>
  {/* Column 1 */}
  <div className="w-full lg:flex-1 space-y-4">
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      type="text"
      placeholder="Debate Title"
      className="w-full p-3 border border-black rounded-lg"
    />
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Debate Description..."
      rows="6"
      className="w-full p-3 border border-black rounded-lg"
    />
  </div>

  {/* Column 2 */}
  <div className="w-full lg:flex-1 space-y-4">
    <input
      name="tags"
      value={formData.tags}
      onChange={handleChange}
      type="text"
      placeholder="Tags (comma separated)"
      className="w-full p-3 border border-black rounded-lg"
    />
    <input
      name="author"
      value={formData.author}
      onChange={handleChange}
      type="text"
      placeholder="Your Name"
      className="w-full p-3 border border-black rounded-lg"
    />
    <input
      name="pros"
      value={formData.pros}
      onChange={handleChange}
      type="text"
      placeholder="Pro Arguments (comma separated)"
      className="w-full p-3 border border-green-300 rounded-lg"
    />
    <input
      name="cons"
      value={formData.cons}
      onChange={handleChange}
      type="text"
      placeholder="Con Arguments (comma separated)"
      className="w-full p-3 border border-red-300 rounded-lg"
    />
  </div>

  {/* Column 3 */}
  <div className="w-full lg:flex-1 space-y-4">
    <div>
      <label className="block font-medium mb-1 text-black">Add Image</label>
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
    <div>
      <label className="block font-medium mb-1 text-black">Add Video</label>
      <input
        name="video"
        type="file"
        accept="video/*"
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
    <button
      onClick={handleSubmit}
      className="w-full bg-black text-white py-3 rounded-xl shadow"
    >
      Submit Debate
    </button>
  </div>
</div>

    )}

    {/* Debate Cards */}
    <div className="max-w-6xl mx-auto mt-10  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {debates.map((debate) => (
      <div
  key={debate.id}
  className="p-6 bg-white rounded-2xl border border-black  shadow-md hover:shadow-lg transition-shadow"
>
  <h3 className="text-xl font-bold  text-black">{debate.title}</h3>
  <p className="text-sm  m-1    text-black">By {debate.author}</p>
  <p className="text-black  p-3   text-sm mb-2">{debate.description}</p>

  <div className="flex flex-wrap gap-2 mb-2">
    {debate.tags.map((tag, idx) => (
      <span
        key={idx}
        className="text-xs bg-black   text-white  px-2 py-1 rounded-full"
      >
        #{tag}
      </span>
    ))}
  </div>

  {debate.imageURL && (
    <img
      src={debate.imageURL}
      alt="Debate"
      className="w-full mt-4 rounded-lg object-cover max-h-48"
    />
  )}

  {debate.videoURL && (
    <video controls className="w-full mt-4 rounded-lg">
      <source src={debate.videoURL} type="video/mp4" />
    </video>
  )}

  {/* Pros Section */}
  {debate.pros?.length > 0 && (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-green-700 mb-1"> Pros:</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {debate.pros.map((p, i) => (
          <li key={i} className="flex items-center justify-between gap-2">
            <span>{p.text}</span>
           <button
           onClick={() => handleVote(debate.id, 'pros', i)}
           className="flex items-center gap-1 text-green-600 hover:text-green-800 text-xs font-medium bg-green-100 px-2 py-1 rounded-full shadow-sm"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#63E6BE" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"/></svg>
             {p.votes}
           </button>

          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Cons Section */}
  {debate.cons?.length > 0 && (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-red-700 mb-1"> Cons:</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {debate.cons.map((c, i) => (
          <li key={i} className="flex items-center justify-between gap-2">
            <span className=' text-black'>{c.text}</span>
            <button
            onClick={() => handleVote(debate.id, 'cons', i)}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs font-medium bg-red-100 px-2 py-1 rounded-full shadow-sm"
            >
            {c.votes}
           </button>

          </li>
        ))}
      </ul>
    </div>
    )}
   </div>
      ))}
    </div>
  </section>
)}



          
            {activeTab === 'profile' && (
          <section className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow">
          <img
            src={photoURL || ''}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-2xl font-semibold">{displayName || 'Your Name'}</h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-gray-200 text-sm px-4 py-1 rounded hover:bg-gray-300 transition"
            >
              {showSettings ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Stats */}
        {loadingStats ? (
  <p className="text-sm text-gray-500 mt-2">Loading stats...</p>
) : (
  <>
    <span><strong>{followersCount}</strong> followers</span>
    <span><strong>{followingCount}</strong> following</span>
  </>
)}


          {/* Bio */}
          <div className="mt-3 text-sm">
            <p><strong>Bio:</strong> {bio || 'No bio set yet.'}</p>
            {showDetails && (
              <div className="mt-2 space-y-1 text-gray-600">
                <p><strong>Phone:</strong> {phone || '(not set)'}</p>
                <p><strong>DOB:</strong> {dob || '(not set)'}</p>
                <p><strong>Gender:</strong> {gender || '(not set)'}</p>
              </div>
            )}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-red-400 rounded-2xl p-2  text-black     mt-2 block hover:underline text-sm"
            >
              {showDetails ? 'Hide More Info' : 'Show More Info'}
            </button>
          </div>
        </div>
      </div> 
     <article className="overflow-x-auto scrollbar-hide [-ms-overflow-style:'none'] [scrollbar-width:'none']">
         <div className="flex gap-4 p-4">
         <div className="min-w-[200px] bg-indigo-100 rounded-xl shadow-md p-4 text-center">
         <h3 className="text-lg font-semibold">Blog Bazzar</h3>
         <p className="text-2xl font-bold">{blogCount}</p>
        </div>

       <div className="min-w-[200px] bg-green-100 rounded-xl shadow-md p-4 text-center">
          <h3 className="text-lg font-semibold">Debate Arena</h3>
      <p className="text-2xl font-bold">{debateCount}</p>
    </div>

    <div className="min-w-[200px] bg-red-100 rounded-xl shadow-md p-4 text-center">
      <h3 className="text-lg font-semibold">Wall of Protest</h3>
      <p className="text-2xl font-bold">{wallCount}</p>
    </div>
  </div>
</article>

  

      {/* Edit Form */}
      {showSettings && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleUpdate();
          }}
          className="mt-8 bg-white p-6 shadow rounded-lg space-y-4 border max-w-2xl"
        >
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              className="w-full p-2 border rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Write a short bio about yourself"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>

          {success && (
            <p className="text-green-600 font-medium mt-2">{success}</p>
          )}
        </form>
      )}
    </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogBazzer;
