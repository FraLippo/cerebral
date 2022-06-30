import React, { Component } from 'react';
import LogiqueFamille from './LogiqueFamille';
import intl from 'react-intl-universal';



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
        return <div className="centre"><h2 className="erreurFamille">{intl.get('FAMILLE_ERREUR')}</h2>
            <div className="erreurFamille">{intl.get('FAMILLE_MSG_ERREUR')}</div>
            <div><img className="imageFamille" src={LogiqueFamille.obtenirImage(this.props.no)} alt="jeu precedent erreur"></img></div>
        </div>
    }
}