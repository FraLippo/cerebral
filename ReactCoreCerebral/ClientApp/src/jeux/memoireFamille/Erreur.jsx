import React, { Component } from 'react';
import LogiqueFamille from './LogiqueFamille';



export default class Erreur extends Component {

    constructor() {
        super();
        this.timer = 0;
    }

    componentDidMount() {
        this.timer = setTimeout(this.props.finErreur, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return <div className="centre"><h2 className="erreurFamille">{"Erreur !"}</h2>
            <div className="erreurFamille">{"Il restait un élément de la famille : "}</div>
            <div><img className="imageFamille" src={LogiqueFamille.obtenirImage(this.props.no)} alt="jeu precedent erreur"></img></div>
        </div>
    }
}