import useProfile from "../store/User";

const Notes = ({ note }) => {
  const setNotes = useProfile((store) => store.setNotes);

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-6 py-4 sm:py-10">
      <div className="max-w-5xl mx-auto flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setNotes("")}
            className="
              flex items-center gap-2
              text-orange-400 hover:text-orange-300
              transition font-semibold
              text-sm sm:text-base
            "
          >
            <span className="text-lg sm:text-xl">←</span>
            Back
          </button>
        </div>

        {/* Card */}
        <div className="relative flex flex-col flex-1 bg-white/[0.05] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Glow */}
          <div className="pointer-events-none absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full blur-2xl" />

          {/* Header */}
          <div className="relative px-4 sm:px-8 py-4 sm:py-6 border-b border-white/10 shrink-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              📝 Your Notes
            </h2>
            <p className="text-gray-400 mt-1 text-xs sm:text-sm">
              Indentation and formatting are preserved
            </p>
          </div>

          {/* Notes body */}
          <div className="relative flex-1 px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto">
            <pre
              className="
                text-gray-100
                text-xs sm:text-sm md:text-[15px]
                leading-relaxed
                whitespace-pre-wrap
                font-mono
              "
            >
              {note}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notes;
