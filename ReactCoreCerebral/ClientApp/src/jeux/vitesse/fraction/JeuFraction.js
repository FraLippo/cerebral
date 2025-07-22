import  { Component } from 'react';
import Grille from './Grille';
import { Button, message } from 'antd';
import { tabData } from './data';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { finJeu } from '../forme/Logique';

const taille = 8;
export default class JeuFraction extends Component {

    constructor() {
        super();
       this.noJeu = -1;
        this.state =
        {
           tabGrille : [],
           surface : 0,
           deno : 1,
           numera : 1,
           traduction : '',
           noJeu : 0,
           finJeu: false,
           score : 0
        }
        this.fin = false;

    }

    construireTraduction = (numera,deno) =>
    {
        if (numera === 1 && deno === 2)
        {
            return 'la moitié';
        }
        if (numera === 1 && deno === 5)
        {
            return '20 %'
        }
         if (numera === 3 && deno === 4)
        {
            return 'les trois quarts'
        }
        return '';
    }

    ajoutCases = (tabGrille) =>
    {
        let nbCases = Math.floor(Math.random() * 7) + 3;
        let tabGrilleCase = [];
        for (let index = 0; index < tabGrille.length; index++) {
            if (tabGrille[index] === 1)
            {
                tabGrilleCase.push(index);
            }
            
        }
        for (let index = 0; index < nbCases; index++) {
             let caseOrangeIndex = Math.floor(Math.random() * tabGrilleCase.length);
             tabGrille[tabGrilleCase[caseOrangeIndex]] = 2;
            
        }
        return tabGrille;
    }

    nouveauJeu = () =>
    {
        this.fin = false;
        this.noJeu++;
        if (this.noJeu === tabData.length)
        {
            this.setState({
                finJeu : true,
                score : this.state.score === 45 ? this.state.score + 60 : this.state.score

            })
            return;
        }
        let donneesJeu = tabData[this.noJeu];
        let surface =  donneesJeu.taille[Math.floor(Math.random() * donneesJeu.taille.length)];
        
        let numera = donneesJeu.numera[Math.floor(Math.random() * donneesJeu.numera.length)];
        let deno = donneesJeu.deno;
        let traduction = this.construireTraduction(numera, deno);
        let tabGrille = this.genererFigure(taille, taille, surface);
    
        if (this.noJeu > 6)
        {
            tabGrille = this.ajoutCases(tabGrille);
        }
        this.setState(
            {
                tabGrille,
                deno,
                numera,
                surface,
                traduction,
                noJeu : this.noJeu + 1
            })

    }
    componentDidMount()
    {
        this.nouveauJeu();
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
    if (this.fin) return;
    this.fin = true;
     let nbColorie = this.state.tabGrille.filter(x => x === 2);
     let bonResult = (this.state.surface * this.state.numera) / this.state.deno;
     if (nbColorie.length === bonResult)
     {
     
        message.success('Bravo',1, this.nouveauJeu);
        this.setState({
            score : this.state.score + 5
        })
     }
     else
     {
        
        if (nbColorie.length > bonResult)
        {
            message.error('Erreur, tu as colorié ' + (nbColorie.length - bonResult) + ' ' +  (nbColorie.length - bonResult === 1 ? 'case' : 'cases') + ' en trop.',1.5, this.nouveauJeu);
        }
        else
        {
             message.error('Erreur,  tu as oublié de colorier ' + (bonResult - nbColorie.length) +  (bonResult - nbColorie.length === 1 ? ' case.' : ' cases.'),1.5, this.nouveauJeu);
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

      finTimer = () => {
           this.setState({ finJeu: true });
       }

    render() {
        return  <div>
        {this.state.finJeu ?
                        <Resultat score={this.state.score} typeExo='vitessefraction'></Resultat> :
                        <div className='jeuFrac'>
            <div ><Grille tabGrille={this.state.tabGrille} nbCols={8} clic={this.clic}></Grille></div>
            <div className='margeMenu centre texteFrac'>
              
                <div>La figure comprend <strong>{this.state.surface}</strong> carrés.</div>
                <div>Colorie {this.state.traduction == '' ? <strong className='fractionFrac'>{this.state.numera}&frasl;{this.state.deno} </strong>
                : <strong>{this.state.traduction} </strong>}
                des carrés en orange.</div>
                {this.state.noJeu > 7 && <div>Nabilla a déjà commencé le travail.</div>}
            </div>
            <div><Button onClick={this.clicTerminer}>J'ai terminé de colorier</Button></div>
            <div className='centre texteFrac margeMenu'>Étape : {this.state.noJeu} / {tabData.length}</div>
                                    <div className="centre marge10"><CompteRebours temps={80} finTimer={this.finTimer}></CompteRebours></div>
            <div className='espaceTitreBas'></div>

            </div>}
            </div>
    }
}