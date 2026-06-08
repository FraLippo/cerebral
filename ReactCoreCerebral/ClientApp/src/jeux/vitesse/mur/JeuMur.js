import React, { Component } from 'react';
import Briques from './Briques';
import Saisie from './Saisie';
import Logique from './Logique';
import { Button } from 'antd';

export default class JeuMur extends Component 
{

    constructor(props)
    {


        super(props);
        Logique.constructionBriques();
        this.state =
        {
            tabBriques : [],
            tabSaisie : []
        }
    }

   

    componentDidMount()
    { 
        let tabBriques = Logique.constructionBriques();

       
        this.setState({tabBriques,
       
        });
    }

   clicMur = (index) =>
   {
    if (!this.state.tabBriques[index].selection) return;
    if (this.state.tabSaisie.length === 10) return; 
        let nouveauTabBrique = [...this.state.tabBriques];
        let nouveauTabSaisie = [...this.state.tabSaisie];

        let caseMur = nouveauTabBrique[index];
        caseMur.etat = "clic";
        nouveauTabSaisie.push(caseMur);

        this.setState({
            tabBriques : nouveauTabBrique,
            tabSaisie : nouveauTabSaisie
        })

   }

 

   reset = () =>
   {
        let nouveauTabBrique = [...this.state.tabBriques];
        let nouveauTabSaisie = [...this.state.tabSaisie];
        let nb = nouveauTabSaisie.length;
        for (let index = 0; index < nb; index++) {
          let el = nouveauTabSaisie.pop();
            el.etat = 'init';
            
        }

           this.setState({
            tabBriques : nouveauTabBrique,
            tabSaisie : nouveauTabSaisie
        })
   }
    
    render()
    {
          return <div>
            <div className='plateau-mur'>
                <div className='jeu-mur'>
                    <div className='briques-mur'><Briques clicMur={this.clicMur} tabBriques={this.state.tabBriques}></Briques></div>
                    <div className='mot-mur'>
                      <div className='saisie-mur'><Saisie  tabSaisie={this.state.tabSaisie}></Saisie></div>
                    </div>
                    <div className='boutons-mur'>
                        <Button type='primary' onClick={this.valider}>Valider</Button><Button className='espaceBouton'  onClick={this.reset}>Reset</Button>
                    </div>

                </div>

            </div>

          </div>
    }
  
}