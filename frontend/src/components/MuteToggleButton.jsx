"use client";
export default function MuteToggleButton({ isMuted, toggleMute }) {
  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Activer le son" : "Couper le son"}
      className="fixed bottom-6 right-6 z-[9999] bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full shadow-lg transition-all duration-300"
    >
      {isMuted ? (
        // Icône volume OFF
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l-5 5h-2v4h2l5 5V5zM16 9l4 4m0-4l-4 4"
          />
        </svg>
      ) : (
        // Icône volume ON
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l-5 5h-2v4h2l5 5V5zM15 10a3 3 0 010 4m2-6a6 6 0 010 8"
          />
        </svg>
      )}
    </button>
  );
}
