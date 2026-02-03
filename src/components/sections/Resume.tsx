import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { GlassButton } from '../GlassButton';
import { ParallaxSection } from '../ParallaxSection';
import { ProgressBar } from '../ProgressBar';

export function Resume() {
  const skills = [
    { name: 'React & Next.js', level: 95, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 90, color: 'bg-gradient-to-r from-blue-600 to-blue-400' },
    { name: 'Tailwind CSS', level: 92, color: 'bg-gradient-to-r from-cyan-500 to-teal-500' },
    { name: 'Node.js & Express', level: 85, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { name: 'UI/UX Design', level: 88, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Git & GitHub', level: 93, color: 'bg-gradient-to-r from-gray-700 to-gray-500' },
  ];

  const experience = [
  {
    title: 'Senior Frontend Dasturchi',
    company: 'Tech Innovations Inc.',
    period: '2025 – Hozirgacha',
    description: 'Yirik loyihalar uchun frontend tizimlarni ishlab chiqaman. Junior dasturchilarga mentorlik qilaman va kodlash standartlarini joriy qilaman.',
    achievements: [
      'Kengaytiriladigan komponentlar kutubxonasini yaratdim',
      'Sayt tezligini 40% ga oshirdim',
      '5 kishilik dasturchilar jamoasiga yetakchilik qildim'
    ],
  },
  {
    title: 'Frontend Dasturchi',
    company: 'Digital Solutions Ltd.',
    period: '2024 – 2025',
    description: 'React va zamonaviy JavaScript texnologiyalari orqali moslashuvchan (responsive) web ilovalar yaratdim.',
    achievements: [
      '100+ ta mijoz loyihalarini ishga tushirdim',
      'CI/CD avtomatlashtirilgan tizimini joriy qildim',
      'Xatoliklar sonini 60% ga kamaytirdim'
    ],
  },
  {
    title: 'Junior Web Dasturchi',
    company: 'StartUp Studio',
    period: '2025 - dan hozirgacha',
    description: 'Turli veb-loyihalarda ishladim, asosan frontend qismiga e’tibor qaratdim.',
    achievements: [
      'React va TypeScriptni mukammal o‘rgandim',
      '150+ ta loyihada qatnashdim',
      'Kod yozish sifatini sezilarli yaxshiladim'
    ],
  },
];

const education = [
  {
    degree: 'Foundationdan boshlab pro darajagacha',
    institution: 'Algrotim IT oquv markazida',
    period: '2023 – 2025',
    description: 'A’lo baholar bilan bitirdim. Web dasturlash va dasturiy ta’minot muhandisligiga ixtisoslashganman.',
  },
  {
    degree: 'Kompyuter injinering',
    institution: 'Namangan Davlat Texnika Universitetida',
    period: '2025-boshlab',
    description: 'Universitetda dasturlashni C++ dan boshlab organishni boshladim',
  },
];


  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Resume
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6 lg:mb-8">
              Mening hikoyam va mening tajribamni ko'ring
            </p>
            <GlassButton variant="primary" size="lg">
              <Download className="w-5 h-5 mr-2 inline" />
              Yuklab olish CV
            </GlassButton>
          </div>
        </ParallaxSection>

        {/* Skills Section */}
        <ParallaxSection speed={0.8}>
          <GlassCard depth="high" className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Mening tajribam
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {skills.map((skill, index) => (
                <ProgressBar
                  key={skill.name}
                  skill={skill.name}
                  percentage={skill.level}
                  color={skill.color}
                  delay={index * 100}
                />
              ))}
            </div>
          </GlassCard>
        </ParallaxSection>

        {/* Experience Section */}
       <ParallaxSection speed={0.6}>
  <GlassCard depth="high" className="mb-12">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
        <Briefcase className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Ish tajribasi
      </h2>
    </div>
    <div className="space-y-8">
      {experience.map((job, index) => (
        <div key={index} className="relative pl-8 border-l-2 border-purple-500/30 dark:border-purple-400/30">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          <div className="mb-2">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-2 items-center text-purple-600 dark:text-purple-400 mt-1">
              <span className="font-medium">{job.company}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">{job.period}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {job.description}
          </p>
          <ul className="space-y-2">
            {job.achievements.map((achievement, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-400 flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2">▸</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </GlassCard>
</ParallaxSection>

{/* Ta'lim bo‘limi */}
<ParallaxSection speed={0.4}>
  <GlassCard depth="high">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
        <GraduationCap className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Ta'lim
      </h2>
    </div>
    <div className="space-y-8">
      {education.map((edu, index) => (
        <div key={index} className="relative pl-8 border-l-2 border-purple-500/30 dark:border-purple-400/30">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
          <div className="mb-2">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {edu.degree}
            </h3>
            <div className="flex flex-wrap gap-2 items-center text-orange-600 dark:text-orange-400 mt-1">
              <span className="font-medium">{edu.institution}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">{edu.period}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {edu.description}
          </p>
        </div>
      ))}
    </div>
  </GlassCard>
</ParallaxSection>

      </div>
    </div>
  );
}