import React, { Component } from 'react';

export default class Ad extends Component {
  // 1. Déclenche l'exécution du script AdSense après le montage du composant
  componentDidMount() {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Erreur lors de l'exécution du script AdSense:", e);
    }
  }

  render() {
  
const adStyle = {
      display: 'block',
      
      // 1. Définir une largeur maximale pour que le centrage fonctionne
      width: '100%',         // Prend toute la largeur disponible du parent
      maxWidth: '728px',     // Limite la largeur sur les grands écrans (tablettes/desktop)
      
      // 2. Centrage horizontal simple
      margin: '20px auto',   // 20px de marge haut/bas, auto pour centrer gauche/droite
    };

    return (
      <div className="espaceHautBas">
        <ins
          className="adsbygoogle"
          style={adStyle} 
          data-ad-client="ca-pub-0014588513895125" 
          data-ad-slot="6880354109" 
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
     
      </div>
    );
  }
}