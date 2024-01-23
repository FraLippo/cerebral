import React, { useState, useEffect, useRef } from 'react';

const Saisie = (props) => {
  const [contenu, setContenu] = useState('');
  const grandeZoneRef = useRef(null);
  const handleChange = (e) => {

    e.preventDefault();


    if (!isNaN(e.target.value)) {
      setContenu(e.target.value);

      props.clicSaisie(e.target.value.replace(/\s/g, ''));
    }
   
  };

  useEffect(() => {
   
    grandeZoneRef.current.focus();
  }, []);



  return (
    <div>
      <div htmlFor="grande-zone-saisie">Saisir le nombre</div>
      <input
       autoComplete="off" autoCorrect="off" autoCapitalize="off" 
       spellCheck="false"
      type='text'
        ref={grandeZoneRef}
        id="grande-zone-saisie"

        onChange={handleChange}
        value={contenu}
        
      />
   </div>
  )

};

export default Saisie;