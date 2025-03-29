import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Particle = styled('div')({
  position: 'absolute',
  width: '5px',
  height: '5px',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '50%',
  pointerEvents: 'none',
  '@keyframes float': {
    '0%': { transform: 'translateY(0)', opacity: 0.8 },
    '100%': { transform: 'translateY(-100vh)', opacity: 0 }
  }
});

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        animation: float ${Math.random() * 3 + 2}s linear forwards;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 5000);
    };

    const intervalId = setInterval(createParticle, 200);

    // Cleanup function to remove interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div style={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <h1 style={{ 
        color: 'white', 
        fontSize: '120px', 
        margin: 0,
        textShadow: '0 0 10px rgba(255,255,255,0.5)',
        zIndex: 1
      }}>404</h1>
      <p style={{ 
        color: 'white', 
        fontSize: '24px', 
        margin: '20px 0',
        zIndex: 1 
      }}>
        Oops! Trang bạn tìm không tồn tại.
      </p>
      <button 
        onClick={() => navigate('/Dashboard')}
        style={{
          padding: '12px 25px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'transform 0.3s, background-color 0.3s',
          zIndex: 1,
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: '#ff6666'
          }
        }}
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default NotFound;