import React, { Component } from 'react';
import {Button} from 'antd';
import {Redirect} from 'react-router-dom';

export default class Manche extends Component {

    constructor(props)
    {
        super();
        this.state = {redirection : false};
        this.niveauSuivant = '';
    }
    clickFin = () =>
    {
        this.props.nouveauJeu();
    }
    
    boutonNiveau()
    {
        if (this.props.nbJoueurs === 1 && (this.props.niveau >=  1 && this.props.niveau <= 3 ))
        {
            this.niveauSuivant = '/JeuxLettres/0/1/' + (this.props.niveau+1);
            return <Button className="autresJeux" type="primary" onClick={this.redirectionSuivant}>Niveau suivant</Button>
        }
    }

    redirectionSuivant= () =>
    {
        this.niveauSuivant = '/JeuxLettres/0/1/' + (this.props.niveau+1);
        this.setState({redirection : true})   
    }
    redirection= () =>
    {
        if (this.props.nbJoueurs > 1)
        {
            this.props.nouveauJeu();
        }
        else
        {
            this.niveauSuivant = '/JeuxLettres/0/1/' + this.props.niveau;
        }
        this.setState({redirection : true})   
    }

    render()
    {
        if (this.state.redirection)
        {
            return <Redirect to={this.niveauSuivant}></Redirect>
        }
        return <div  className="manche">{(this.props.boutonManche ? this.props.noManche!==3 ? <Button type="primary"  onClick={this.clickFin}>Commencer la manche</Button>: (!this.props.concours && <div><Button onClick={this.redirection}>Recommencer</Button>{this.boutonNiveau()}<Button className="autresJeux" href="/">Autres jeux</Button></div>) : <span>Manche {this.props.noManche}  / 3</span>)}</div>
    }

}