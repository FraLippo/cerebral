
import React, { Component } from 'react';


export default class Grille extends Component
{

  
    constructionEmplacement(index) {
   
  
        return {
            gridColumn: ((index % 3) * 2) +2 + ' / span 2',
         
            gridRow: ((Math.floor(index / 3)) * 2) +2 + ' / span 2',
 
        }
    }

    construireClasse(no)
    {
        let couleur = '';
        if (no ===1)
        {
            couleur = 'vertTresse';
        }
        if (no===2)
        {
            couleur = 'bleuTresse';
        }
        if (no===3)
        {
            couleur = 'orangeTresse';
        }
        if (no===4)
        {
            couleur = 'roseTresse';
        }
        return couleur;
    }

    render()
    {
        return <React.Fragment>
            <React.Fragment>{this.props.tabGrille.map((no, i) =>
             <div className={this.construireClasse(no)}  key={i+400} id={i+400} style={this.constructionEmplacement(i)}></div>)}</React.Fragment>
             
             
             </React.Fragment>
    }
}