import React, { Component } from 'react';
import Logique from './LogiquePyramide'



export default class Choix extends Component
{
    clickChoix = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clickChoix(id);
      
    }

    afficheNombre = (element, i) =>
    {
        if (element === '') return "hideCount";
        return this.props.choixEnCours === i ? "selectionPyBordure caseChoixPy " :"caseChoixPy"
    }

    render()
    {
        return <div className="gridChoixPy">{this.props.tabChoix.map((element, i) => <div id={i} className={this.afficheNombre(element,i)} onClick={this.clickChoix} style={Logique.constructionEmplacement(i, 4)}  key={i*10000}>{element}</div>)}</div>
    }
}