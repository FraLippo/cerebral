import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import { Button } from 'antd';
import { SHIPS } from './data';

export default class JeuBataille extends Component {

   constructor(props)
   {
        super(props);
        let tabBataille = Logique.generateGridWithHelp();
        this.nbNavires = SHIPS.map((tab) => {return tab[1]});

        this.state= {
            tabBataille, 
            tabNavires : SHIPS
        }
   }

   regenerate = () =>
   {
    let i = 0;
    let tabBataille = [];
    
    
        tabBataille = Logique.generateGridWithHelp();
   
    this.setState({
        tabBataille
   })
   }

   clicGrille = (coord) =>
   {
 
   
        let nouveauTabBataille = [...this.state.tabBataille];
        if (nouveauTabBataille[coord.y][coord.x].ship === 1 )
        {
            nouveauTabBataille[coord.y][coord.x].state = 1
        }
        if (nouveauTabBataille[coord.y][coord.x].ship === 0 )
            {
                nouveauTabBataille[coord.y][coord.x].state = 2
            }
const tabResult = Logique.findSunkBoat(nouveauTabBataille);
let nouveauTabNavires = [...this.state.tabNavires]

 for (let index = 0; index < 4; index++) {
    nouveauTabNavires[index][1] = this.nbNavires[index] - tabResult.filter((info) => info.cell.shipSize === 4 - index).length;
    console.log(this.nbNavires);
 }
        this.setState({
            tabBataille: nouveauTabBataille,
            tabNavires : nouveauTabNavires
        })
   }

    render()
    {
        return <div className='jeuMry'>

          <div><Grille clicGrille={this.clicGrille} tabBataille={this.state.tabBataille}></Grille></div>
        <p>Reste à trouver :</p>
        {this.state.tabNavires.map((liste, i) => <div key={i+500}>{liste[1]} {liste[1] > 1 ?'navires' : 'navire'}  de {liste[0]} {liste[0] > 1 ?'cases' : 'case'}.</div>)}

<Button onClick={this.regenerate}>Nouvelle grille</Button>

        </div>
    }
}