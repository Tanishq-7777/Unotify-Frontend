import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="top-0 left-0 right-0 bg-[#1a1a2e] h-20 shadow-lg z-50">
      {/* Animated gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] via-[#00d4ff] to-[#FF6B35] bg-[length:200%_100%] animate-gradient"></div>

      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="font-['Archivo_Black'] text-3xl text-white tracking-wide">
          UNO<span className="text-[#FF6B35]">TIFY</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-12">
          <li>
            <Link
              to="/ytnote"
              className="text-white font-medium text-base hover:text-[#FF6B35] transition-colors duration-300 relative group"
            >
              YtNote
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/jobsearch"
              className="text-white font-medium text-base hover:text-[#FF6B35] transition-colors duration-300 relative group"
            >
              JobSearcher
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <a
              href="#about"
              className="text-white font-medium text-base hover:text-[#FF6B35] transition-colors duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white font-medium text-base hover:text-[#FF6B35] transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </nav>
  );
}
