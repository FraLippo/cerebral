
import React, { Component } from 'react';

export default class Ad extends Component {
  componentDidMount() {
    const element = this.adRef;

    if (!element || element.dataset.adsInitialized === 'true') {
      return;
    }

    // Ne pas réinitialiser un emplacement déjà rempli par AdSense.
    if (element.dataset.adsbygoogleStatus === 'done') {
      element.dataset.adsInitialized = 'true';
      return;
    }

    try {
      if (window.adsbygoogle) {
        element.dataset.adsInitialized = 'true';
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // Autoriser une nouvelle tentative si l'initialisation a échoué.
      delete element.dataset.adsInitialized;
      console.error("Erreur lors de l'exécution du script AdSense:", e);
    }
  }

  render() {
    const adStyle = {
      display: 'block',
      width: '100%',
      maxWidth: '728px',
      margin: '20px auto',
    };

    return (
      <div className="espaceHautBas">
        <ins
          ref={(element) => { this.adRef = element; }}
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