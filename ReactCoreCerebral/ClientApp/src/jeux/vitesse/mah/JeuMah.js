import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';


const TAILLE = 12;
export default class JeuMah extends Component
{

    constructor()
    {
        super();
        this.logique = new Logique();
        this.state = {
            tabTuiles : [],
            tabGrille : []
        }
    }

    componentDidMount()
    {
        this.logique.constructionGrille();
        this.setState({
            tabTuiles : this.logique.tabTuiles,
            tabGrille : this.logique.tabGrille
        })
    }

    clicTuile = (i) =>
    {
        let nouveauTabTuiles = [...this.state.tabTuiles];
       console.log(nouveauTabTuiles[i].pos);
       console.log(this.state.tabGrille)
          if (nouveauTabTuiles[i].pos % TAILLE === 0)
          {
            nouveauTabTuiles[i].etat = 'selection';
          }
          if (nouveauTabTuiles[i].pos % TAILLE === TAILLE -1)
          {
            nouveauTabTuiles[i].etat = 'selection';
          }
        if (nouveauTabTuiles[i].pos % TAILLE > 0 && this.state.tabGrille[nouveauTabTuiles[i].pos-1] === 0)
        {
            nouveauTabTuiles[i].etat = 'selection';
        }
         if (nouveauTabTuiles[i].pos % TAILLE < TAILLE && this.state.tabGrille[nouveauTabTuiles[i].pos+1] === 0)
        {
            nouveauTabTuiles[i].etat = 'selection';
        }
        this.setState({
            tabTuiles : nouveauTabTuiles
        })
    }

    render()
    {
        return <div>
            <div className='centreGrilleMah'>
            <Grille taille={TAILLE} tabTuiles={this.state.tabTuiles} clicTuile={this.clicTuile}></Grille></div>
               </div>
    }
}