import React from 'react';
import CustomCursor from './components/CustomCursor';
import BrutalGallery from './components/BrutalGallery';

function App() {
  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <CustomCursor />
      <BrutalGallery />
    </div>
  );
}

export default App;
