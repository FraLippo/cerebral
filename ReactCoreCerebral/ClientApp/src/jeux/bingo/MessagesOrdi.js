import React, { Component } from 'react';


export default class  MessageOrdis extends Component
{
    render()
    {
        return <div>{this.props.messageOrdis.map((info, i) => <div key={i}><div><b>{info.joueur}</b></div><div className="hauteurBingo">{info.msg}</div></div>)}</div>
    }
}