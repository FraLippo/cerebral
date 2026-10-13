import React, { Component } from 'react';
import { constructionEmplacement } from './utilitaire';


export default class Grille extends Component
{



    render()
    {
    return this.props.tabGrille.map((ligne, x) => 
    ligne.map((lacase,y) =>
     <div key={(x * ligne.length) + y} style={constructionEmplacement(x, y)} className={lacase === 1 ? 'caseGrilleRobot' : ''}></div>))
        
    }
}