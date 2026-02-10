import { useEffect, useState } from "react";

export default function Landing() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      title: "YtNote",
      description: "Paste URL and get notes from a YouTube video",
      icon: "🎥",
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
    {
      title: "JobSearcher",
      description: "Find your dream job effortlessly",
      icon: "💼",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const currentText = features[currentFeature].title;
    const typingSpeed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentFeature((prev) => (prev + 1) % features.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentFeature]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Cursor spotlight effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 53, 0.08), transparent 80%)`,
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-[#00d4ff] to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 animate-fade-in-down hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-300 font-medium">Now Live</span>
        </div>

        {/* Main heading with enhanced styling */}
        <div className="mb-6 animate-fade-in-down animation-delay-200">
          <h1 className="font-['Archivo_Black'] text-7xl md:text-9xl text-white mb-6 tracking-tight relative inline-block cursor-default hover:scale-105 transition-transform duration-500">
            UNO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-orange-500 to-[#00d4ff] animate-gradient-x">
              TIFY
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#00d4ff] rounded-lg blur-2xl opacity-20 -z-10 group-hover:opacity-30 transition-opacity"></div>
          </h1>
          <p className="text-gray-400 text-xl md:text-3xl font-light max-w-3xl mx-auto leading-relaxed hover:text-gray-300 transition-colors duration-300">
            Supercharge your productivity with AI-powered tools
          </p>
        </div>

        {/* Typewriter showcase with enhanced design */}
        <div className="mt-20 mb-16 animate-fade-in-up animation-delay-400">
          <div className="inline-flex items-center justify-center gap-4 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            <span className="text-7xl md:text-8xl animate-bounce-subtle filter drop-shadow-2xl hover:scale-110 transition-transform duration-300 cursor-default">
              {features[currentFeature].icon}
            </span>
          </div>

          <div className="relative inline-block">
            <h2
              className={`font-['Archivo_Black'] text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r ${features[currentFeature].gradient} min-h-[100px] flex items-center justify-center animate-gradient-x`}
            >
              {displayText}
              <span className="inline-block w-1.5 h-14 md:h-20 bg-gradient-to-b from-[#FF6B35] to-[#00d4ff] ml-3 animate-blink rounded-full"></span>
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35]/20 to-[#00d4ff]/20 blur-3xl -z-10 animate-pulse-slow"></div>
          </div>

          <p className="text-gray-300 text-xl md:text-2xl mt-8 max-w-2xl mx-auto transition-all duration-500 leading-relaxed font-light">
            {features[currentFeature].description}
          </p>
        </div>

        {/* Enhanced feature cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-24 max-w-5xl mx-auto animate-fade-in-up animation-delay-600">
          {/* YtNote Card */}
          <a href="#ytnote" className="group relative overflow-hidden block">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-transparent blur-xl animate-shimmer-slow"></div>
            </div>
            <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 group-hover:border-orange-500/50 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-orange-500/20 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/80">
                  🎥
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                  YtNote
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg mb-6 group-hover:text-gray-300 transition-colors">
                  Transform any YouTube video into organized, comprehensive
                  notes instantly. Perfect for learning and research.
                </p>
                <div className="flex items-center text-orange-400 font-semibold text-lg group-hover:gap-4 gap-2 transition-all">
                  Get Started
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">
                    →
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* JobSearcher Card */}
          <a
            href="#jobsearcher"
            className="group relative overflow-hidden block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent blur-xl animate-shimmer-slow"></div>
            </div>
            <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-cyan-500/20 group-hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-500/80">
                  💼
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  JobSearcher
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg mb-6 group-hover:text-gray-300 transition-colors">
                  Discover career opportunities tailored to your skills.
                  AI-powered matching for your dream job.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold text-lg group-hover:gap-4 gap-2 transition-all">
                  Explore Now
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">
                    →
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Enhanced CTA section */}
        <div className="mt-20 animate-fade-in-up animation-delay-800">
          <button className="group relative px-12 py-5 bg-gradient-to-r from-[#FF6B35] via-orange-500 to-[#00d4ff] text-white font-bold text-xl rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 animate-gradient-x">
            <span className="relative z-10 flex items-center gap-3">
              Start Building Now
              <span className="transform group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300">
                ✨
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
              <div className="absolute inset-0 bg-white animate-shimmer-fast"></div>
            </div>
          </button>
          <p className="text-gray-500 text-sm mt-4 hover:text-gray-400 transition-colors">
            No credit card required • Free forever
          </p>
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
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes shimmer-slow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes shimmer-fast {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 5s infinite;
        }
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s infinite;
        }
        .animate-blink {
          animation: blink 1s ease-in-out infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
