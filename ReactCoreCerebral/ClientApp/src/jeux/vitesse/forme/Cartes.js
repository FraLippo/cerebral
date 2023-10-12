import React, { Component } from 'react';




export default class Cartes extends Component {

    constructor() {
        super();

    }

    
    clic = (event) =>
    {
        const id = event.currentTarget.id;
        this.props.clic(id);
    }

    forme = (forme , couleur) => {
        if (forme === 'cercle')
            return <svg className={"geoForme " + couleur + 'Forme'} xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" /></svg>
        else if (forme ===  'triangle')
            return <svg className={"geoForme " + couleur + 'Forme'} xmlns="http://www.w3.org/2000/svg" width="50" height="50"><polygon points="25,0 0,49 49,49" /></svg>
        else if (forme === 'carre') return <svg className={"geoForme " + couleur + 'Forme'}  xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect x="2" y="2" width="46" height="46"/></svg>
        }

    render() {
        return this.props.tabCarte.map((info, i) => <div onClick={this.clic} id={i} key={i + 5000} className={info.etat}>
            <div className="front">{this.forme(info.forme, info.couleur)}</div>
            <div className="back"></div></div>)
    }
}
