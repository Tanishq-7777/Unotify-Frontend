import axios from "axios";
import { useState } from "react";
import useProfile from "../store/User";
import Notes from "./Notes";
export default function YtNote() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notes = useProfile((store) => store.notes);
  const setNotes = useProfile((store) => store.setNotes);
  console.log(notes);
  function extractYouTubeVideoId(url) {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/(?:.*[?&]v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    return match ? match[1] : null;
  }
  const getYtNotes = async (ytId) => {
    const response = await axios.post(
      "http://localhost:9999/getNotes",
      {
        ytId,
      },
      {
        withCredentials: true,
      },
    );
    setNotes(response.data.data.aiResponse);
  };
  const handleGetNotes = async () => {
    if (url.trim()) {
      setIsLoading(true);
      const ytId = extractYouTubeVideoId(url);
      await getYtNotes(ytId);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGetNotes();
    }
  };

  return (
    <div>
      {notes != "" ? (
        <Notes note={notes} />
      ) : (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 p-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-[#FF6B35] to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float animation-delay-4000"></div>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 top-5 w-full max-w-4xl mx-4 animate-fade-in-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/50 animate-bounce-subtle">
                  <span className="text-5xl">🎥</span>
                </div>
              </div>
              <h1 className="font-['Archivo_Black'] text-6xl md:text-7xl text-white mb-4 tracking-tight">
                Yt
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-500">
                  Note
                </span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                Transform YouTube videos into comprehensive notes instantly
              </p>
            </div>

            <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full blur-2xl"></div>

              <div className="relative">
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-white mb-4">
                    YouTube URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-14 pr-4 py-5 bg-white/[0.05] border-2 border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-300 hover:border-white/20"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3 ml-1">
                    Paste any YouTube video URL to extract notes
                  </p>
                </div>

                <button
                  onClick={handleGetNotes}
                  disabled={!url.trim() || isLoading}
                  className={`w-full py-5 rounded-2xl font-bold text-white text-xl shadow-lg transition-all duration-300 ${
                    url.trim() && !isLoading
                      ? "bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/50 cursor-pointer"
                      : "bg-white/[0.05] text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Video...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      Get Notes
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-400 text-sm">
                  Get your notes in seconds, not minutes
                </p>
              </div>

              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Smart Summary
                </h3>
                <p className="text-gray-400 text-sm">
                  AI-powered extraction of key points
                </p>
              </div>

              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Export Ready
                </h3>
                <p className="text-gray-400 text-sm">
                  Download notes in multiple formats
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-white font-bold text-2xl mb-6">
                How It Works
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                    1
                  </span>
                  <span>Paste URL</span>
                </div>
                <svg
                  className="w-6 h-6 text-gray-600 rotate-90 md:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                    2
                  </span>
                  <span>Click Get Notes</span>
                </div>
                <svg
                  className="w-6 h-6 text-gray-600 rotate-90 md:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                    3
                  </span>
                  <span>Get Your Notes</span>
                </div>
              </div>
            </div>
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
            @keyframes particle {
              0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
              }
              10% {
                opacity: 0.2;
              }
              90% {
                opacity: 0.2;
              }
              100% {
                transform: translateY(-100vh) translateX(50px);
                opacity: 0;
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
            @keyframes bounce-subtle {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-float {
              animation: float 15s ease-in-out infinite;
            }
            .animate-particle {
              animation: particle linear infinite;
            }
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out;
            }
            .animate-bounce-subtle {
              animation: bounce-subtle 2s ease-in-out infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
        </section>
      )}
    </div>
  );
}
