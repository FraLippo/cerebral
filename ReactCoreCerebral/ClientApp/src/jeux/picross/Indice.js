import React, { Component } from 'react';

export default class Indice extends Component {

    constructionEmplacement(x, y) {
        if (this.props.type === "x") {
            
        return {
            gridColumn: (x*2) + 4 + ' / span 2',
            gridRow: y+1,
        }
        }
        if (this.props.type === "y") {
            
            return {
                gridColumn: y+1,
                gridRow: (x*2) + 4 + '/ span 2',
            }
            }
    }

    choixBordure = () =>
    {
        if (this.props.type === "y") {
            return "bordureBas";
        }
        else if (this.props.type === "x"){   
            return "bordureCote";
        }
       
    }

    render() {
        return <React.Fragment>
            {this.props.indice.map((col, i) => col.map((numero, j) => <div className={"centrePicross " + this.choixBordure()}  key={(this.props.type === 'x' ? 1000 : 2000) + ((i+1)*(j+1))} 
            style={this.constructionEmplacement(i, j)}>{numero === 0 ? '' :numero}</div>))}
        </React.Fragment>

    }
}