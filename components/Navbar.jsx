/* eslint-disable no-unused-vars */
// src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileDashboardOpen, setIsMobileDashboardOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      listener.subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsProfileOpen(false);
    setIsMobileDashboardOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contactus" },
    { name: "About", path: "/aboutus" },
    { name: "Vision", path: "/ourvision" },
  ];

  const dashboardItems = [
    { name: "Blog Bazzar", path: "/blogbazzar" },
    { name: "Kaarya Kendra", path: "/kaaryakendra" },
    { name: "Poochho Bolo", path: "/poochhobolo" },
    { name: "Samuhik Charcha", path: "/samuhikcharcha" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="fixed top-3 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] bg-white/70 backdrop-blur-md rounded-xl shadow-md z-50 border border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black    tracking-wide">
            # वार्ता-लाभ 
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-700  text-white"
                      : "text-gray-700  hover:bg-indigo-700"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-indigo-100 transition"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-50">
                    {dashboardItems.slice(0, 4).map(({ name, path }) => (
                      <Link key={name} to={path} className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                        {name}
                      </Link>
                    ))}
                    <div className="border-t my-1" />
                    {dashboardItems.slice(4).map(({ name, path }) => (
                      <Link key={name} to={path} className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                        {name}
                      </Link>
                    ))}
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <LogOut className="inline w-4 h-4 mr-1" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-black   hover:bg-indigo-700 rounded-md">
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 rounded-b-xl shadow-md">
          <div className="space-y-1 px-2 py-3">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-black  hover:bg-indigo-400"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => setIsMobileDashboardOpen(!isMobileDashboardOpen)}
                  className="flex justify-between items-center w-full px-3 py-2 text-left text-base font-medium text-black   hover:bg-indigo-400"
                >
                  <span>Dashboard</span>
                  {isMobileDashboardOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {isMobileDashboardOpen && (
                  <div className="pl-4 space-y-1">
                    {dashboardItems.map(({ name, path }) => (
                      <Link
                        key={name}
                        to={path}
                        className="block px-3 py-2 text-sm text-black rounded-2xl  hover:bg-indigo-400"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileDashboardOpen(false);
                        }}
                      >
                        {name}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-black rounded-2xl   "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-indigo-600" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="block px-3 py-2" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
