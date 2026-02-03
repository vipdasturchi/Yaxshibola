import { Search, Bell, User } from 'lucide-react';

export function GlassNavbar() {
  return (
    <nav className="glass-navbar fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-3xl px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-white font-semibold">i</span>
          </div>
          <span className="text-gray-800 font-medium tracking-tight">iOS Design</span>
        </div>
        
        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {['Home', 'Features', 'Gallery', 'About'].map((item) => (
            <button
              key={item}
              className="px-5 py-2 rounded-full text-gray-700 hover:bg-white/20 hover:text-gray-900 transition-all duration-300 hover:backdrop-blur-md"
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/30">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/30">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}
