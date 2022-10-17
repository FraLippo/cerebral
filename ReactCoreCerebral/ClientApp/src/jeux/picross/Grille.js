import React, { Component } from 'react';

export default class Grille extends Component {

    constructionEmplacement(position)
    {
       
        let y = (Math.floor(position / this.props.taille)*2) + 4;
        let x = (position % this.props.taille)*2 + 4;
    
        return {
            gridColumn: x + ' / span 2',
            gridRow: y + ' / span 2',
        }
    }
    clic =(e) =>
    {
        const id = parseInt(e.currentTarget.id);
        this.props.clic(id);
      
    }
    

    render()
    {
        return <React.Fragment>
            {this.props.tabJeu.map((valeur, i) => <div id={i} onClick={this.clic} className={"centrePicross bordureGrille " + (valeur !== 0 && "pleinPicross")}  key={i+100} style={this.constructionEmplacement(i)}></div>)}
            </React.Fragment>
    }
}

