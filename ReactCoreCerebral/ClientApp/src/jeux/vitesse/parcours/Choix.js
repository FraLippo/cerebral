
import React from 'react';

export default function Choix(props)  {

        return <div className="afficheIcone">{props.tabChoix.map((nom,i) => <img id={i} key={i+100} className="choixMots" draggable="false"   src={'/images/mots/' + nom + '.png'}  alt={'proposition ' + nom}></img>)}</div>    
}