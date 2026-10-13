import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import Ad from '../../components/commun/adSense';

export default class Resultat extends Component {


    constructor()
    {
        super();
        this.chemin = '/' + "jeux-bingo" + '/';
    
    }
render()
{
    
    return <div className="centre">
        <h2>{"La partie est terminée."}</h2>
        <div><Link reloadDocument to={this.chemin + this.props.id}>{"Refaire une partie"}</Link></div>
        <div><Link reloadDocument to={this.chemin + 1000}>{"Grille 4x4 - facile"}</Link></div>
        <div><Link reloadDocument to={this.chemin + 1001}>{"Grille 4x4 -  intermédiaire"}</Link></div>
        <div><Link reloadDocument to={this.chemin + 1002}>{"Grille 5x5 - très difficile"}</Link></div>
        <div><Link reloadDocument to={this.chemin + 1003}>{"Grille 5x5 - tout simplement impossible"}</Link></div>
    <Ad></Ad>
    </div>
}

}