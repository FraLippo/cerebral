import React  from 'react';
import { Link } from 'react-router-dom';
import '../../style/jeux.css';

function LienMenuPrincipal()
{
    return <div className="centre"><Link reloadDocument className="lienFinal" to={"/"}>{"Les autres jeux"}</Link></div>
}

export {LienMenuPrincipal};