import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import { message } from 'antd';
import { SHIPS } from './data';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

export default class JeuBataille extends Component {

   constructor(props)
   {
        super(props);
        let tabBataille = Logique.generateGridWithHelp();
        this.nbNavires = SHIPS.map((tab) => {return tab[1]});
        this.fin = false;
        this.state= {
            tabBataille, 
            tabNavires :JSON.parse(JSON.stringify(SHIPS)),
            erreurs : 4,
            score : 0
        }
   }

   regenerate = () =>
   {
    this.fin = false;
    let tabBataille = [];
        tabBataille = Logique.generateGridWithHelp();
   console.log(tabBataille);
    this.setState({
        tabBataille,
        tabNavires : JSON.parse(JSON.stringify(SHIPS)),
        erreurs : 4,
        score : this.state.score + 50
        
   })
   }

   clicGrille = (coord) =>
   {
        if (this.fin) return;
        let erreurs = this.state.erreurs;
        let score = this.state.score;
        let nouveauTabBataille = [...this.state.tabBataille];
        if (nouveauTabBataille[coord.y][coord.x].ship === 1 && nouveauTabBataille[coord.y][coord.x].state !== 1 )
        {
            nouveauTabBataille[coord.y][coord.x].state = 1
            score += 1;
         
 
        }
        if (nouveauTabBataille[coord.y][coord.x].ship === 0 && nouveauTabBataille[coord.y][coord.x].state !== 2 )
            {
                nouveauTabBataille[coord.y][coord.x].state = 2;
                erreurs--;
                if (erreurs === 0)
                {
                    this.fin= true;
                    message.success("Perdu, trop de coups dans l'eau", this.finTimer);
                }
            }
const tabResult = Logique.findSunkBoat(nouveauTabBataille);
let nouveauTabNavires = [...this.state.tabNavires]

 for (let index = 0; index < 4; index++) {
    nouveauTabNavires[index][1] = this.nbNavires[index] - tabResult.filter((info) => info.cell.shipSize === 4 - index).length;
   
 }
const somme = this.state.tabNavires.reduce((acc, current) => acc + current[1], 0);

 console.log(somme);
 if (somme === 0)
    {
        message.success('Bravo, grille terminée', this.regenerate);
        this.fin = true;
     }
 
        this.setState({
            tabBataille: nouveauTabBataille,
            tabNavires : nouveauTabNavires,
            erreurs,
            score
        })
   }

   finTimer = () => {
    this.setState({finJeu : true});
}

    render()
    {
        return  <React.Fragment>
            <Helmet>
            <title>La bataille navale</title>
            <meta name="description" content="Retrouvez la bataille navale de votre enfance dans une nouvelle version jeu de logique inspirée du Picross. Un jeu divertissant pour tous les âges. " />
            </Helmet>
             {this.state.finJeu ?
                            <Resultat score={this.state.score} typeExo='vitessebataille'></Resultat> :
        <div className='jeuMry'>

          <div><Grille clicGrille={this.clicGrille} tabBataille={this.state.tabBataille}></Grille></div>
        <p>Reste à trouver :</p>
        {this.state.tabNavires.map((liste, i) => <div key={i+500}>{liste[1]} {liste[1] > 1 ?'navires' : 'navire'}  de {liste[0]} {liste[0] > 1 ?'cases' : 'case'}.</div>)}
    <div className='alignNav espaceHaut' >
         <div>Score : {this.state.score}</div>
         <div className='margeGauche10'> <CompteRebours temps={180} finTimer={this.finTimer}></CompteRebours></div>
            <div className='margeGauche10'>Coups dans l'eau : {this.state.erreurs}</div>
                        </div>
                        <div className="centre titreJeu">La bataille navale</div>

        </div>}
        </React.Fragment>
    }
}