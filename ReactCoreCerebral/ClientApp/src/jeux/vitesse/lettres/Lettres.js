import React, { Component } from 'react';

export default function Lettres(props)
{
    return <div className="serieLettres">{props.tabLettres.map((info, i) => <div key={i} className={info.couleur === '' ? "carreLettres" :  "carreLettres " + info.couleur}>{info.couleur === '' ? info.lettre : ''}</div>)}</div>
}