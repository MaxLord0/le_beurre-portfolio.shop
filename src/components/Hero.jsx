import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial State
    gsap.set([line1Ref.current, line2Ref.current, subRef.current], {
      y: 100,
      opacity: 0,
    });

    // Animation
    tl.to([line1Ref.current, line2Ref.current], {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.2
    })
    .to(subRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

    // Scroll Parallax out
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 150,
      opacity: 0,
      scale: 0.9,
      ease: "none"
    });
  }, []);

  const handleMouseMove = (e) => {
    if(!contentRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 15;
    const yPos = (clientY / innerHeight - 0.5) * -15;
    
    gsap.to(contentRef.current, {
      rotateX: yPos,
      rotateY: xPos,
      duration: 1.5,
      ease: "power3.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if(!contentRef.current) return;
    gsap.to(contentRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.5,
      ease: "power3.out"
    });
  };

  return (
    <section 
      ref={heroRef} 
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-content" ref={contentRef}>
        <div className="title-wrapper">
          <h1 ref={line1Ref} className="hero-title">NEXT-GEN</h1>
        </div>
        <div className="title-wrapper">
          <h1 ref={line2Ref} className="hero-title text-accent">MINECRAFT</h1>
        </div>
        
        <p ref={subRef} className="hero-subtitle">
          Premium visual experiences tailored for high-tier creators. <br/>
          Maximum CTR, breathtaking visuals, and absolute professionalism.
        </p>

        <div className="hero-actions hover-target">
          <a href="#work" className="circle-btn hover-target">
            <ArrowDownRight size={32} />
          </a>
          <span className="scroll-indicator">SCROLL TO EXPLORE</span>
        </div>
      </div>
      
      {/* Background Mesh */}
      <div className="hero-bg-mesh"></div>
    </section>
  );
};

export default Hero;
