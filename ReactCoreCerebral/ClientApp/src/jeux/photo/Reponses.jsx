import React, { Component } from 'react';


export default class Reponses extends Component
{
    clicReponse = (event) =>
{
    let id =  parseInt(event.currentTarget.id);
    this.props.clicReponse(id);
}
    render()
    {
        return <div>{this.props.reponses.map((reponse,i) => <div className="reponsePhoto" key={i} id={i} onClick={this.clicReponse}>{reponse}</div>)}</div>
    }
}