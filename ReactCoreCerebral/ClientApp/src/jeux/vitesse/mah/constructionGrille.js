import React, { Component } from 'react';
import ma1 from '../../../images/mah/ma1.png'
import { Button } from 'antd';


export default class ConstructionGrille extends Component
{
    constructor()
    {
       super();
        let grille = new Array(96).fill(0);
        console.log(grille);
        this.state ={
            grille,
            resultat : '' 
        }
        this.hauteur = 8;
        this.largeur = 12;
    }

    click = (index) =>
    {
        let nouvelleGrille = [...this.state.grille];
        nouvelleGrille[index] = nouvelleGrille[index] === 0 ? 1 : 0;
        this.setState({grille : nouvelleGrille});

    }

    afficherTab= () =>
    {
        let tab1 = this.state.grille.filter(x => x!== 0);
        if (tab1.length % 2 !== 0) alert("Le nombre n'est pas pair.");
        if (tab1.length > 52) alert("Trop de tuiles !") 
        let resultat = JSON.stringify(this.state.grille);

        this.setState({
            resultat
        })
    }

    constructionEmplacement(index) {

        let y = (Math.floor(index / this.largeur)) + 1;
        let x = index % this.largeur + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }

    render()
    {
        return <div className='centreGrilleMah'><div className="grilleMah">{this.state.grille.map((info, i) =>
             <div onClick={() => this.click(i)} className='caseConMah' style={this.constructionEmplacement(i)} key={i}>{info > 0 &&<img className='caseMah' src={ma1} alt='tuile mah jong'></img>}
                </div>)}
               </div>
               <div><Button onClick={this.afficherTab}>Affiche résultat</Button></div>
              
                  <div>Nombre éléments : {this.state.grille.filter(x => x!== 0).length}</div>
              <div style={{userSelect : 'all'}}>{this.state.resultat}</div>
               </div>
    }
}