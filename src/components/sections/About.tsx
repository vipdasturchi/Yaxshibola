import { Code, Palette, Rocket, Users } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { ParallaxSection } from '../ParallaxSection';

export function About() {
  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Men haqimda
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Men telegram bot va web saytlar ishlab chiquvchi, dasturlashni pul uchun emas qiziqqanim uchun tanlagan dasturchiman
            </p>
          </div>
        </ParallaxSection>

        <ParallaxSection speed={0.8}>
          <GlassCard depth="high" className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Mening hikoyam
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Men 2022 yilda (15 yoshimda) dasturlashga qiziqishni boshlaganman, telefonda youtubedan telegram bot yasash
                    youtubeda kanal yuritish shunga uxshash mavzularga qiziqib ko'p videolar korardim.
                  </p>
                  <p>
                    2023 yilda telegramda Najot ta'lim o'quv markazi konkurs qilgan va konkursda Foundation kursini yutib olganman va o'rganib
                    chiqqanman, ana shundan keyin dasturlashga bo'lgan qiziqishim kuchayib ketgan.
                  </p>
                  <p>
                    2024-2025 yillarda xar xil o'quv markazlarga borib dasturlash va inglis tilini o'rgandim, o'zimda qiziqishim kuchli bo'lgani
                    sabab ko'plab loyihalar qildim, hozirda meni o'zim va juda ko'pchilik Dasturchi sifatida biladi.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Men nima qila olaman? 
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Telegram bot
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Xar xil companylar uchun mukammal telegram bot yasay olaman.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        UI/UX Dizayn
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                       Brendingiz uchun mukammal dizayn qilib bera olaman
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Frontend va Backend 
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Mukammal darajada saytni Frontent va Backend qismini dasturlay olaman.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ParallaxSection>

        {/* Values */}
        <ParallaxSection speed={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                title: 'Codni tozalash',
                description: 'Coddagi xatolarni tuzatish',
              },
              {
                icon: Palette,
                title: 'Yaxshi Dizayn',
                description: 'Brendingizni xar bi pixeliga mehr berish',
              },
              {
                icon: Users,
                title: 'Jamoa bilan ishlash',
                description: 'Dasturchilar jamoasi bilan ishlash',
              },
              {
                icon: Rocket,
                title: 'Idea yaratish',
                description: 'Xar doim creative idealar yaratish',
              },
            ].map((value, index) => (
              <GlassCard key={index} depth="medium">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </ParallaxSection>
      </div>
    </div>
  );
}