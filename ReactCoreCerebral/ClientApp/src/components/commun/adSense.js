import React from 'react';

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
export default class Ad extends React.Component {


constructor()
{
  super();
  this.ad = true;
  let cookie = getCookie("cookieConsent");
      if (cookie == null || cookie === "NO") {
         this.ad = false;
      }
}

render () {
  if (!this.ad) return <div></div>
    return (
      
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0014588513895125"
            crossorigin="anonymous"></script>
    );
  }
}