
import React from 'react';
import { Button } from 'antd';

export default function Mots(props) {
        return <div><div className='fontMoyenne centre'><div className="couleurTitre">Liste de mots à retenir</div>
        {props.tabMots.map((mot, i) => <div key={i} className='marge10'>{mot}</div>)}
        <div className='centre marge10'><Button onClick={props.finMots}>J'ai mémorisé</Button></div></div>
        </div>
}