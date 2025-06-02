import React, { Component } from 'react';



export default class Grille extends Component
{



    render()
    {
    return this.props.tabListeReponse.map((mot, i) => <div key={i}  className='lignemaitre'>{
    mot.map((l,j) =>
     <div key={((i+1) * mot.length) + j} className='casenormalm'><div  className={l.etat === 'mauvais' ? 'casemalplacem' : l.etat === 'trouve' ? 'casebienplacem' : ''}>{l.lettre}</div></div>)}</div>)
        
    }
}