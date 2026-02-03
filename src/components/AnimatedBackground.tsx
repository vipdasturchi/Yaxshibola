export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-colors duration-500" />
      
      {/* Animated light waves */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          animation: 'wave 15s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute top-0 right-0 w-full h-full opacity-30"
        style={{
          background: 'radial-gradient(circle at 70% 60%, rgba(255, 154, 158, 0.3) 0%, transparent 50%)',
          animation: 'wave2 18s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-0 left-1/2 w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 80%, rgba(132, 94, 247, 0.3) 0%, transparent 50%)',
          animation: 'wave 20s ease-in-out infinite reverse'
        }}
      />
      
      {/* Noise texture overlay */}
      <div className="noise-texture absolute inset-0" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10" />
    </div>
  );
}