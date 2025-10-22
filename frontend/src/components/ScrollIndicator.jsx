export default function ScrollIndicator() {
  return (
    <div className="fixed bottom-6 left-1/2 z-40 pointer-events-none curtain-content">
      <div className="-translate-x-1/2 flex flex-col items-center animate-bounce transition-opacity duration-500">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
        <span className="text-white text-xs mt-2 text-center whitespace-nowrap">
          Faites défiler
        </span>
      </div>
    </div>
  );
}
