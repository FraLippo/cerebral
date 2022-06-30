import React, { Component } from 'react';
import {withRouter,Redirect } from 'react-router-dom';
import Operations from './Operations';
import Donnees from './Donnees';
import Carte from './Carte';
import Solution from './Solution';
import {message} from 'antd';
import LogiqueCompte from './LogiqueCompte';
import '../../style/jeux.css';
import ElementSolution from './ElementSolution';
import dicoMessage from './Message';
import { Button} from 'antd';
import ResultatCommun from '../../components/commun/ResultatCommun';
import FinEtape from '../concours/FinEtape';

import {Helmet } from 'react-helmet';
import {addGame} from '../../components/commun/localStorage';
import intl from 'react-intl-universal';


class JeuxCompte extends Component {

    constructor(props)
    {
        super(props);
        this.id = parseInt(this.props.match.params.id);
        this.stop = false;
        this.donnees = new Donnees(this.id);
        if (isNaN(this.id) || this.donnees.donnees === undefined) {
            this.stop = true;
        }
        else
        {
        let cartes= this.donnees.obtenirCartes();
        this.resultat = this.donnees.obtenirResultat();
        this.nbCartesRestantes = cartes.length;
        cartes = cartes.map(element =>  ({valeur : element,affichage: true}));
        this.state ={
            tableauResultats : [],
            cartes : cartes,
            finJeu : false
        };
        this.dureeJeu = Date.now();
        this.perdu = false;
        this.logiqueCompte = new LogiqueCompte();
        message.config({
            maxCount: 1,
          });

          addGame('jeuxCompte', this.id);
        }
    }

   

    ajouterEgalResultat = (nouveauTabResultat) =>
    {
        let retour = LogiqueCompte.ajoutEgal(nouveauTabResultat);
       
        if (retour === -1)
        {
            this.message(intl.get(dicoMessage.get('division')));
        }
        if (retour === -2)
        {
            this.message(intl.get(dicoMessage.get('soustraction')));
        }
        if (retour === -3)
        {
            this.message(intl.get(dicoMessage.get('grand')));
        }

        if (retour > 0)
        {
            this.nbCartesRestantes++;
            if (retour === this.resultat)
            {
                this.messageFin(intl.get(dicoMessage.get('gagne')));
                this.dureeJeu = Date.now() - this.dureeJeu;
            }
        }
        if (retour === 0 && this.nbCartesRestantes ===0)
        {
            this.message(intl.get(dicoMessage.get('perdu')));
        }        
    }

    clickCarte = (id) =>
    {
        if (!LogiqueCompte.estBonnePlaceCarte(this.state.tableauResultats.length))
        {
            this.message(intl.get(dicoMessage.get('erreur')));
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
       
        this.ajouterEgalResultat(nouveauTabResultat);
        
        this.setState({
            tableauResultats : nouveauTabResultat,
            cartes: tabAffichage
        });
      
    }

    clickResultat = (carteResultat) =>
    {      
        if (!LogiqueCompte.estBonnePlaceCarte(this.state.tableauResultats.length))
        {
            this.message(intl.get(dicoMessage.get('erreur')));
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
        this.ajouterEgalResultat(nouveauTabResultat);
        

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
        message.success(contenu, 1.5, () =>{
            this.setState({
                finJeu: true
             }); 
             
        })
    }

    clickOperation = (type) =>
    {
        if (!LogiqueCompte.estBonnePlaceOperation(this.state.tableauResultats.length))
        {
            this.message(intl.get(dicoMessage.get('erreur')));
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

    clickAbandonner = () =>
    {    this.dureeJeu = 0;
        this.perdu = true;      
        this.setState({
           finJeu: true
        });   
    }



    render()
    {
        if (this.stop) return (<Redirect to="/"></Redirect>);

        return <div>
            <Helmet>
          <title>{intl.get('META_COMPTE')}</title>
          <meta name="description" content={intl.get('META_COMPTE')} />
          <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxCompte/${this.id}`}/>
          <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-numbers/${this.id}`} />
          
                 </Helmet>
            
            
           
   <div>
   {!this.state.finJeu ?   <div className="grilleComptePrincipal">
            <div className="grilleCartes">{this.state.cartes.map((element,i) => <Carte affichage={element.affichage} key={i} clickCarte={this.clickCarte} nombre={element.valeur} position={i}></Carte>)}</div>
            <div className="grilleResultat"><div className="resultat curseur"><b className="marginRight">{intl.get('COMPTE_RESULTAT')}</b><span className="couleurResultat">{this.resultat}</span></div></div>
            <Operations clickOperation={this.clickOperation}></Operations>

         
      
            <div className="boutonsCompte espaceHautBas">
             <Button className="reset" type="primary" onClick={this.clickRecommencer}>{intl.get('BOUTON_RECOMMENCER')}</Button>
             <Button type="danger" onClick={this.clickAbandonner}>{intl.get('BOUTON_SOLUTION')}</Button>
             </div>
            
            
            <div className="grilleCalcul">{this.state.tableauResultats.map(
                carteResultat =><ElementSolution key={carteResultat.position} clickResultat={this.clickResultat} carteResultat={carteResultat}></ElementSolution>)}
                </div>
                </div>
                :
               <React.Fragment>{this.perdu && <div className="solutionCompte"><Solution solution={this.donnees.obtenirSolution()} ></Solution></div>}
           <div className="resultatCompte">{this.donnees.concours ? <FinEtape donneesJeu={this.donnees.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun  dureeMax={50} perdu={this.perdu} prochainJeu={this.donnees.obtenirProchainJeu(this.id)} type='compte' idTest={this.id} dureeJeu={this.dureeJeu}></ResultatCommun>}</div></React.Fragment>
            }
        
  
        
        </div>
        <div className="footer"></div>
        </div>
    }
}

export default withRouter(JeuxCompte);