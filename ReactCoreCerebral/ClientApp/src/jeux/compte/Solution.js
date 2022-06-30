import React, { Component } from 'react';
import LogiqueCompte from './LogiqueCompte';


export default class Solution extends Component {

    constructionEmplacement(position) {

        let y = (Math.floor(position / 5)) + 1;
        let x = (position % 5) + 1;

        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y
        }

    }

    obtenirStyle = (position) => {;
        if (LogiqueCompte.estBonnePlaceCarte(position) || LogiqueCompte.estBonnePlaceResultat(position)) {
            return "carteCompte";
        }
        else {
            return "operation";
        }
       
    }




render()
{
return <div className="grilleCalcul">{this.props.solution.map((element, i) => <div className={"animationSuite " + this.obtenirStyle(i)} key={i} style={this.constructionEmplacement(i)}>{element}</div>)}</div>
}

}