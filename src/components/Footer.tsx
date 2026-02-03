import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 pb-8 px-4 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🐍</span>
                </div>
                <span className="text-gray-800 dark:text-white font-semibold">Portfolio</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Men istaganimdek portfolio sayt yaratdim, siz baho bering.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-4">Kerakli linklar</h4>
              <div className="flex flex-col gap-2">
                {['Home', 'About', 'Resume', 'Portfolio', 'Blog', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-4">Bog'lanish</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/vipdasturchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Twitter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a
                  href="mailto:sardorbektexno@gmail.com"
                  className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
              © {currentYear} Yaratildi <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Sardorbek Mashrabbayev tomonidan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}