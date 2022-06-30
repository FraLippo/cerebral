import React, { Component } from 'react';
import LogiqueEsp from './LogiqueEsp';
export default class ListeCarte extends Component
{
    render()
    {
        return <div className="centreBloc" >{this.props.cartes.map((el,i) => <img key={i} className="carteEsp" src={LogiqueEsp.construireCarte(el)} alt="carte"/>)}</div>
    }
}