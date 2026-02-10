import React from "react";
import useProfile from "../store/User";
import { Link } from "react-router-dom";

const Jobs = () => {
  const jobs = useProfile((store) => store.jobs);
  const setJobs = useProfile((store) => store.setJobs);
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-[#00d4ff] to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <Link to="/jobsearch">
          <button
            onClick={() => {
              setJobs(null);
            }}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <span className="text-4xl">💼</span>
            </div>
          </div>
          <h1 className="font-['Archivo_Black'] text-5xl md:text-6xl text-white mb-3 tracking-tight">
            Job{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-cyan-400">
              Results
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {jobs?.length || 0} {jobs?.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        <div className="space-y-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div
                key={job.job_id || index}
                className="group relative bg-white/[0.05] backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-[1.01]"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      {job.employer_logo ? (
                        <img
                          src={job.employer_logo}
                          alt={job.employer_name}
                          className="w-16 h-16 rounded-xl object-cover bg-white/10 border border-white/20"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                          {job.employer_name?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {job.job_title}
                      </h3>
                      <p className="text-cyan-400 text-lg font-medium mb-1">
                        {job.employer_name}
                      </p>
                      {job.job_publisher && (
                        <p className="text-gray-500 text-sm">
                          via {job.job_publisher}
                        </p>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <a
                        href={job.job_apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-cyan-400 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                      >
                        Apply Now
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {job.job_employment_type && (
                      <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-medium">
                        {job.job_employment_type}
                      </span>
                    )}
                    {job.job_location && (
                      <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm font-medium flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.job_location}
                      </span>
                    )}
                    {job.job_is_remote === "true" && (
                      <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium">
                        Remote
                      </span>
                    )}
                  </div>

                  {job.job_description && (
                    <div className="mb-6">
                      <h4 className="text-white font-semibold text-lg mb-3">
                        Description
                      </h4>
                      <p className="text-gray-300 leading-relaxed line-clamp-3">
                        {job.job_description}
                      </p>
                    </div>
                  )}

                  {job.employer_website && (
                    <div className="pt-4 border-t border-white/10">
                      <a
                        href={job.employer_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Visit Company Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-500 mb-2">
                No Jobs Found
              </h3>
              <p className="text-gray-600">
                Try searching for a different job title
              </p>
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Jobs;
