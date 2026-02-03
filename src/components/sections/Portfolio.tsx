'use client';

import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { ParallaxSection } from '../ParallaxSection';

export function Portfolio() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Xisoblovchi Bot',
      category: 'web',
      description: 'Xisoblovchi bot Telegram Guruhlar uchun.',
      image: '',
      technologies: ['PHP', 'MSQL'],
      liveUrl: 'https://t.me/xisoblovchigrbot',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Prava Tezkor ilovasi',
      category: 'mobile',
      description: 'Prava imtixoni uchun testlar',
      image: '',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Anonim Savollar 💭',
      category: 'web',
      description: 'Telegramda anonim suxbatlashish uchun Bot',
      image: 'h',
      technologies: ['MSQL', 'PHP'],
      liveUrl: 'https://t.me/questianonibot',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'Smart Konst Bot',
      category: 'web',
      description: 'Telegramda bot yaratish uchun bot',
      image: '',
      technologies: ['PHP', 'MSQL', 'Javascript'],
      liveUrl: 'https://t.me/Smarkonstbot',
      githubUrl: '#',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: 'design',
      description: 'Mening portfolio web-saytim',
      image: '',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      liveUrl: 'https://yaxshibola.uz',
      githubUrl: '#',
    },
    {
      id: 6,
      title: 'Dilnoza Ovoz Bot',
      category: 'web',
      description: 'Matnningizni uzbek tilida real ovozda qilib beradi',
      image: '',
      technologies: ['PHP', 'MSQL'],
      liveUrl: 'https://t.me/DilnozaOvozBot',
      githubUrl: '#',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'Design' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A collection of my recent work and projects
            </p>
          </div>
        </ParallaxSection>

        {/* Filter Buttons */}
        <ParallaxSection speed={0.8}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === cat.id
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'glass-card hover:scale-105 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ParallaxSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ParallaxSection key={project.id} speed={0.3 + (index % 3) * 0.1}>
              <GlassCard depth="medium" className="p-0 overflow-hidden group cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-4 pb-4">
                    <a
                      href={project.liveUrl}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </div>
  );
}