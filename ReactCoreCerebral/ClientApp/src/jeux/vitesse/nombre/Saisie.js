import React, { useState, useEffect, useRef } from 'react';

const Saisie = (props) => {
  const [contenu, setContenu] = useState('');
  const containerRef = useRef(null);
  const maxLength = props.maxLength || 0;

  const updateValue = (value) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(0, maxLength);
    setContenu(sanitized);
    props.clicSaisie(sanitized);
  };

  const handleDigitClick = (digit) => {
    updateValue(contenu + digit);
  };

  const handleBackspace = () => {
    updateValue(contenu.slice(0, -1));
  };

  const handleClear = () => {
    updateValue('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/[0-9]/.test(e.key)) {
        e.preventDefault();
        handleDigitClick(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Delete' || (e.ctrlKey && e.key === 'a')) {
        e.preventDefault();
        handleClear();
      }
    };

    containerRef.current?.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contenu, maxLength]);

  return (
    <div className="saisieNombre" ref={containerRef} tabIndex={0}>
      <div>Saisir le nombre</div>
      <div 
        className="affichageSaisie"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
    
          minHeight: '40px',
              minWidth: '300px',
          border: '3px solid #6b0ce8',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          letterSpacing: '8px',
          color: '#6b0ce8',
          boxShadow: '0 4px 12px rgba(107, 12, 232, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}
      >
        {contenu}
      </div>
      <div className="clavierNombre">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button key={digit} type="button" className="clavierNombreBouton" onClick={() => handleDigitClick(digit)}>{digit}</button>
        ))}
        <button type="button" className="clavierNombreBouton clavierNombreAction" onClick={handleBackspace}>←</button>
        <button type="button" className="clavierNombreBouton" onClick={() => handleDigitClick('0')}>0</button>
        <button type="button" className="clavierNombreBouton clavierNombreAction" onClick={handleClear}>C</button>
      </div>
    </div>
  )
};

export default Saisie;