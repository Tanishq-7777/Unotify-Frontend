import React, { useState, useRef, useCallback } from "react";
import useProfile from "../store/User";
import axios from "axios";
import { Link } from "react-router-dom";

const Debounced = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const setInputData = useProfile((store) => store.setInputData);
  const inputData = useProfile((store) => store.inputData);

  const jobs = useProfile((store) => store.jobs);
  const setJobs = useProfile((store) => store.setJobs);
  const timerRef = useRef(null);

  const handleJobClick = async (jobTitle) => {
    const data = await axios.get(
      `http://localhost:9999/jobTitles/${jobTitle}`,
      {
        withCredentials: true,
      },
    );
    setJobs(data.data.data);
  };
  const handleJobSearch = async () => {
    const data = await axios.get(`http://localhost:9999/jobTitles/${input}`, {
      withCredentials: true,
    });
    setJobs(data.data.data);
  };

  const fetchJobs = async (value) => {
    if (!value.trim()) {
      setInputData([]);
      return;
    }

    try {
      setLoading(true);
      console.log(value);
      const { data } = await axios.get(
        `http://localhost:9999/jobTitles?title=${value}`,
        { withCredentials: true },
      );
      setInputData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setInput(value);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        fetchJobs(value);
      }, 400);
    },
    [setInputData],
  );

  const handleButtonSearch = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    fetchJobs(input);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <span className="text-4xl">💼</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl text-white mb-3 tracking-tight font-bold">
            Job{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Searcher
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Find jobs instantly</p>
        </div>

        <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl mb-6">
          <label className="block text-lg font-semibold text-white mb-4">
            Search Job Title
          </label>

          <div className="flex gap-3">
            <div className="relative flex-1">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                value={input}
                onChange={handleSearch}
                onKeyDown={(e) => e.key === "Enter" && handleButtonSearch()}
                type="text"
                placeholder="Frontend Developer, Web Designer..."
                className="w-full pl-14 pr-4 py-4 bg-white/[0.05] border-2 border-white/10 rounded-2xl text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
              />
            </div>

            <Link to="/jobsearch/jobs">
              <button
                onClick={handleJobSearch}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/40 hover:scale-[1.03] active:scale-95 transition-all"
              >
                Search
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-gray-400 py-6 ">Searching jobs...</p>
          ) : inputData && inputData.length > 0 ? (
            inputData.map((item, index) => (
              <Link to="/jobsearch/jobs" key={index}>
                <div
                  onClick={() => handleJobClick(item.job_title)}
                  className="bg-white/[0.05] rounded-2xl my-4 px-6 py-4 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer"
                >
                  <p className="text-white text-lg font-medium">
                    {item.job_title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              Start typing or press Search
            </div>
          )}
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
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Debounced;
