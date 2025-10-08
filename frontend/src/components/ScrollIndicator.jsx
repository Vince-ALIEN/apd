"use client";

export default function ScrollIndicator() {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce transition-opacity duration-500">
      <div className="w-6 h-10 border-2 border-black rounded-full flex items-start justify-center p-1">
        <div className="w-1 h-2 bg-black rounded-full animate-pulse" />
      </div>
      <span className="text-black text-xs mt-2 block text-center">
        Faites défiler
      </span>
    </div>
  );
}
