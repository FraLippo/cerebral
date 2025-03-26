import React, { Component } from 'react';




export default class Liste extends Component
{

    clic = (id) =>
    {
       
        this.props.clicListe(Math.floor(id/10), id%10);
    }

    afficheLettre(info,id, key)
    {
        if (info.etat === 'affiche')
        {
            return <div key={key} id={id} className='caseListeCoupe caseListePleinCoupe'>{info.reponse}</div>
        }
        else if (info.etat === 'cache' || info.etat=== 'selection')
        {
      
            return <div key={key} onClick={() => this.clic(id)} className={
                `caseListeCoupe ${info.groupe === 1 ? 'caseListeCoupeGroupe1' :info.groupe === 2 ?'caseListeCoupeGroupe2' : 'caseListeCoupeGroupe3'}  ${info.etat === 'selection' ? 'caseListeCoupeSel': ''}`}></div>
        }
    }
    render()
    {
           return <div>
            {this.props.tabListe.map((mot,i) => <div key={i+100} className='listeMotCoupe'>{mot.map((info,j) => this.afficheLettre(info,i*10+j, (((i+1) * 200) + j)))}</div>)}
           </div> 
    }
}