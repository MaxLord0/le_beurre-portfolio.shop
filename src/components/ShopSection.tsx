import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as PricingCard from '@/components/ui/pricing-card';
import { CheckCircle2, Package, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ShopSectionProps {
  opacity: number;
  pointerEvents: 'none' | 'auto';
}

const ShopSection: React.FC<ShopSectionProps> = ({ opacity, pointerEvents }) => {
  const [activeTab, setActiveTab] = useState<'shop' | 'contact' | 'login'>('shop');

  const plans = [
    {
      name: 'Single',
      icon: ImageIcon,
      price: '$15',
      original: '$25',
      period: '/ thumbnail',
      features: ['1 Custom Thumbnail', '2 Revisions', 'High-Res Export', 'Delivery in 48h'],
      locked: ['Source PSD File', 'Priority Queue', 'Custom 3D Renders']
    },
    {
      name: 'Starter Pack',
      icon: Package,
      price: '$40',
      original: '$50',
      period: '/ 3 thumbnails',
      features: ['3 Custom Thumbnails', 'Unlimited Revisions', 'High-Res Export', 'Delivery in 3 days', 'Priority Queue'],
      locked: ['Source PSD File', 'Custom 3D Renders'],
      popular: true
    },
    {
      name: 'Pro Pack',
      icon: Sparkles,
      price: '$70',
      original: '$100',
      period: '/ 5 thumbnails',
      features: ['5 Custom Thumbnails', 'Unlimited Revisions', 'High-Res Export', 'Delivery in 5 days', 'Priority Queue', 'Source PSD File', 'Custom 3D Renders'],
      locked: []
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-700 ease-in-out font-sans overflow-y-auto"
      style={{ opacity, pointerEvents }}
    >
      {/* Background aesthetics */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="fixed -top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 rounded-full bg-[#ff7300]/10 blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <div className="flex gap-4 mb-10 z-10 mt-20">
        <Button variant={activeTab === 'shop' ? 'default' : 'outline'} className={activeTab === 'shop' ? 'bg-[#ff7300] hover:bg-[#ff7300]/90 text-white' : 'border-white/20 text-white hover:bg-white/10'} onClick={() => setActiveTab('shop')}>Buy Products</Button>
        <Button variant={activeTab === 'login' ? 'default' : 'outline'} className={activeTab === 'login' ? 'bg-[#ff7300] hover:bg-[#ff7300]/90 text-white' : 'border-white/20 text-white hover:bg-white/10'} onClick={() => setActiveTab('login')}>Client Portal</Button>
        <Button variant={activeTab === 'contact' ? 'default' : 'outline'} className={activeTab === 'contact' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-white/20 text-white hover:bg-white/10'} onClick={() => setActiveTab('contact')}>Contact Me</Button>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 pb-20 z-10 flex flex-col items-center">
        {activeTab === 'shop' && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white uppercase tracking-widest font-[Syncopate]">THE FORGE</h2>
              <p className="text-white/50 mt-2 font-mono">SECURE PAYMENTS VIA STRIPE, PAYPAL & CRYPTO</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch w-full">
              {plans.map((plan, i) => (
                <PricingCard.Card key={i} className={`flex-1 ${plan.popular ? 'border-[#ff7300] shadow-[0_0_30px_rgba(255,115,0,0.15)] ring-1 ring-[#ff7300]' : 'border-white/10'}`}>
                  <PricingCard.Header>
                    <PricingCard.Plan>
                      <PricingCard.PlanName>
                        <plan.icon aria-hidden="true" className={plan.popular ? "text-[#ff7300]" : "text-white/60"} />
                        <span>{plan.name}</span>
                      </PricingCard.PlanName>
                      {plan.popular && <PricingCard.Badge className="border-[#ff7300]/30 text-[#ff7300] bg-[#ff7300]/10">MOST POPULAR</PricingCard.Badge>}
                    </PricingCard.Plan>
                    <PricingCard.Price>
                      <PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
                      <PricingCard.Period>{plan.period}</PricingCard.Period>
                      <PricingCard.OriginalPrice className="ml-auto">{plan.original}</PricingCard.OriginalPrice>
                    </PricingCard.Price>
                    <Button
                      className={cn(
                        'w-full font-bold text-white uppercase tracking-wider',
                        plan.popular 
                          ? 'bg-gradient-to-b from-[#ff7300] to-[#cc5a00] shadow-[0_10px_25px_rgba(255,115,0,0.2)] hover:from-[#ff851f] hover:to-[#e66600]' 
                          : 'bg-white/10 hover:bg-white/20'
                      )}
                      onClick={() => alert(`Initiating checkout block for ${plan.name} via Stripe/PayPal/Crypto`)}
                    >
                      Purchase Node
                    </Button>
                  </PricingCard.Header>
                  <PricingCard.Body>
                    <PricingCard.List>
                      {plan.features.map((item, idx) => (
                        <PricingCard.ListItem key={idx}>
                          <span className="mt-0.5"><CheckCircle2 className="h-4 w-4 text-[#00ff88]" aria-hidden="true" /></span>
                          <span>{item}</span>
                        </PricingCard.ListItem>
                      ))}
                    </PricingCard.List>
                    
                    {plan.locked.length > 0 && (
                      <>
                        <PricingCard.Separator className="opacity-50">Locked</PricingCard.Separator>
                        <PricingCard.List>
                          {plan.locked.map((item, idx) => (
                            <PricingCard.ListItem key={idx} className="opacity-40">
                              <span className="mt-0.5"><CheckCircle2 className="text-white/20 h-4 w-4" aria-hidden="true" /></span>
                              <span>{item}</span>
                            </PricingCard.ListItem>
                          ))}
                        </PricingCard.List>
                      </>
                    )}
                  </PricingCard.Body>
                </PricingCard.Card>
              ))}
            </div>
            
            <div className="mt-12 flex gap-6 text-white/30 text-xs font-mono justify-center items-center">
               <span>PAYMENTS SUPPORTED:</span>
               <span className="flex gap-2 items-center text-white/50 border border-white/10 px-3 py-1 rounded bg-white/5">PAYPAL</span>
               <span className="flex gap-2 items-center text-white/50 border border-white/10 px-3 py-1 rounded bg-white/5">STRIPE</span>
               <span className="flex gap-2 items-center text-white/50 border border-white/10 px-3 py-1 rounded bg-white/5">CRYPTO (ETH/BTC)</span>
            </div>
          </>
        )}

        {activeTab === 'login' && (
          <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-md text-white mt-10 shadow-2xl">
            <h2 className="text-2xl font-bold font-[Syncopate] uppercase mb-2">Client Access</h2>
            <p className="text-sm text-white/50 mb-8 font-mono">Login or create an account to manage your orders.</p>
            <form className="space-y-4 font-mono" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs text-white/60 mb-1">EMAIL NODE</label>
                <input type="email" placeholder="jack@example.com" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#ff7300] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">SECURE KEY</label>
                <input type="password" placeholder="••••••••" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#ff7300] transition-colors" />
              </div>
              <Button className="w-full bg-[#6b21a8] hover:bg-[#832bc9] text-white py-6 shadow-[0_0_20px_rgba(107,33,168,0.4)]">INITIATE CONNECTION</Button>
              <div className="text-center pt-4 border-t border-white/10 mt-6">
                <span className="text-xs text-white/40">NO ACCOUNT? </span>
                <a href="#" className="text-xs text-[#00f3ff] hover:underline cursor-none">REGISTER NOW</a>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="w-full max-w-xl bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-md text-white mt-10 shadow-2xl">
            <h2 className="text-2xl font-bold font-[Syncopate] uppercase mb-2">Secure Comms</h2>
            <p className="text-sm text-white/50 mb-8 font-mono">Send me a direct signal for custom inquiries.</p>
            <form className="space-y-4 font-mono" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">CALLSIGN</label>
                  <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#ff7300]" />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">RETURN VECTOR</label>
                  <input type="email" placeholder="Your Email" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#ff7300]" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">TRANSMISSION LOG</label>
                <textarea rows={5} placeholder="Project Details..." className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#ff7300] resize-none"></textarea>
              </div>
              <Button className="w-full bg-white text-black hover:bg-gray-200 py-6 font-bold uppercase tracking-widest mt-4">SEND SIGNAL</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSection;
