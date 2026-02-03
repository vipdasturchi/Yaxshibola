import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { GlassCard } from '../GlassCard';
import { GlassButton } from '../GlassButton';
import { ParallaxSection } from '../ParallaxSection';

export function Blog() {
  const featuredPost = {
    id: 1,
    title: 'React va TypeScript yordamida zamonaviy web ilovalar yaratish',
    excerpt:
      'React va TypeScript orqali kengaytiriladigan va xavfsiz web ilovalar yaratish bo‘yicha to‘liq qo‘llanma. Real loyihalardan olingan tavsiyalar, naqshlar va eng yaxshi amaliyotlar.',
    image:
      'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1200&h=600&fit=crop',
    category: 'Darslik',
    date: '15-yanvar, 2026',
    readTime: '12 daqiqa o‘qiladi',
    author: 'Alex Johnson',
  };

  const posts = [
    {
      id: 2,
      title: '2026-yilda web dasturlashning kelajagi',
      excerpt:
        'Web dasturlash kelajagini shakllantirayotgan yangi trendlar, texnologiyalar va yondashuvlar.',
      image:
        'https://images.unsplash.com/photo-1565489030990-e211075fe11c?w=800&h=500&fit=crop',
      category: 'Soha',
      date: '10-yanvar, 2026',
      readTime: '8 daqiqa o‘qiladi',
    },
    {
      id: 3,
      title: 'Tailwind CSS: maslahatlar va fokuslar',
      excerpt:
        'Tailwind CSS bilan chiroyli interfeyslar yaratish uchun ilg‘or texnikalar va eng yaxshi amaliyotlar.',
      image:
        'https://images.unsplash.com/photo-1604781109199-ced99b89b0f6?w=800&h=500&fit=crop',
      category: 'Dizayn',
      date: '5-yanvar, 2026',
      readTime: '10 daqiqa o‘qiladi',
    },
    {
      id: 4,
      title: 'Tezkor React ilovalar yaratish',
      excerpt:
        'React ilovalarini yashin tezligida ishlashi uchun optimizatsiya strategiyalari va tezlik bo‘yicha maslahatlar.',
      image:
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=500&fit=crop',
      category: 'Tezlik',
      date: '28-dekabr, 2025',
      readTime: '15 daqiqa o‘qiladi',
    },
    {
      id: 5,
      title: 'Next.js’da Server Components’ga kirish',
      excerpt:
        'React Server Componentlar nima va ular Next.js dasturlashni qanday o‘zgartirayotganini tushuntiramiz.',
      image:
        'https://images.unsplash.com/photo-1565489030990-e211075fe11c?w=800&h=500&fit=crop',
      category: 'Darslik',
      date: '20-dekabr, 2025',
      readTime: '11 daqiqa o‘qiladi',
    },
    {
      id: 6,
      title: 'Dizayn tizimlari: to‘liq qo‘llanma',
      excerpt:
        'Jamoangiz bilan birga o‘sadigan dizayn tizimlarini qanday yaratish va yuritishni o‘rganing.',
      image:
        'https://images.unsplash.com/photo-1604781109199-ced99b89b0f6?w=800&h=500&fit=crop',
      category: 'Dizayn',
      date: '15-dekabr, 2025',
      readTime: '14 daqiqa o‘qiladi',
    },
    {
      id: 7,
      title: 'GraphQL vs REST: qaysi birini tanlash kerak?',
      excerpt:
        'GraphQL va REST API’larni chuqur solishtirib, qaysi biri siz uchun to‘g‘ri tanlov ekanini aniqlaymiz.',
      image:
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=500&fit=crop',
      category: 'Backend',
      date: '10-dekabr, 2025',
      readTime: '9 daqiqa o‘qiladi',
    },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Web dasturlash bo‘yicha fikrlar, darsliklar va foydali tajribalar
            </p>
          </div>
        </ParallaxSection>

        {/* Featured Post */}
        <ParallaxSection speed={0.8}>
          <GlassCard depth="high" className="p-0 overflow-hidden mb-12 group cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Tavsiya etilgan</span>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div>
                  <GlassButton variant="primary" size="md">
                    Maqolani o‘qish
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </GlassButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </ParallaxSection>

        {/* Recent Posts */}
        <ParallaxSection speed={0.6}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            So‘nggi maqolalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <ParallaxSection key={post.id} speed={0.3 + (index % 3) * 0.1}>
                <GlassCard depth="medium" className="p-0 overflow-hidden group cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <Link
                        to="#"
                        className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        Batafsil o‘qish
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </ParallaxSection>
            ))}
          </div>
        </ParallaxSection>
      </div>
    </div>
  );
}
