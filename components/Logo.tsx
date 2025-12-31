
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden rounded-[20%] ${className}`}
      style={{ width: size, height: size, backgroundColor: '#79ebff' }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-[85%] h-[85%]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The Letter B */}
        <text 
          x="50%" 
          y="55%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fontSize="50" 
          fontWeight="900" 
          fill="white"
          fontFamily="Arial, sans-serif"
        >
          B
        </text>
        
        {/* The Smile Arrow */}
        <path 
          d="M25 65 Q 50 85 75 65" 
          stroke="#FACC15" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        <path 
          d="M70 62 L 78 65 L 72 73" 
          fill="#FACC15" 
          stroke="#FACC15" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

export default Logo;
