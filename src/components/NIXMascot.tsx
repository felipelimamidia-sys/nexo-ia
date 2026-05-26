import { motion } from 'framer-motion';

interface NIXMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  variant?: 'badge' | 'simple';
}

export function NIXMascot({ className = '', size = 'md', animated = true, variant = 'badge' }: NIXMascotProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  return (
    <motion.img
      src="/Design_sem_nome_(24).png"
      alt="NEXO Academy Logo"
      className={`${sizes[size]} ${className} object-contain`}
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1, y: variant === 'badge' ? [0, -4, 0] : 0 } : {}}
      transition={animated ? {
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
        y: variant === 'badge' ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : {}
      } : {}}
    />
  );
}
