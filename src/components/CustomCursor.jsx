import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);

  useEffect(() => {
    const dot = cursorDot.current;
    const outline = cursorOutline.current;

    const onMouseMove = (e) => {
      // Instantly move the dot
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0, opacity: 1 });
      // Smoothly follow with the outline
      gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.15, opacity: 1 });
    };

    const onMouseHover = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.hover-target')
      ) {
        gsap.to(outline, { scale: 1.5, backgroundColor: 'var(--accent-glow)', duration: 0.3 });
      } else {
        gsap.to(outline, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseHover);
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot"></div>
      <div ref={cursorOutline} className="cursor-outline"></div>
    </>
  );
};

export default CustomCursor;
