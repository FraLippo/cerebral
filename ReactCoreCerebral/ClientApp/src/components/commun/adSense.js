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
    // 2. Le style doit être un objet JS
    const adStyle = {
      display: 'block'
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