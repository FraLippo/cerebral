import React, { Component } from 'react';
import pers1 from '../../../images/pers1.png'
import piece001 from '../../../images/piece001.png'
import piece002 from '../../../images/piece002.png'
import piece2 from '../../../images/piece2.png'
import Caisse from './Caisse';
import { Button } from 'antd';

export default class JeuMonnaie extends Component {

    constructor(props) {
        super(props);

        let tabCaisse = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
       
        this.state =
        {
            tabCaisse
           
        }
    }


    render() {
        return <React.Fragment>
          
           <div className='plateauMonnaie'>
        <div className='jeuMonnaie'>
            <div className='persoMonnaie'>
                <img className='imResponsive margeDroit' src={pers1} alt="personnage"></img>
            </div>
            <div className='reponseMonnaie'>
                <div className='texteMonnaie'>
                <div>Bonjour, je viens de faire le plein pour</div>
                <p className='fontMoyenne'>5,98 €</p>
                <div>Voici un billet de</div>
                <p className='fontMoyenne'>100 €</p>
                </div>  
            </div>
        </div>
        <div>La caisse enregistreuse</div>
        <div className='caisseMonnaie'>
     <Caisse tabPiece={this.state.tabCaisse}> </Caisse>
     
     </div><div  className='margeEcran'><Button type="primary" className="margeDroit" onClick={this.rendre}>Rendre la monnaie</Button ><Button type="primary" onClick={this.recommencer}>Recommencer</Button></div>
           <div>Rendu monnaie</div>
               
           </div>

        </React.Fragment>

    }

}