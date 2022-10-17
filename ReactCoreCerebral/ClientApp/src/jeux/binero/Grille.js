import React, { Component } from 'react';

export default class Grille extends Component {

    constructionEmplacement(position)
    {
       
        let y = (Math.floor(position / this.props.taille)) + 1;
        let x = position % this.props.taille + 1;
    
        return {
            gridColumnStart : x, 
            gridColumnEnd : x,
            gridRowStart : y,
            gridRowEnd : y
        }
    }
    clic =(e) =>
    {
        const id = parseInt(e.currentTarget.id);
        this.props.clic(id);
      
    }
    

    render()
    {
        return <div className="grilleBinero">
            {this.props.tabJeu.map((valeur, i) => valeur < 9 ? <div key={i} id={i} className="caseBinero" style={this.constructionEmplacement(i)}>{valeur}</div>
            : <div key={i} className="caseBinero caseBineroChoix" id={i} onClick={this.clic} thisstyle={this.constructionEmplacement(i)}>{valeur === 9 ? '' : valeur - 10}</div>)  }

        </div>
    }
}

