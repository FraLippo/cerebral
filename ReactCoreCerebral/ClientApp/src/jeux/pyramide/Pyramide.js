import React, { Component } from 'react';
import { Row, Col } from 'antd';


export default class JeuxPyramide extends Component
{

    constructor(props)
    {
        super(props);
        this.key = 0;
        this.taille = this.props.taille;
    }

    clickNumero = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clickNumero(id);
      
    }
    creationCase(offset, centre)
    {
        return <Col  key={this.key}  xs={{ span: 4, offset: (offset*2) }}  sm={{ span: 2, offset: offset+ centre }}> <div id={this.key}  onClick={this.clickNumero} className={this.props.numeroEnCours === this.key? "casePy casePySelection": (this.props.valeurs[this.key] === '?' ? "casePy casePyInterrogation" : "casePy")}>{this.props.valeurs[this.key]}</div></Col>
    }


    creationLigne(nbElements, totalLignes, centre)
    {
        let ligneJeu = [];
       
        for (let index = 1; index <= nbElements; index++) {
            if (index === 1) ligneJeu.push(this.creationCase((totalLignes- nbElements), centre));
            else
            ligneJeu.push(this.creationCase(0));   
            this.key++; 
        }
        return   <Row  key={this.key * 100}  gutter={8}>{ligneJeu.map( element => element)} </Row>
    }

    creationGrille(totalLigne)
    {
        this.grilleJeu = [];
        this.key = 0;
        const centre = Math.round((24 - (totalLigne * 2 ))/2); 
        for (let index = 1; index <= totalLigne; index++) {
            this.grilleJeu.push(this.creationLigne(index, totalLigne, centre));
            
        }
        return <div>{this.grilleJeu.map(element => element)}</div>
    }

    render()
    {
        return <div>{this.creationGrille(this.taille)}</div>
    }
    
    
  
}