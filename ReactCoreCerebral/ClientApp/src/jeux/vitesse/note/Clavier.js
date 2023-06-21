import React, { Component } from 'react';


export default function Clavier(props)
{
    function clic(event)
    {
        const id = parseInt(event.target.id);
        props.clicNote(id)
}

    return <div className="centreGrilleNote">{props.tabNotes.map((note, i) => <div onClick={clic} id={i} className={note.noteEnCours === 0 ? "clavierNote" :note.noteEnCours === 1 ?  "clavierNote clavierNote1" : "clavierNote clavierNote2" } key={i}>{note.nom}</div>)}</div>
}