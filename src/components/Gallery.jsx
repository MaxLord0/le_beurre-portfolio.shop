import React, { useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import './Gallery.css';

const PREVIEW_IMAGES = [
  { src: "https://le-beurre.villagersyt.site/portfolio/Joel%20-%20horror.png", title: "Survival Horror", subtitle: "Cinematic Elements" },
  { src: "https://le-beurre.villagersyt.site/portfolio/dream_saying.png", title: "Lore / Commentary", subtitle: "Character Depth" },
  { src: "https://le-beurre.villagersyt.site/portfolio/mace_thumbnail.png", title: "Combat Highlight", subtitle: "Dynamic Lighting" },
  { src: "https://le-beurre.villagersyt.site/portfolio/cpvp_montage_thumbnail.png", title: "CPVP Action", subtitle: "High Impact" },
  { src: "https://le-beurre.villagersyt.site/portfolio/osh.png", title: "Creative Story", subtitle: "Vibrant Composition" },
  { src: "https://le-beurre.villagersyt.site/portfolio/AyyLamar%20-%20I%20Mastered%20Hacks%20in%20Minecraft%20(v2).png", title: "Viral Bait", subtitle: "High Contrast" }
];

const Gallery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.gallery-item');
    
    gsap.fromTo(items, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="work" className="gallery-section" ref={containerRef}>
      <div className="gallery-header">
        <h2 className="gallery-title">SELECT WORKS</h2>
        <p className="gallery-subtitle">A collection of premium visuals designed to dominate the algorithm.</p>
      </div>

      <div className="gallery-grid">
        {PREVIEW_IMAGES.map((img, idx) => (
          <Tilt 
            key={idx} 
            className="gallery-item hover-target"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            scale={1.02}
            transitionSpeed={1000}
            glareEnable={true}
            glareMaxOpacity={0.15}
            glarePosition="all"
          >
            <div className="image-wrapper glass-panel">
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="hover-overlay">
                <span className="view-text">VIEW PROJECT</span>
              </div>
            </div>
            <div className="item-details">
              <h3>{img.title}</h3>
              <p>{img.subtitle}</p>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
