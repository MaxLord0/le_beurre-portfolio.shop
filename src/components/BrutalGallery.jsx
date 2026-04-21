import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import './BrutalGallery.css';

const PREVIEW_IMAGES = [
  { src: "https://le-beurre.villagersyt.site/portfolio/Joel%20-%20horror.png", title: "Survival Horror", description: "Cinematic Elements" },
  { src: "https://le-beurre.villagersyt.site/portfolio/dream_saying.png", title: "Lore / Commentary", description: "Character Depth" },
  { src: "https://le-beurre.villagersyt.site/portfolio/mace_thumbnail.png", title: "Combat Highlight", description: "Dynamic Lighting" },
  { src: "https://le-beurre.villagersyt.site/portfolio/cpvp_montage_thumbnail.png", title: "CPVP Action", description: "High Impact" },
  { src: "https://le-beurre.villagersyt.site/portfolio/osh.png", title: "Creative Story", description: "Vibrant Composition" },
  { src: "https://le-beurre.villagersyt.site/portfolio/AyyLamar%20-%20I%20Mastered%20Hacks%20in%20Minecraft%20(v2).png", title: "Viral Bait", description: "High Contrast" }
];

const CONFIG = {
  itemCount: 20,
  starCount: 150,
  zGap: 800,
  camSpeed: 2.5,
  loopSize: 20 * 800, // Calculated statically
  colors: ['#ff7300', '#6b21a8', '#ffffff']
};
const TEXTS = ["LE_BEURRE", "VELOCITY", "ELEVATED", "SYSTEM", "NEXT-GEN", "DESIGN", "BRUTAL", "HYPER", "ORBIT", "IMPACT"];

const BrutalGallery = () => {
  const worldRef = useRef(null);
  const viewportRef = useRef(null);
  const velReadoutRef = useRef(null);
  const fpsRef = useRef(null);
  const coordRef = useRef(null);
  const itemsStateRef = useRef([]);

  const [items, setItems] = useState([]);
  const [stars, setStars] = useState([]);

  // Generate Items
  useEffect(() => {
    const newItems = [];
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const isHeading = i % 4 === 0;
      if (isHeading) {
        newItems.push({
          type: 'text',
          id: i,
          text: TEXTS[i % TEXTS.length],
          x: 0, 
          y: 0, 
          rot: 0,
          baseZ: -i * CONFIG.zGap
        });
      } else {
        const randId = Math.floor(Math.random() * 9999);
        const imgObj = PREVIEW_IMAGES[((i - Math.floor(i / 4))) % PREVIEW_IMAGES.length];
        
        const angle = (i / CONFIG.itemCount) * Math.PI * 6;
        const x = Math.cos(angle) * (window.innerWidth * 0.3);
        const y = Math.sin(angle) * (window.innerHeight * 0.3);
        const rot = (Math.random() - 0.5) * 30;

        newItems.push({
          type: 'card',
          id: i,
          randId,
          imgObj,
          num: i < 10 ? `0${i}` : String(i),
          grid: `${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}`,
          dataSize: `${(Math.random() * 100).toFixed(1)}MB`,
          x, 
          y, 
          rot,
          baseZ: -i * CONFIG.zGap
        });
      }
    }
    
    const newStars = [];
    for (let i = 0; i < CONFIG.starCount; i++) {
      newStars.push({
        id: `star-${i}`,
        type: 'star',
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        baseZ: -Math.random() * CONFIG.loopSize
      });
    }

    setItems(newItems);
    setStars(newStars);
  }, []);

  // Animation Loop
  useEffect(() => {
    // We only mount Lenis once layout is ready. Also wait a microtask for rendering items.
    if (!items.length || !document.querySelector('.brutal-mode')) return;

    // Body overflow auto so Lenis has something to scroll (since we use a virtual box)
    document.body.style.overflow = "auto";
    // We make sure the wrapper container disables its own clipping, or lenis will be tied to body
    
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

      const shake = state.velocity * 0.2;
      const tiltX = state.mouseY * 5 - state.velocity * 0.5;
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
      const modC = CONFIG.loopSize;

      domItems.forEach((el, index) => {
        const itemInfo = combinedLogicNodes[index];
        if (!itemInfo) return;

        let relZ = itemInfo.baseZ + cameraZ;
        let vizZ = ((relZ % modC) + modC) % modC;
        if (vizZ > 500) vizZ -= modC; 

        let alpha = 1;
        if (vizZ < -3000) alpha = 0;
        else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
        
        if (vizZ > 100 && itemInfo.type !== 'star') alpha = 1 - ((vizZ - 100) / 400);
        if (alpha < 0) alpha = 0;
        
        el.style.opacity = alpha;

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
            const float = Math.sin(t + itemInfo.x) * 10;
            trans += ` rotateZ(${itemInfo.rot}deg) rotateY(${float}deg)`;
          }

          el.style.transform = trans;
        }
      });

      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = "hidden"; // restore for global rules
    };
  }, [items, stars]);

  return (
    <div className="brutal-mode">
      {/* Overlays */}
      <div className="scanlines"></div>
      <div className="vignette"></div>
      <div className="noise"></div>

      {/* HUD Navigation Layer (Replaces original App.jsx Nav but keeps same links inside Brutal Mode style) */}
      <nav style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        pointerEvents: 'none'
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '4px', pointerEvents: 'auto' }}>
          LE_BEURRE
        </div>
        <div style={{ display: 'flex', gap: '48px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', fontFamily: 'monospace', pointerEvents: 'auto' }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ borderBottom: '1px solid var(--accent)'}}>// WORKS</a>
          <a href="#" onClick={(e) => e.preventDefault()}>// CONTACT</a>
        </div>
      </nav>

      {/* HUD Info */}
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
              <div class="hud-line"></div>
              <span>VER 2.0.4 [BETA]</span>
          </div>
      </div>

      {/* 3D World */}
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

      <div className="scroll-proxy"></div>
    </div>
  );
};

export default BrutalGallery;
