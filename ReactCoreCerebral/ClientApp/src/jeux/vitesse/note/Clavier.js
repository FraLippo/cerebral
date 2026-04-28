import React from 'react';

export default function Clavier(props)
{
    function clic(event)
    {
        const id = parseInt(event.target.id);
        props.clicNote(id)
    }

    return <div className="centreGrilleNote">{props.tabNotes.map((note, i) => {
        const isBlackKey = note.nom.length > 1;
        const stateClass = note.noteEnCours === 1 ? 'selected' : note.noteEnCours === 2 ? 'wrong' : '';
        return <div onClick={clic} id={i} className={`touche ${isBlackKey ? 'noire' : 'blanche'} ${stateClass}`} key={i}>{note.nom}</div>
    })}</div>
}