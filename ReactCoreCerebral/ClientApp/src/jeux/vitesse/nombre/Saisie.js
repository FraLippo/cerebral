import React, { useState, useEffect, useRef } from 'react';

const Saisie = (props) => {
  const [contenu, setContenu] = useState('');
  const grandeZoneRef = useRef(null);
  const maxLength = props.maxLength || 0;

  const updateValue = (value) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(0, maxLength);
    setContenu(sanitized);
    props.clicSaisie(sanitized);
  };

  const handleChange = (e) => {
    e.preventDefault();
    updateValue(e.target.value);
  };

  const handleDigitClick = (digit) => {
    updateValue(contenu + digit);
    grandeZoneRef.current?.focus();
  };

  const handleBackspace = () => {
    updateValue(contenu.slice(0, -1));
    grandeZoneRef.current?.focus();
  };

  const handleClear = () => {
    updateValue('');
    grandeZoneRef.current?.focus();
  };

  useEffect(() => {
    grandeZoneRef.current?.focus();
  }, []);

  return (
    <div className="saisieNombre">
      <div>Saisir le nombre</div>
      <input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        inputMode="numeric"
        pattern="[0-9]*"
        type="text"
        maxLength={maxLength}
        ref={grandeZoneRef}
        id="grande-zone-saisie"
        onChange={handleChange}
        value={contenu}
      />
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