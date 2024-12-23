import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import { Button } from 'antd';


export default class JeuBataille extends Component {

   constructor(props)
   {
        super(props);
        let tabBataille = Logique.generateGridWithHelp();
        console.log(tabBataille);
        this.state= {
            tabBataille 
        }
   }

   regenerate = () =>
   {
    let i = 0;
    let tabBataille = [];
    
    
        tabBataille = Logique.generateGridWithHelp();
     console.log(tabBataille);
    this.setState({
        tabBataille
   })
   }

   clicGrille = (coord) =>
   {
    console.log(coord);
        let nouveauTabBataille = [...this.state.tabBataille];
        if (nouveauTabBataille[coord.y][coord.x].ship === 1 )
        {
            nouveauTabBataille[coord.y][coord.x].state = 1
        }
        if (nouveauTabBataille[coord.y][coord.x].ship === 0 )
            {
                nouveauTabBataille[coord.y][coord.x].state = 2
            }

        this.setState({
            tabBataille: nouveauTabBataille
        })
   }

    render()
    {
        return <div className='jeuMry'>

          <div><Grille clicGrille={this.clicGrille} tabBataille={this.state.tabBataille}></Grille></div>

<Button onClick={this.regenerate}>Nouvelle grille</Button>

        </div>
    }
}