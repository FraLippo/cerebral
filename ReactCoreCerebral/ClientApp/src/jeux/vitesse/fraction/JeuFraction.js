import  { Component } from 'react';
import Grille from './Grille';
import { Button, message } from 'antd';


export default class JeuFraction extends Component {

    constructor() {
        super();
       
        this.state =
        {
           tabGrille : this.genererFigure(8,8, 12),
           surface : 14
        }

    }
    genererFigure(rows, cols, tailleSouhaitee) {
    const figure = new Set();          // Indices des cases choisies
    const frontier = [];               // Frontières sous forme [r, c]
    const tabGrille = new Array(rows * cols).fill(0);
    const toIndex = (r, c) => r * cols + c;

    const voisins = [[-1,0],[1,0],[0,-1],[0,1]];

    // Case de départ
    const startR = Math.floor(Math.random() * rows);
    const startC = Math.floor(Math.random() * cols);
    const startIdx = toIndex(startR, startC);
    figure.add(startIdx);
    frontier.push([startR, startC]);

    while (figure.size <= tailleSouhaitee && frontier.length > 0) {
        // Choisir un point dans la frontière
        const idx = Math.floor(Math.random() * frontier.length);
        const [r, c] = frontier.splice(idx, 1)[0];

        for (const [dr, dc] of voisins) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const neighborIdx = toIndex(nr, nc);
                if (!figure.has(neighborIdx)) {
                    figure.add(neighborIdx);
                    tabGrille[neighborIdx] = 1;
                    frontier.push([nr, nc]);
                    if (figure.size >= tailleSouhaitee) break;
                }
            }
        }
    }
  
    return tabGrille;
}

clicTerminer = () =>
{
     let nbColorie = this.state.tabGrille.filter(x => x === 2);
     if (nbColorie.length === 3)
     {
        message.success('Bravo');
     }
     else
     {
        if (nbColorie.length > 3)
        {
            message.error('Erreur, tu as colorié ' + (nbColorie.length - 3) + ' ' +  (nbColorie.length - 3 === 1 ? 'case' : 'cases') + ' en trop.');
        }
        else
        {
             message.error('Erreur,  tu as oublié de colorier ' + (3 - nbColorie.length) +  (3 - nbColorie.length === 1 ? ' case.' : ' cases.'));
        }
     }
}
   clic = (i) =>
   {
      if (this.state.tabGrille[i] === 0) return;
      let nouveauTabGrille = [...this.state.tabGrille];
      if (nouveauTabGrille[i] === 1)
      {
        nouveauTabGrille[i] = 2
      }
      else
      {
        nouveauTabGrille[i] = 1
      }
      this.setState({
        tabGrille: nouveauTabGrille
      })
   }
    render() {
        return <div className='jeuFrac'>
            <div ><Grille tabGrille={this.state.tabGrille} nbCols={8} clic={this.clic}></Grille></div>
            <div className='margeHaut10 centre texteFrac'>
              
                <p>La figure comprend <strong>{this.state.surface}</strong> carrés.</p>
                <p>Colorie <strong className='fractionFrac'>1&frasl;3</strong> des carrés en orange.</p>
            </div>
            <div><Button onClick={this.clicTerminer}>J'ai terminé de colorier</Button></div>
            </div>
    }
}