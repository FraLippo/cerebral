import React, { Component } from 'react';
import withRouter from '../../../components/commun/withRouter';
import Operations from './Operations';
import Carte from './Carte';
import {message, Button} from 'antd';
import LogiqueCompte from './LogiqueCompte';
import Resultat from '../commun/Resultat';
import ElementSolution from './ElementSolution';
import Logique from './Logique';
import {Helmet } from 'react-helmet';
import CompteRebours from '../commun/CompteRebours';



class JeuxCompte extends Component {

    constructor(props)
    {
        super(props);
        this.noPartie = 0;
       this.logique = new Logique();


        this.state ={
            tableauResultats : [],
            cartes : [],
            finJeu : false,
            resultat : 0
        };
        this.score = 0;
        this.perdu = false;
        this.logiqueCompte = new LogiqueCompte();
        message.config({
            maxCount: 1,
          });


    
        
    }
 componentDidMount()
 {
    this.genererJeu();
 }
    genererJeu = () =>
    {
        let max = 100 + (Math.floor(this.noPartie/3) * 100);

        this.donnees =  this.logique.generer(max); 
        let cartes= this.donnees.cartes;
        const resultat = this.donnees.resultat;
        this.nbCartesRestantes = cartes.length;
        this.noPartie++;
        cartes = cartes.map(element =>  ({valeur : element,affichage: true}));
     
         this.setState({
             tableauResultats : [],
            cartes : cartes,
            resultat
        });
    }

   

    ajouterResultatTestFin = (nouveauTabResultat) =>
    {
        let retour = LogiqueCompte.ajoutEgal(nouveauTabResultat);
       
        if (retour === -1)
        {
            this.message('Nombre à virgule impossible');
        }
        if (retour === -2)
        {
            this.message('Impossible, le résultat est inférieur à 0');
        }
        if (retour === -3)
        {
            this.message('Impossible, le résultat est trop grand');
        }

        if (retour > 0)
        {
            this.nbCartesRestantes++;
            if (retour === this.state.resultat)
            {
               this.messageFin('Bravo, tu as réussi');
               this.score += 15;
               return true;
              
            }
        }
        if (retour === 0 && this.nbCartesRestantes ===0)
        {
            this.message("Tu n'as pas trouvé le bon résultat.");
        }  
        return false;      
    }

    clickCarte = (id) =>
    {
        if (!LogiqueCompte.estBonnePlaceCarte(this.state.tableauResultats.length))
        {
            this.message('Tu ne peux pas placer un nombre ici.');
            return false;
        }
        this.nbCartesRestantes--;
        let carteResultat = {
            type : "carte",
            valeur : this.state.cartes[id].valeur,
            position : this.state.tableauResultats.length
        };
        
        let tabAffichage = [...this.state.cartes];
        tabAffichage[id].affichage = false;

        let nouveauTabResultat = [...this.state.tableauResultats, carteResultat];
       
       if (this.ajouterResultatTestFin(nouveauTabResultat))
       {
        tabAffichage = tabAffichage.map((() =>  ({valeur : 0,affichage: false})))
          console.log(tabAffichage)
       }
        
        this.setState({
            tableauResultats : nouveauTabResultat,
            cartes: tabAffichage
        });
      
    }

    clickResultat = (carteResultat) =>
    {      
        if (!LogiqueCompte.estBonnePlaceCarte(this.state.tableauResultats.length))
        {
            this.message('Tu ne peux pas placer un nombre ici.');
            return false;
        }
        let nouveauTabResultat = [...this.state.tableauResultats];
        this.nbCartesRestantes--;
        
        let carteResultatNouveau = {
            type : "carte",
            valeur : carteResultat.valeur,
            position : nouveauTabResultat.length
        };
        nouveauTabResultat.push(carteResultatNouveau);
        this.ajouterResultatTestFin(nouveauTabResultat);
        

        this.setState({
            tableauResultats : nouveauTabResultat
        });
        return true;
    }
    message = (contenu) =>
    {
        message.error(contenu,1.2);
    }

    messageFin = (contenu) =>
    {
        message.success(contenu, 1.5,
            () => this.genererJeu()
        );
      

    }

    clickOperation = (type) =>
    {
        if (!LogiqueCompte.estBonnePlaceOperation(this.state.tableauResultats.length))
        {
            this.message('Mauvaise place, action non possible');
            return false;
        }
        let valeur = LogiqueCompte.rechercheOperation(type);
        let operationResultat = {
            type : "operation",
            valeur : valeur,
            position : this.state.tableauResultats.length
        }
       
        this.setState({
            tableauResultats : [...this.state.tableauResultats, operationResultat]
        });
        return true;
    }

    clickRecommencer = () =>
    {      
        let remisetabAffichage =  this.state.cartes.map(element =>  ({valeur : element.valeur,affichage: true}));
        this.nbCartesRestantes = this.state.cartes.length;
        this.setState({
            tableauResultats : [],
            cartes : remisetabAffichage
        });   
    }

    finTimer = () => {
        this.setState({ finJeu: true });
    }
   

    render()
    {

        return <div>
            <Helmet>
          <title>Le compte est bon — Jeu de calcul mental</title>
          <meta name="description" content="Teste ton talent en calcul mental, combine 6 cartes avec les opérateurs + - x ÷ pour atteindre la cible. Prêt à relever le défi ?" />
                </Helmet>
            
            
           
   <div>
   {!this.state.finJeu ?   <div className="grilleComptePrincipal">
            <div className="grilleCartes">{this.state.cartes.map((element,i) => <Carte affichage={element.affichage} key={i} clickCarte={this.clickCarte} nombre={element.valeur} position={i}></Carte>)}</div>
            <div className="grilleResultat"><div className="resultat curseur"><b className="marginRight">Résultat à obtenir</b><span className="couleurResultat">{this.state.resultat}</span></div></div>
            <Operations clickOperation={this.clickOperation}></Operations>

         
      
            <div className="boutonsCompte">
             <Button className="reset" type="primary" onClick={this.clickRecommencer}>Recommencer à 0</Button>          <CompteRebours finTimer={this.finTimer} temps={80}></CompteRebours>
             </div>
     
            
            
            <div className="grilleCalcul">{this.state.tableauResultats.map(
                carteResultat =><ElementSolution key={carteResultat.position} clickResultat={this.clickResultat} carteResultat={carteResultat}></ElementSolution>)}
                </div>
                </div>
                :
              <Resultat score={this.score} typeExo='vitessecompte'></Resultat> 
            }
        
  
        
        </div>
        <div className="footer"></div>
        </div>
    }
}

export default withRouter(JeuxCompte);