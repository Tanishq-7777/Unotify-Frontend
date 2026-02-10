import axios from "axios";
import { useState, useEffect } from "react";
import useProfile from "../store/User";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const setData = useProfile((state) => state.setData);

  // Auto-dismiss error toast after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const loginUser = async (email, password) => {
    try {
      const data = await axios.post(
        "http://localhost:9999/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      setData(data.data.data);
    } catch (error) {
      setError(true);
    }
  };
  console.log(error);

  const signUpUser = async (name, email, password) => {
    try {
      const data = await axios.post(
        "http://localhost:9999/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log("Signup success:", data);
      setData(data.data.data);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(true);
    }
  };

  const handleLoginSignUp = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await loginUser(email, password);
    } else {
      await signUpUser(name, email, password);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Error Toast Notification */}
      {error && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-2xl border border-red-400/30 backdrop-blur-md">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Invalid Credentials
              </p>
              <p className="text-red-100 text-xs">
                Please check your email and password
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-gradient-to-r from-[#00d4ff] to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-['Archivo_Black'] text-5xl text-white mb-2 tracking-tight">
            UNO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#00d4ff]">
              TIFY
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin
              ? "Welcome back! Sign in to continue"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Login Card */}
        <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full blur-2xl"></div>

          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-8 p-1 bg-white/[0.03] rounded-2xl border border-white/10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-[#00d4ff] to-cyan-400 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {!isLogin && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleLoginSignUp}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                isLogin
                  ? "bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:shadow-orange-500/50"
                  : "bg-gradient-to-r from-[#00d4ff] to-cyan-400 hover:shadow-cyan-500/50"
              }`}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 ">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/50 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.95);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-down {
          animation:
            slide-down 0.3s ease-out forwards,
            fade-out 0.3s ease-in 1.7s forwards;
          will-change: opacity, transform;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
