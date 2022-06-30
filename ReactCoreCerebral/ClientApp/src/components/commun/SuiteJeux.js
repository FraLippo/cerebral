import React  from 'react';
import { Link } from 'react-router-dom';
import '../../style/jeux.css';
import intl from 'react-intl-universal';

function LienMenuPrincipal()
{
    return <div className="centre"><Link className="lienFinal" to={intl.get('LIEN_HOME')}>{intl.get('AUTRE_JEU')}</Link></div>
}

export {LienMenuPrincipal};