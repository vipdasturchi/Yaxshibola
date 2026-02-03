import { ArrowRight, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { GlassCard } from '../GlassCard';
import { GlassButton } from '../GlassButton';
import { ParallaxSection } from '../ParallaxSection';

export function Home() {
  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="order-2 lg:order-1">
              <GlassCard depth="high" className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-2 mb-2 lg:mb-4">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm lg:text-base text-purple-600 dark:text-purple-400 font-medium">
                    Xush kelibsiz mening portfolio saytimga
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  Salom, Men{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Sardorbek
                  </span>
                </h1>

                <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300">
                  Web Dasturchi & Web Dizayner
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Men mukammal bo'lgan telegram botlar va web saytlar yasayman, va sizning brendingiz uchun dizayn yarataman
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/portfolio">
                    <GlassButton variant="primary" size="lg">
                      Portfolioni ko'rish
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </GlassButton>
                  </Link>
                  <Link to="/contact">
                    <GlassButton variant="secondary" size="lg">
                     Bog'lanish
                    </GlassButton>
                  </Link>
                  <Link to="/snake">
                    <GlassButton variant="secondary" size="lg">
                      🐍 O'yin o'ynash
                    </GlassButton>
                  </Link>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <a
                    href="https://github.com/vipdasturchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="mailto:Sardorbektexno@gmail.com"
                    className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
                  >
                    <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </GlassCard>
            </div>

            {/* Right: Photo */}
            <div className="order-1 lg:order-2">
              <ParallaxSection speed={1.5}>
                <GlassCard depth="high" className="p-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30"></div>
                   <img
  src="./image.png"
  alt="Profile"
  className="relative rounded-3xl w-full h-auto object-cover shadow-2xl"
/>

                  </div>
                </GlassCard>
              </ParallaxSection>
            </div>
          </div>
        </ParallaxSection>

        {/* Floating Stats */}
        <ParallaxSection speed={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <GlassCard depth="medium" className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Tugatilgan loyihalar</p>
            </GlassCard>
            <GlassCard depth="medium" className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                4+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Yillik tajriba</p>
            </GlassCard>
            <GlassCard depth="medium" className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Hamkor kompaniyalar</p>
            </GlassCard>
          </div>
        </ParallaxSection>
      </div>
    </div>
  );
}