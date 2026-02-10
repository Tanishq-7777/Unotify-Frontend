import axios from "axios";
import { useState, useRef, useEffect } from "react";
import useProfile from "../store/User";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);
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
  const getProfile = async () => {
    const data = await axios.get("http://localhost:9999/profile", {
      withCredentials: true,
    });
    setData(data.data.data);
  };
  const verifyOtp = async (otp) => {
    try {
      const data = await axios.post(
        "http://localhost:9999/verifyEmail",
        {
          verificationCode: otp,
        },
        { withCredentials: true },
      );

      console.log(data);
      getProfile();
    } catch (err) {
      console.log("not verified");
      setError(true);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (!isNaN(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus on next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      console.log("Verifying OTP:", otpCode);
      // Add your verification logic here
      verifyOtp(otpCode);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

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
                OTP is not valid
              </p>
              <p className="text-red-100 text-xs">Please check and try again</p>
            </div>
          </div>
        </div>
      )}

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-gradient-to-r from-[#00d4ff] to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      {/* OTP Container */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in-up">
        {/* Logo */}
        <div className="mb-6 text-center animate-fade-in-down animation-delay-200">
          <div className="font-['Archivo_Black'] text-7xl md:text-6xl  text-white mb-6 tracking-tight relative inline-block">
            UNO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-orange-500 to-[#00d4ff] animate-gradient-x">
              TIFY
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#00d4ff] rounded-lg blur-2xl opacity-20 -z-10"></div>
          </div>
        </div>

        {/* OTP Card */}
        <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full blur-2xl"></div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse-slow">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We've sent a 6-digit code to
              <br />
              <span className="text-white font-medium">your@email.com</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-16 text-center text-2xl font-bold bg-white/[0.05] border-2 border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-300 hover:border-white/20"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 ${
              isComplete
                ? "bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/50 cursor-pointer"
                : "bg-white/[0.05] text-gray-500 cursor-not-allowed"
            }`}
          >
            Verify & Continue
          </button>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
            ></a>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Check spam folder
            </a>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-xs">
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Secured by UNOTIFY</span>
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
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
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
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
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
