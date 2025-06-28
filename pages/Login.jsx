import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate("/blogbazzar");
    } catch (error) {
      setError(error.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Login + background image (visible on all screens) */}
     <div
  className="w-screen h-screen flex items-center justify-center bg-white p-6"
  style={{
    backgroundImage: "url('https://i.pinimg.com/736x/10/ff/1f/10ff1f3744f3694c851d9da52fe491af.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
        <div className="w-full max-w-md px-6 py-8 sm:px-8 sm:py-10 rounded-xl shadow-2xl bg-white/80 backdrop-blur-md">
          <h2 className="text-4xl font-bold text-center mb-6">Welcome Back 👋</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0C1B33] text-white py-2 rounded-lg hover:bg-[#11294b] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    
    </div>
  );
};

export default Login;  