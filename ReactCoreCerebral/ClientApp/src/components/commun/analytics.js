import ReactGA from 'react-ga';
import ReactGA4 from "react-ga4";
 function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function analytics()
{
    let cookie = getCookie("cookieConsent");
    if (cookie === "YES") {
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA4.send(window.location.pathname + window.location.search);

    }
}

export {analytics}