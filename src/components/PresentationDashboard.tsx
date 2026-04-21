import React from 'react';
import { Sparkles } from "@/components/ui/sparkles";
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

// Custom Stylized Text Logos for Clients
const ClientLogo = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center font-[Syncopate] font-black text-2xl tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase h-full whitespace-nowrap px-8">
    {text}
  </div>
);

const logos = [
  { id: "dewier", component: () => <ClientLogo text="DEWIER" />, className: "w-auto" },
  { id: "langoo", component: () => <ClientLogo text="LANGOO" />, className: "w-auto" },
  { id: "qbedwars", component: () => <ClientLogo text="QBEDWARS" />, className: "w-auto" },
  { id: "hypixel", component: () => <ClientLogo text="HYPIXEL" />, className: "w-auto" },
  { id: "lunar", component: () => <ClientLogo text="LUNAR" />, className: "w-auto" },
];

export function PresentationDashboard() {
  return (
    <div className="w-full relative bg-transparent flex flex-col items-center justify-center pt-10 pb-8 rounded-t-3xl border-b border-white/10 mb-8 overflow-hidden z-10">
      
      {/* Top Header Section with Sparkles */}
      <div className="relative w-full h-[250px] flex flex-col items-center justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,#ff7300,transparent_50%)] before:opacity-20" />
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-10 blur-3xl bg-[#ff7300]" />
        
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full opacity-50"
          color="#ff7300"
          size={1.5}
        />
        
        <div className="relative z-20 text-center flex flex-col items-center">
           <div className="inline-block mb-4 px-6 py-2 bg-[#ff7300]/10 rounded-full border border-[#ff7300]/20 shadow-[0_0_15px_rgba(255,115,0,0.4)] backdrop-blur-md">
            <span className="text-sm font-bold text-[#ff7300] tracking-widest uppercase">
              MASTER FORGE ACTIVE
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest font-[Syncopate] uppercase text-white drop-shadow-[0_0_20px_rgba(255,115,0,0.5)]">
            LE BEURRE
          </h1>
          <p className="mt-4 text-sm md:text-md text-white/60 font-mono tracking-widest uppercase max-w-xl">
            PREMIUM FRENCH DESIGNER // MINECRAFT THUMBNAILS // HIGH CTR // CINEMATIC 3D RENDERS
          </p>
        </div>
      </div>

      {/* Infinite Client Slider */}
      <div className="w-full max-w-4xl mt-12 relative z-20">
        <div className="text-center text-xs text-white/30 font-mono uppercase tracking-widest mb-6">
          TRUSTED BY LEGENDARY NODES
        </div>

        <div className="relative h-[80px] w-full bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm overflow-hidden flex items-center">
          <InfiniteSlider 
            className='flex h-full w-full items-center' 
            duration={40}
            gap={48}
          >
            {logos.map(({ id, component: Logo, className }) => (
              <div key={id} className={className}>
                <Logo />
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[100px]'
            direction='left'
            blurIntensity={2}
          />
          <ProgressiveBlur
            className='pointer-events-none absolute top-0 right-0 h-full w-[100px]'
            direction='right'
            blurIntensity={2}
          />
        </div>
      </div>
    </div>
  );
}
