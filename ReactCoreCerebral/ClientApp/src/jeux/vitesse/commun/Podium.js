
import React from "react";
import '../../../style/vitesse.css';
import coupe from '../../../images/coupe.png';

export default function Podium(props)
{
    for (let index = 0; index < props.tabPodium.length; index++) {
        const element = props.tabPodium[index];
        if (element != null)
        { if (element.prenom.includes('@'))
        {
            element.prenom =element.prenom.split('@')[0].slice(0,10);
        }
        else
        {
            element.prenom = element.prenom.slice(0,10);
        }
        
        }
        
    }
    return <div className="centrePodium"><div className="placePrenomPodium">{props.tabPodium.length > 2 &&<React.Fragment><div className="prenomPodium">{props.tabPodium[2].prenom}</div>
     <div><small>({props.tabPodium[2].score != null && props.tabPodium[2].score} pts)</small></div></React.Fragment>}
    <div className="placePodium place3Podium">3</div></div>
    <div className="placePrenomPodium">{props.tabPodium.length >= 1 &&<React.Fragment><div  className="prenomPodium"><img src={coupe} alt="coupe"></img><div>{props.tabPodium[0].prenom}</div></div>
    <div><small>({props.tabPodium[0].score != null && props.tabPodium[0].score} pts)</small></div></React.Fragment>}

    <div className="placePodium place1Podium">1</div></div>
    <div className="placePrenomPodium">{props.tabPodium.length >= 2 &&<React.Fragment><div  className="prenomPodium">{props.tabPodium[1].prenom}</div>
        <div><small>({props.tabPodium[1].score != null && props.tabPodium[1].score} pts)</small></div></React.Fragment>}
    <div className="placePodium place2Podium">2</div></div></div>
}