import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import intl from 'react-intl-universal';
import Ad from '../../components/commun/adSense';

export default class Resultat extends Component {


    constructor()
    {
        super();
        this.chemin = '/' + intl.get('NOM_BINGO') + '/';
    
    }
render()
{
    
    return <div className="centre">
        <h2>{intl.get('BINGO_FINI')}</h2>
        <div><Link to={this.chemin + this.props.id}>{intl.get('BINGO_PARTIE5')}</Link></div>
        <div><Link to={this.chemin + 1000}>{intl.get('BINGO_PARTIE1')}</Link></div>
        <div><Link to={this.chemin + 1001}>{intl.get('BINGO_PARTIE2')}</Link></div>
        <div><Link to={this.chemin + 1002}>{intl.get('BINGO_PARTIE3')}</Link></div>
        <div><Link to={this.chemin + 1003}>{intl.get('BINGO_PARTIE4')}</Link></div>
    <Ad></Ad>
    </div>
}

}