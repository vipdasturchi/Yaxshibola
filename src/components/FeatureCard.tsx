import { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  gradient = 'from-blue-500 to-purple-600'
}: FeatureCardProps) {
  return (
    <GlassCard depth="medium" className="group cursor-pointer">
      <div className="flex flex-col items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </GlassCard>
  );
}
