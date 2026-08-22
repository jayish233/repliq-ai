import Image from 'next/image';

interface RepliqLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function RepliqLogo({ size = 32, className = '', priority = false }: RepliqLogoProps) {
  return (
    <Image
      src="/repliq-logo.png"
      alt="Repliq"
      width={size}
      height={size}
      priority={priority}
      className={`shrink-0 object-contain ${className}`.trim()}
    />
  );
}
