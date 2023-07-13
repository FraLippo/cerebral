import React, { Component } from 'react';



export default class Grille extends Component
{

    clic = (event) =>
    {
        const id = parseInt(event.target.id);
        this.props.clic(id);
    }
  
    constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }

    
    render()
    {
    return <div className="grilleMemoireV">{this.props.tabGrille.map((type, i) => <div id={i} key={i} className="caseMemoireV" style={this.constructionEmplacement(i, this.props.taille)} onClick={this.clic}>{type===1 && <div className='noirciMemoireV'></div>}</div>)}</div>
    }
}