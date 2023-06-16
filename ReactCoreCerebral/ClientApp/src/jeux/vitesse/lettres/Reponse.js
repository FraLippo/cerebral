import React, { Component } from 'react';

function Reponse(props)
{

    const clicReponse = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        props.clicReponse(String.fromCharCode(id - 500));
    }
    return <div className="serieLettres">{props.tabLettres.map((lettre, i) => <div id={i+565} key={i+565} onClick={clicReponse} className="carreLettres">{lettre}</div>)}</div>
}

export default Reponse;