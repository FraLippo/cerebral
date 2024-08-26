
import React from "react";
import '../../../style/vitesse.css';
import coupe from '../../../images/coupe.png';

export default function Podium(props)
{
    return <div className="centrePodium"><div className="placePrenomPodium">{props.tabPrenoms.length > 2 && <div className="prenomPodium">{props.tabPrenoms[2].includes('@') ? props.tabPrenoms[2].split('@')[0].slice(0,10) : props.tabPrenoms[2].slice(0,10)}</div>}
    <div className="placePodium place3Podium">3</div></div><div className="placePrenomPodium">{props.tabPrenoms.length >= 1 &&<div  className="prenomPodium"><img src={coupe} alt="coupe"></img><div>{props.tabPrenoms[0].includes('@') ? props.tabPrenoms[0].split('@')[0].slice(0,10) : props.tabPrenoms[0].slice(0,10)}</div><div></div></div>}
    <div className="placePodium place1Podium">1</div></div><div className="placePrenomPodium">{props.tabPrenoms.length >= 2 &&<div  className="prenomPodium">{props.tabPrenoms[1].includes('@') ? props.tabPrenoms[1].split('@')[0].slice(0,10) : props.tabPrenoms[1].slice(0,10)}</div>}
    <div className="placePodium place2Podium">2</div></div></div>
}