import React, { Component } from 'react';
import woman from '../../../images/woman.png';
import euro from '../../../images/euro.png';


export default class Grille extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
  
    constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 2;
        let x = index % taille + 2;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }

    
    render()
    {
    return this.props.tabGrille.map((type, i) => <div 
    id={i} key={i} className="caseTresor" style={this.constructionEmplacement(i, this.props.taille)} onClick={this.clic}>
        {type===0 ? '' : (type === 1 ? <img src={woman} alt="joueuse"></img> :  <img src={euro} alt="euro"></img>)} 
        </div>)
        
    }
}