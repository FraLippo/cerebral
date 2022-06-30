import React from 'react';
import '../../style/jeux.css';
  function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
export default class Ad extends React.Component {

  componentDidMount () {
    let cookie = getCookie("cookieConsent");
        if (cookie == null || cookie === "NO") {
            (window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
        }
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='espaceHaut'>
        <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-0014588513895125"
         data-ad-slot="8268837119"
         data-ad-format="auto"></ins>
      </div>
    );
  }
}

