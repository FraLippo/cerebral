import React, { Component } from 'react';
import { Button } from 'antd';
import Icone from './Icone';
import Logique from './Logique'
import '../../../style/jeux.css';
import withRouter from '../../../components/commun/withRouter';

import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';
import Resultat from '../commun/Resultat';



class JeuPaire extends Component {

    constructor(props) {
        super(props);
        this.idTest = parseInt(props.params.id);

        this.logique = new Logique();
       

            this.elementEnCours = 0;
            let numero = this.logique.tirerNombre(2);
            let numJeu = 0;
          this.precedent = -1;
            this.state =
            {  numero,
                afficheResultat: false,
                score : 0,
                debut : true, 
                reponse : "",
                numJeu
            }
   
        

    }
    suivant = () => {
        let numJeu = this.state.numJeu + 1;
        let numero = 2;
        this.precedent = this.state.numero;
        if (numJeu < 8)
        {
           numero = this.logique.tirerNombre(1);
        }
        else if (numJeu < 20)
        {
            numero = this.logique.tirerNombre(2);   
        }
        else
        {
            numero = this.logique.tirerNombre(3);
        }
        this.setState({numero, numJeu});
    }

    clickBoutonMeme = () => {
        if (this.precedent === this.state.numero)
        {
            this.setState({score : this.state.score + 1,
            reponse : "Correct"});
        }
        else
        {
            this.setState({score : this.state.score - 2,
            reponse : "Incorrect"});
        }
        this.suivant();
    }

    clickBoutonDifferent = () => {
        if (this.precedent !== this.state.numero)
        {
            this.setState({score : this.state.score + 1,
            reponse : "Correct"});
        }
        else
        {
            this.setState({score : this.state.score - 3, 
            reponse : "Incorrect"});
        }
        this.suivant();
    }   


    clickBoutonSuivant = () => {
        this.suivant();
        this.setState({debut : false});
    }

    finTimer = () => {
        this.setState({afficheResultat : true});
    }
  
    render() {
        return <div>
            <Helmet>
                <title>Trouver les paires</title>
                <meta name="description" content="Dans ce jeu simple et amusant vous devez arriver à mémoriser deux images consécutivement et déterminer si elles sont semblables." />
               
            </Helmet>
            {this.state.afficheResultat ?  <Resultat score={this.state.score} typeExo='vitessepaire'></Resultat>  :
               <React.Fragment><h1 className="couleurTitre">Connaitre le précédent</h1>
               <div className="centre"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours></div>
                <div className="gridSuite"><Icone numJeu={this.state.numJeu}  numero={this.state.numero}></Icone>
                   {this.state.debut ? <React.Fragment> <div className="boutonSuite">
                        <Button  className="fontMoyenne" size="large" type="primary" onClick={this.clickBoutonSuivant}>Suivant</Button>
                     </div> 
                      <div className="texteSuite"><p>Mémorise l'animal puis clique sur le bouton "Suivant".</p>
                      </div> </React.Fragment> :
                     <React.Fragment>
                    <div className="boutonSuite">
                        <Button  className="fontMoyenne" size="large" type="primary" onClick={this.clickBoutonMeme}>Le même</Button>
                        <Button className="fontMoyenne margeGauche10" size="large"  type="primary" onClick={this.clickBoutonDifferent}>Différent</Button>
                    </div>
                    <div className="texteSuite"><p>Clique sur le bouton "Le même" si l'animal est le même que l'animal précédent. Clique sur "Différent" si les deux animaux sont différents.</p>
                    </div>
                    </React.Fragment>}
                    
                    </div>     <div className={"fontMoyenne " + (this.state.reponse === "Correct" ? "bleuPaire" : "rougePaire") }>{this.state.reponse}</div></React.Fragment>} </div>
    }
}


export default withRouter(JeuPaire);