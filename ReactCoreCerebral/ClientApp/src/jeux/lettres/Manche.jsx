import React, { Component } from 'react';
import { Button } from 'antd';
import ButtonLink from '../../components/commun/ButtonLink';

export default class Manche extends Component {

    constructor(props) {
        super();

    }
    clickFin = () => {
        this.props.nouveauJeu();
    }

    boutonNiveau() {
        if (this.props.resultat === 'victoire') {
            return <Button className="autresJeux" onClick={() => { this.props.continuer(true) }}>Niveau suivant</Button>
        }

    }


    recommencer = () => {

        return <Button className="autresJeux" onClick={() => { this.props.continuer(false) }}>Recommencer</Button>
    }

    render() {

        return <div className="manche">{(this.props.boutonManche ? this.props.noManche !== 4 ? <Button type="primary" onClick={this.clickFin}>Commencer la manche</Button> :
            <div>{this.recommencer()} {this.boutonNiveau()}<Button className="autresJeux" href="/">Autres jeux</Button></div> :
            <span>Manche {this.props.noManche}  / 3</span>)}</div>
    }

}