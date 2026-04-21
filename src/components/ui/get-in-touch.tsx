"use client"

import React, { useState, useEffect } from 'react';

export const ProfessionalConnect = () => {
  const [, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Adjusted mouse position calculation to account for the parent container if necessary
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialPlatforms = [
    {
      name: 'Behance',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-5.06-5.441c-1.714 0-1.81 1.059-1.81 2.22h3.69c-.067-1.127-.156-2.22-1.88-2.22zM0 12c0 2.518.065 4.314.195 5.385.228 1.887 1.493 2.615 3.385 2.615 2.873 0 4.223-1.049 4.887-2.735.635-1.614.654-3.528.654-5.265v-6.914h-3.834v6.864c0 1.252-.016 2.052-.047 2.399-.082.914-.852 1.109-1.572 1.109-1.229 0-1.849-.245-1.849-1.921v-8.451H0v6.914z"/>
        </svg>
      ),
      gradient: 'from-[#ff7300] to-orange-500',
      shadowColor: 'rgba(255, 115, 0, 0.5)',
      link: '#',
      description: 'Portfolio'
    },
    {
      name: 'Discord',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      gradient: 'from-white to-gray-200',
      shadowColor: 'rgba(255, 255, 255, 0.4)',
      link: '#',
      description: 'Direct Comms'
    },
    {
      name: 'X.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      gradient: 'from-gray-700 to-gray-500',
      shadowColor: 'rgba(255, 115, 0, 0.3)',
      link: '#',
      description: 'Network'
    }
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden py-4 font-mono">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        {/* Header Section */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 px-6 py-2 bg-[#ff7300]/10 rounded-full border border-[#ff7300]/20 shadow-[0_0_15px_rgba(255,115,0,0.2)]">
            <span className="text-sm font-bold text-[#ff7300] tracking-widest uppercase">
              TRANSMISSION LINK
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-widest font-[Syncopate] uppercase text-white">
            Get In Touch
          </h1>
          
          <p className="text-sm md:text-md text-white/50 max-w-xl mx-auto leading-relaxed">
            Establish a direct connection node via your preferred network protocol.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.link}
              className={`group relative flex-1 min-w-[250px] transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Container */}
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#ff7300]/50">
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${platform.shadowColor}, transparent 50%)`,
                    filter: 'blur(30px)'
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className={`mb-3 inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:border-[#ff7300] group-hover:text-[#ff7300] shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                    {platform.icon}
                  </div>
                  
                  {/* Text */}
                  <h3 className="text-white font-bold text-xl tracking-wider uppercase mb-1 transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-white/40 text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-[#ff7300]/80">
                    {platform.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ff7300]/10 border border-[#ff7300] text-[#ff7300] rounded-full font-black uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#ff7300] hover:border-white shadow-[0_0_20px_rgba(255,115,0,0.3)] hover:shadow-[0_0_30px_rgba(255,115,0,0.8)] text-sm">
            <span className="relative z-10">COPY EMAIL ADDRESS</span>
            {/* Button Shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        </div>
      </div>

      {/* Mouse Follow Light */}
      <div 
        className="pointer-events-none absolute w-64 h-64 rounded-full opacity-20 blur-[100px] transition-all duration-75 ease-linear"
        style={{
          background: 'radial-gradient(circle, rgba(255, 115, 0, 0.4), transparent)',
          left: mousePosition.x ? `${mousePosition.x - 128}px` : '50%',
          top: mousePosition.y ? `${mousePosition.y - 128}px` : '50%',
        }}
      />
    </div>
  );
};
