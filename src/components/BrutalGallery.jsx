import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import './BrutalGallery.css';
import ShopSection from './ShopSection';

const PREVIEW_IMAGES = [
  { src: "https://le-beurre.villagersyt.site/portfolio/Joel%20-%20horror.png", title: "Survival Horror", description: "Cinematic Elements" },
  { src: "https://le-beurre.villagersyt.site/portfolio/dream_saying.png", title: "Lore / Commentary", description: "Character Depth" },
  { src: "https://le-beurre.villagersyt.site/portfolio/mace_thumbnail.png", title: "Combat Highlight", description: "Dynamic Lighting" },
  { src: "https://le-beurre.villagersyt.site/portfolio/cpvp_montage_thumbnail.png", title: "CPVP Action", description: "High Impact" },
  { src: "https://le-beurre.villagersyt.site/portfolio/osh.png", title: "Creative Story", description: "Vibrant Composition" }
];

const CONFIG = {
  itemCount: 7, // 2 Texts, 5 Cards
  starCount: 150,
  zGap: 1200, // Increased gap for pacing
  camSpeed: 2.5
};
const TEXTS = ["LE_BEURRE", "HYPER DESIGN", "TERMINAL_LINK"];

const BrutalGallery = () => {
  const worldRef = useRef(null);
  const viewportRef = useRef(null);
  const velReadoutRef = useRef(null);
  const fpsRef = useRef(null);
  const coordRef = useRef(null);
  const proxyRef = useRef(null);
  const shopOverlayRef = useRef(null);
  const itemsStateRef = useRef([]);

  const [items, setItems] = useState([]);
  const [stars, setStars] = useState([]);

  // Generate Items
  useEffect(() => {
    const newItems = [];
    let imgIndex = 0;
    
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const isHeading = i === 1 || i === 4;
      if (isHeading) {
        newItems.push({
          type: 'text',
          id: i,
          text: TEXTS[i === 1 ? 0 : 1],
          x: 0, 
          y: 0, 
          rot: 0,
          baseZ: -i * CONFIG.zGap
        });
      } else {
        const randId = Math.floor(Math.random() * 9999);
        const imgObj = PREVIEW_IMAGES[imgIndex % PREVIEW_IMAGES.length];
        
        const angle = (i / CONFIG.itemCount) * Math.PI * 4;
        const x = Math.cos(angle) * (window.innerWidth * 0.25);
        const y = Math.sin(angle) * (window.innerHeight * 0.25);
        const rot = (Math.random() - 0.5) * 20;

        newItems.push({
          type: 'card',
          id: i,
          randId,
          imgObj,
          num: imgIndex < 9 ? `0${imgIndex + 1}` : String(imgIndex + 1),
          grid: `${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}`,
          dataSize: `${(Math.random() * 100).toFixed(1)}MB`,
          x, 
          y, 
          rot,
          baseZ: -i * CONFIG.zGap
        });
        imgIndex++;
      }
    }
    
    const newStars = [];
    for (let i = 0; i < CONFIG.starCount; i++) {
      newStars.push({
        id: `star-${i}`,
        type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * (CONFIG.itemCount * CONFIG.zGap)
      });
    }

    setItems(newItems);
    setStars(newStars);
  }, []);

  // Animation Loop
  useEffect(() => {
    if (!items.length || !document.querySelector('.brutal-mode')) return;

    document.body.style.overflow = "auto";
    
    // Set Proxy Height statically mapped to the Z-index space
    const maxScroll = (CONFIG.itemCount * CONFIG.zGap) / CONFIG.camSpeed;
    if (proxyRef.current) {
      proxyRef.current.style.height = `${maxScroll + window.innerHeight + 1000}px`;
    }

    const state = {
      scroll: 0,
      velocity: 0,
      targetSpeed: 0,
      mouseX: 0,
      mouseY: 0
    };

    const handleMouseMove = (e) => {
      state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: true
    });

    lenis.on('scroll', ({ scroll, velocity }) => {
      state.scroll = scroll;
      state.targetSpeed = velocity || 0;
    });

    let rafId;
    let lastTime = 0;

    const domItems = worldRef.current.querySelectorAll('.brutal-item, .star');
    const combinedLogicNodes = [...items, ...stars];

    function raf(time) {
      lenis.raf(time);
      
      const delta = time - lastTime;
      lastTime = time;
      if (time % 10 < 1 && fpsRef.current) {
         fpsRef.current.innerText = Math.round(1000 / delta);
      }

      state.velocity += (state.targetSpeed - state.velocity) * 0.1;

      if (velReadoutRef.current) velReadoutRef.current.innerText = Math.abs(state.velocity).toFixed(2);
      if (coordRef.current) coordRef.current.innerText = `${state.scroll.toFixed(0)}`;

      // Engine Effects
      const shake = state.velocity * 0.1;
      const tiltX = state.mouseY * 5 - state.velocity * 0.3;
      const tiltY = state.mouseX * 5;

      if (worldRef.current) {
        worldRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      const baseFov = 1000;
      const fov = baseFov - Math.min(Math.abs(state.velocity) * 10, 600);
      if (viewportRef.current) {
        viewportRef.current.style.perspective = `${fov}px`;
      }

      const cameraZ = state.scroll * CONFIG.camSpeed;

      // Render Loop
      domItems.forEach((el, index) => {
        const itemInfo = combinedLogicNodes[index];
        if (!itemInfo) return;

        let vizZ = itemInfo.baseZ + cameraZ; // Linear motion, NO infinite wrapping!

        let alpha = 1;
        if (vizZ < -4000) alpha = 0;
        else if (vizZ < -2000) alpha = (vizZ + 4000) / 2000;
        
        if (vizZ > 100 && itemInfo.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);
        if (alpha < 0) alpha = 0;
        
        // Hide completely if out of view for performance
        if (alpha <= 0.05) {
            el.style.opacity = 0;
            el.style.display = 'none';
        } else {
            el.style.display = 'flex';
            el.style.opacity = alpha;
        }

        if (alpha > 0) {
          let trans = `translate3d(${itemInfo.x}px, ${itemInfo.y}px, ${vizZ}px)`;

          if (itemInfo.type === 'star') {
            const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.1, 10));
            trans += ` scale3d(1, 1, ${stretch})`;
          } else if (itemInfo.type === 'text') {
            trans += ` rotateZ(${itemInfo.rot}deg)`;
            if (Math.abs(state.velocity) > 1) {
              const offset = state.velocity * 2;
              el.style.textShadow = `${offset}px 0 var(--accent), ${-offset}px 0 var(--accent-2)`;
            } else {
              el.style.textShadow = 'none';
            }
          } else {
            const t = time * 0.001;
            const float = Math.sin(t + itemInfo.x) * 5;
            trans += ` rotateZ(${itemInfo.rot}deg) rotateY(${float}deg)`;
          }

          el.style.transform = trans;
        }
      });

      // Shop Overlay Fade Logic
      if (shopOverlayRef.current) {
        const threshold = maxScroll - 500; 
        if (state.scroll > threshold) {
           const shopAlpha = Math.min(1, (state.scroll - threshold) / 500);
           shopOverlayRef.current.style.opacity = shopAlpha;
           shopOverlayRef.current.style.pointerEvents = shopAlpha > 0.5 ? 'auto' : 'none';
        } else {
           shopOverlayRef.current.style.opacity = 0;
           shopOverlayRef.current.style.pointerEvents = 'none';
        }
      }

      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = "hidden";
    };
  }, [items, stars]);

  return (
    <div className="brutal-mode">
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <div className="noise"></div>

      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 150,
        pointerEvents: 'none'
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '4px', pointerEvents: 'auto' }}>
          LE_BEURRE
        </div>
      </nav>

      <div className="hud">
          <div className="hud-top" style={{ marginTop: '60px' }}>
              <span>SYS.READY</span>
              <div className="hud-line"></div>
              <span>FPS: <strong ref={fpsRef}>60</strong></span>
          </div>
          <div className="center-nav"
              style={{ alignSelf: 'flex-start', marginTop: 'auto', marginBottom: 'auto', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              SCROLL VEL // <strong ref={velReadoutRef}>0.00</strong>
          </div>
          <div className="hud-bottom">
              <span>COORD: <strong ref={coordRef}>000</strong></span>
              <div className="hud-line"></div>
              <span>VER 3.0.0 [SHOP_ACTIVE]</span>
          </div>
      </div>

      <div className="viewport" ref={viewportRef}>
        <div className="world" ref={worldRef}>
          {items.map((item, idx) => {
            if (item.type === 'text') {
              return (
                <div key={idx} className="brutal-item">
                  <div className="big-text">{item.text}</div>
                </div>
              )
            } else {
              return (
                <div key={idx} className="brutal-item">
                  <div className="brutal-card">
                    <div className="card-img-wrapper">
                      <img src={item.imgObj.src} alt={item.imgObj.title} />
                    </div>
                    <div className="card-header">
                        <span className="card-id">ID-{item.randId}</span>
                        <div style={{ width: '10px', height: '10px', background: 'var(--accent)' }}></div>
                    </div>
                    <h2>{item.imgObj.title}</h2>
                    <div className="card-footer">
                        <span>GRID: {item.grid}</span>
                        <span>DATA: {item.dataSize}</span>
                    </div>
                    <div style={{ position:'absolute', bottom:'2rem', right:'2rem', fontSize:'4rem', opacity:0.1, fontWeight:900, zIndex: 2 }}>{item.num}</div>
                  </div>
                </div>
              )
            }
          })}
          {stars.map((star, idx) => (
            <div key={`star-${idx}`} className="star"></div>
          ))}
        </div>
      </div>

      {/* Shop Terminal Overlay */}
      <div ref={shopOverlayRef} style={{ opacity: 0, pointerEvents: 'none' }} className="fixed inset-0 z-[120]">
         <ShopSection opacity={1} pointerEvents="auto" />
      </div>

      <div className="scroll-proxy" ref={proxyRef}></div>
    </div>
  );
};

export default BrutalGallery;
