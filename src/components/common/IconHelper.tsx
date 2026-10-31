import React from 'react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  // Map common custom or string names to Lucide icons
  const iconMap: Record<string, LucideIcon> = {
    Bike: Icons.Bike,
    Train: Icons.Train,
    Footprints: Icons.Footprints,
    Car: Icons.Car,
    Salad: Icons.Salad,
    Utensils: Icons.Utensils,
    Apple: Icons.Apple,
    Coffee: Icons.Coffee,
    Sun: Icons.Sun,
    Shirt: Icons.Shirt,
    Thermometer: Icons.Thermometer,
    ZapOff: Icons.ZapOff,
    Zap: Icons.Zap,
    Sprout: Icons.Sprout,
    ShoppingBag: Icons.ShoppingBag,
    Repeat: Icons.Repeat,
    Sparkles: Icons.Sparkles,
    Droplets: Icons.Droplets,
    CloudRain: Icons.CloudRain,
    TreePine: Icons.TreePine,
    Trash2: Icons.Trash2,
    Award: Icons.Award,
    Flame: Icons.Flame,
    Crown: Icons.Crown,
    ShieldCheck: Icons.ShieldCheck,
    Target: Icons.Target,
    CloudSun: Icons.CloudSun,
    Leaf: Icons.Leaf,
    Globe: Icons.Globe,
    CheckCircle2: Icons.CheckCircle2,
    AlertCircle: Icons.AlertCircle,
    TrendingUp: Icons.TrendingUp,
    Users: Icons.Users,
    Calendar: Icons.Calendar,
    BarChart3: Icons.BarChart3,
    Plus: Icons.Plus,
    X: Icons.X,
    Filter: Icons.Filter,
    Search: Icons.Search,
    ChevronRight: Icons.ChevronRight,
    ArrowUpRight: Icons.ArrowUpRight,
    Sliders: Icons.Sliders,
    Settings: Icons.Settings,
    Download: Icons.Download,
    Upload: Icons.Upload,
    RotateCcw: Icons.RotateCcw,
    Check: Icons.Check,
    Trophy: Icons.Trophy,
    Heart: Icons.Heart,
    Share2: Icons.Share2
  };

  const Component = iconMap[name] || Icons.Leaf;
  return <Component className={className} size={size} />;
};
