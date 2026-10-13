import React, { Component } from 'react';



export default class Reponses extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
    
    render()
    {
    return <div className="marge20 reponsesRece">{this.props.tabReponses.map((contenu, i) => 
    <div id={i} key={i} onClick={this.clic} className="caseRepRece" >{contenu}</div>)}</div>
    }
}