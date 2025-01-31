import React, { Component } from 'react';
import pers1 from '../../../images/pers1.png';
import pers2 from '../../../images/pers2.png'
import pers3 from '../../../images/pers3.png'
import Caisse from './Caisse';
import { Button } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

export default class JeuMonnaie extends Component {

    constructor(props) {
        super(props);

        let tabCaisse = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
        let tabRendu = [];
        this.noPartie = 0; 
        this.billet = 0;
        this.plein = 0;
        let message = this.construireTexteJeu();
        this.tabPerso = [pers1, pers2, pers3]
        this.fin = false;
        this.state =
        {
            tabCaisse,
            tabRendu,
            message,
            perso : this.tabPerso[0],
            afficheResultat : false,
            score : 0
        }
    }


    construireTexteJeu()
    {
    
        if (this.noPartie <= 1)
        {
            this.plein =  (Math.random() * (10 - 1) + 3).toFixed(2);
            this.billet = 20;
        }
        if (this.noPartie == 2 || this.noPartie == 3)
            {
                this.plein =  (Math.random() * (30 - 1) + 3).toFixed(2);
                this.billet = 50;
            }
            if (this.noPartie > 3)
                {
                    this.plein =  (Math.random() * (50 - 1) + 3).toFixed(2);
                    this.billet = 100;
                }

        return "<div>Bonjour, je viens de recharger ma voiture pour</div><p className='fontMoyenne'>" + this.plein + " €</p><div>Voici un billet de</div><p className='fontMoyenne'>" + this.billet + " €</p>"
    }

    construireTexteFin(resultat, difference)
    {
      
        if (resultat)
        {
            let ajoutScore = 20;
            if (this.noPartie > 3) ajoutScore = 30;

            this.setState({score : this.state.score + ajoutScore})
             return "<div>Merci</div><p className='fontMoyenne'>Bonne journée</p>"
        }
        else 
        { 
            this.setState({score : this.state.score > 10 ? this.state.score - 10 : 0})
         
            if (difference < 0)
            {
                return "<div>Vous vous êtes trompé.</div><p>Comme je suis honnête, je vous rends les " +  Math.abs(difference) + " € en trop.</p>"
            }
            else
            {
                return "<div>Vous vous êtes trompé.</div><p>Il manque " + Math.abs(difference) + " €.</p><p>Au revoir, je ne reviendrai plus jamais dans votre station-service.</p>"
            }
        }
    }
    clicPiece = (id) =>
    {
        if (this.fin) return;
        let nouveauTabRendu = [...this.state.tabRendu];
        nouveauTabRendu.push(this.state.tabCaisse[id]);

        this.setState({tabRendu: nouveauTabRendu});
    }

    finTimer = () => {
     
        this.setState({afficheResultat : true});
    }


    recommencer = () =>
    {
        if (this.fin) return;
        let nouveauTabRendu = [];
        this.setState({tabRendu: nouveauTabRendu});
    }

    rendre = () =>
        {
            if (this.fin) return;
            this.fin = true;
            let sum = this.state.tabRendu.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        
            let resultat = false;
            if ((Math.round(sum * 100) / 100) === (Math.round((this.billet - this.plein) * 100) / 100))
            {
               resultat = true;
            
            }
            let difference = (Math.round((this.billet - this.plein - sum) * 100) / 100);
            let fin = this.construireTexteFin(resultat, difference);
            this.setState({message : fin});
            window.setTimeout( () => 
                {   this.fin = false;
                    this.noPartie++;
                    let perso = this.tabPerso[this.noPartie % 3];
                
                    let message = this.construireTexteJeu();
                    let nouveauTabRendu = [];
                
                    this.setState({message,
                        tabRendu: nouveauTabRendu,
                        perso
                    });
                   
                }, resultat ? 1000 : 4000);
            
        }


    render() {
        return <React.Fragment>
            <Helmet>

            <meta name="description" content="Améliorez votre rapidité en calcul mental avec notre jeu de rendu de monnaie ! Testez vos réflexes et devenez un expert en mathématiques."></meta>
            <title>Rendu de Monnaie - Jeu de Calcul Mental</title>
            </Helmet>
           {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitessemonnaie'></Resultat>:
           <div className='plateauMonnaie'>
        <div className='jeuMonnaie'>
            <div className='persoMonnaie'>
                <img className='imResponsive' src={this.state.perso} alt="personnage"></img>
            </div>
            <div className='reponseMonnaie'>
                <div className='texteMonnaie' dangerouslySetInnerHTML={{ __html: this.state.message }}>
                </div>  
            </div>
        </div>


        <div>La caisse enregistreuse</div>
        <div className='caisseMonnaie'>
     <Caisse type={0} tabPiece={this.state.tabCaisse} clicPiece={this.clicPiece}> </Caisse>
     
     </div><div  className='margeEcran'><Button type="primary" className="margeDroit" onClick={this.rendre}>Rendre la monnaie</Button ><Button type="primary" onClick={this.recommencer}>Recommencer</Button></div>
   
           <div>Rendu monnaie</div>
           <div className='noInteractionMonnaie'>
           <Caisse type={100} tabPiece={this.state.tabRendu}> </Caisse>
           </div>
  <div className='centre'>Score : {this.state.score}</div>
     <div className="centre"><CompteRebours finTimer={this.finTimer} temps={60}></CompteRebours></div>
           </div>
    }
        </React.Fragment>

    }

}