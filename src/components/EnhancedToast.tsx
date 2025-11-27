import { useEffect } from 'react';
import { CheckCircle2, XCircle, TrendingUp, Sparkles, Coins, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ToastType = 'success' | 'error' | 'levelup' | 'purchase' | 'stake' | 'claim';

interface EnhancedToastProps {
  type: ToastType;
  title: string;
  description: string;
}

const TOAST_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  levelup: TrendingUp,
  purchase: Package,
  stake: Coins,
  claim: Sparkles,
};

const TOAST_COLORS = {
  success: 'text-green-400 border-green-500/20 bg-green-500/10',
  error: 'text-red-400 border-red-500/20 bg-red-500/10',
  levelup: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10',
  purchase: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  stake: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
  claim: 'text-pink-400 border-pink-500/20 bg-pink-500/10',
};

export const useEnhancedToast = () => {
  const { toast } = useToast();

  const showEnhancedToast = (props: EnhancedToastProps) => {
    const Icon = TOAST_ICONS[props.type];
    const colorClass = TOAST_COLORS[props.type];

    toast({
      title: (
        <div className="flex items-center gap-2 animate-scale-in">
          <Icon className={`w-5 h-5 ${colorClass.split(' ')[0]}`} />
          <span className="font-orbitron font-bold">{props.title}</span>
        </div>
      ) as any,
      description: props.description,
      variant: props.type === 'error' ? 'destructive' : 'default',
      className: `${colorClass} border-2 backdrop-blur-sm animate-fade-in`,
    });
  };

  return { showEnhancedToast };
};
