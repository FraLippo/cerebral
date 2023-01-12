import React, { Component } from 'react';
import {Button} from 'antd';
import ButtonLink from '../../components/commun/ButtonLink';

export default class Manche extends Component {

    constructor(props)
    {
        super();
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
            return <ButtonLink className="autresJeux" titre="Niveau Suivant" href={this.niveauSuivant}></ButtonLink>
        }
    }

  
    recommencer= () =>
    {
      
            this.niveauSuivant = '/JeuxLettres/0/1/' + this.props.niveau;
            return <ButtonLink className="autresJeux" titre="Recommencer" href={this.niveauSuivant}></ButtonLink>  
    }

    render()
    {
     
        return <div  className="manche">{(this.props.boutonManche ? this.props.noManche!==3 ? <Button type="primary"  onClick={this.clickFin}>Commencer la manche</Button>: (!this.props.concours && <div>{this.recommencer()} {this.boutonNiveau()}<Button className="autresJeux" href="/">Autres jeux</Button></div>) : <span>Manche {this.props.noManche}  / 3</span>)}</div>
    }

}