
import React from 'react';
import Logo from './Logo';

interface SplashScreenProps {
  isExiting: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isExiting }) => {
  return (
    <div className={`fixed inset-0 z-[1000] splash-bg flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out font-['Poppins'] ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-1000">
        <Logo size={120} className="mb-8 rounded-[24px]" />
        
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-2 font-['Poppins']">
            Billdesk Pro
          </h1>
          <p className="text-sm font-bold text-primary-dark tracking-[0.4em] uppercase font-['Poppins']">
            Enterprise Finance Suite
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-16 flex space-x-3">
        <div className="w-2.5 h-2.5 bg-[#79ebff] rounded-full animate-bounce delay-75"></div>
        <div className="w-2.5 h-2.5 bg-[#79ebff] rounded-full animate-bounce delay-150"></div>
        <div className="w-2.5 h-2.5 bg-[#79ebff] rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
