import React, { Component } from 'react';

export default class Grille extends Component {

    constructionEmplacement(x,y)
    {
       
       
    
        return {
            gridColumnStart : y+1, 
            gridColumnEnd : y+1,
            gridRowStart : x+1,
            gridRowEnd : x+1
        }
    }
    clic =(x,y) =>
    {
       
        this.props.clic(x,y);
      
    }
    

    render()
    {
        return <div className="grilleBinero">
            {this.props.tabGrille.map((ligne, i) => ligne.map((valeur, j) => valeur < 9 ? <div key={(i*this.props.tabGrille.length)+j} className="caseBinero" style={this.constructionEmplacement(i,j)}>{valeur}</div>
            : valeur >= 20 ? <div key={(i*this.props.tabGrille.length)+j} className="caseBinero caseBineroErreur"  style={this.constructionEmplacement(i,j)}>{valeur-30}</div> : 
            <div key={(i*this.props.tabGrille.length)+j} className="caseBinero caseBineroChoix"  onClick={() => this.clic(i,j)} style={this.constructionEmplacement(i,j)}>{valeur === 9 ? '' : valeur-10}</div>))  }

        </div>


    }
}

