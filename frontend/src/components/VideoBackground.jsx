"use client";

export default function VideoBackground({ videoUrl }) {
  if (!videoUrl) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden bg-black"
      style={{ zIndex: 0 }}
    >
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
