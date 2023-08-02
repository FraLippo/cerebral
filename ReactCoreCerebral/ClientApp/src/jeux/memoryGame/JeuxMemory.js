import React, { Component } from 'react';
import withRouter from '../../components/commun/withRouter';
import Logique from './Logique';
import Grille from './Grille';
import { message } from 'antd';
import ResultatCommun from '../../components/commun/ResultatCommun';
import intl from 'react-intl-universal';
import { Helmet } from 'react-helmet';
import FinEtape from '../concours/FinEtape';
import { addGame } from '../../components/commun/localStorage';




class JeuxMemoryGame extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(props.params.id);
       
        this.logique = new Logique(this.id);
      
        let vue = this.logique.donnees.info.vue;
        let nbFaute = this.logique.donnees.info.erreur;
        this.taille = this.logique.donnees.info.taille;
        let tableauAleatoire = this.construireTableau();
        let tableau = this.initTableau(tableauAleatoire);
        if (vue === 0){this.ModifierVueLigne(tableau, 'O')};
        this.ligneEnCours = -1;
        this.fin = false;
        this.perdu = false;
        
        this.no1 = -1;
        this.no2 = -1;
        this.double = 0;
        this.dureeJeu = Date.now();
       
        
        this.state = {
            tableau,
            vue,
            nbFaute,
            fin : false
        };
  
        addGame('jeuxmemorygame', this.id);
     
    

    }

    construireTableau() {
        let tableauTrie = [];
        let tableauAleatoire = [];
        let depart = 0;
        let departAleatoire = Math.floor(Math.random() * (this.taille+1));
        if(this.taille <4) depart = departAleatoire;
        for (let index = 0; index < (this.taille * this.taille) / 2; index++) {
            tableauTrie.push({ contenu: '/images/memory/im' + (index + depart) +'.png', affiche: false, trouve: false });
            tableauTrie.push({ contenu: '/images/memory/im' + (index + depart) +'.png', affiche: false, trouve: false });
        }
        for (let index = 0; index < this.taille * this.taille; index++) {
            let nombre = Math.floor(Math.random() * tableauTrie.length);
            tableauAleatoire.push(tableauTrie[nombre]);
            tableauTrie.splice(nombre, 1);


        }
        return tableauAleatoire;

    }

    initTableau(tableauDepart) {
        let nouveauTableau = [];
        for (let index = 0; index < this.taille; index++) {
            nouveauTableau.push({ contenu: 'X', affiche: false, trouve: false })
        }
        nouveauTableau.push({ contenu: '-1', affiche: false, trouve: false });

        for (let index = 1; index <= this.taille; index++) {
            let tableauAjout = tableauDepart.splice(0, this.taille);
            nouveauTableau = [...nouveauTableau, ...tableauAjout, { contenu: 'X', affiche: false, trouve: false }];
        }

        return nouveauTableau;
    }

    miseAJourCol = (tableau, no, affiche) => {
        for (let index = no + this.taille + 1; index < (this.taille + 1) * (this.taille + 1); index += this.taille + 1) {
            if (!tableau[index].trouve) {
                tableau[index].affiche = affiche;
            }

        }
    }
    miseAJourLigne = (tableau, no, affiche) => {
        let debut = Math.floor(no / (this.taille + 1));
        for (let index = 0; index < this.taille; index++) {
            if (!tableau[debut * (this.taille + 1) + index].trouve) {
                tableau[debut * (this.taille + 1) + index].affiche = affiche;
            }

        }
    }


    finLigne = () => {
        let tableauModifie = [...this.state.tableau];
        if (this.state.vue === 0) {
            this.ModifierVueLigne(tableauModifie, 'O');
        }
        else
        {
            tableauModifie[this.ligneEnCours].contenu = 'X';
        }

        if (this.ligneEnCours < this.taille) {
            //col
            this.miseAJourCol(tableauModifie, this.ligneEnCours, false);
        }
        else {
            //ligne
            this.miseAJourLigne(tableauModifie, this.ligneEnCours, false);
        }
        this.setState({ tableau: tableauModifie });
        this.ligneEnCours = -1;

    }
    finCase = () => {
        if (this.state.nbFaute === 0) {
            this.fin = true;
            this.perdu = true;
            message.error('Vous avez perdu', this.finJeu);
        }
        let tableauModifie = [...this.state.tableau];
        tableauModifie[this.no1].affiche = false;
        tableauModifie[this.no2].affiche = false;
        this.no1 = -1;
        this.no2 = -1;
        this.setState({ tableau: tableauModifie });

    }
    ModifierVueLigne = (tableau, type) => {
        for (let index = 0; index < this.taille; index++) {
            tableau[index].contenu = type;
            tableau[(this.taille+1 + ((this.taille+1)* (index+1)))-1].contenu = type;
            
        }
    }

    finJeu = () =>
    {
        this.dureeJeu = Date.now() - this.dureeJeu;
        this.setState({fin: this.fin})
    }

    clickNumero = (no) => {
        if (this.ligneEnCours !== -1 && !this.fin) return;
        let nbFaute = this.state.nbFaute;
        let vue = this.state.vue;
        let tableauModifie = [...this.state.tableau];

        if (tableauModifie[no].contenu === 'X') {
          if (this.no1 === -1 && this.no2 ===-1)
          {
                tableauModifie[no].contenu = 'O';

                if (no < this.taille) {
                    //col
                    this.miseAJourCol(tableauModifie, no, true);
                }
                else {
                    //ligne
                    this.miseAJourLigne(tableauModifie, no, true);
                }
                this.ligneEnCours = no;
                this.double = 0;
                setTimeout(this.finLigne, 2000);
                vue--;
            }
            
        }
        else {
            if (!tableauModifie[no].affiche && (this.no1 === -1 || this.no2 ===-1) && tableauModifie[no].contenu !== 'O') {
                if (this.no1 === -1) {
                    tableauModifie[no].affiche = true;
                    this.no1 = no;
                }
                else {
                    tableauModifie[no].affiche = true;
                    this.no2 = no;
                    if (tableauModifie[this.no1].contenu === tableauModifie[this.no2].contenu) {
                        tableauModifie[this.no1].trouve = true;
                        tableauModifie[this.no2].trouve = true;
                        this.no1 = -1;
                        this.no2 = -1;
                        this.double++;
                      
                        if (tableauModifie.find(x => !x.trouve && x.contenu !== '-1' && x.contenu !== 'O' && x.contenu !== 'X') === undefined) {
                            this.fin = true;
                            message.success('Bravo ! Vous avez gagné', this.finJeu)
                        }  
                        if (this.double >= 2 && !this.fin)
                        {
                            vue += this.double-1;
                            if (vue >= 1) this.ModifierVueLigne(tableauModifie, 'X');
                            //this.double = 0;
                            message.success("+ " + (this.double-1) +" vue");
                        }

                    }
                    else {
                        this.double = 0;
                        setTimeout(this.finCase, 2000);
                        nbFaute--;
                    }
                }
            }


        }
        this.setState({ tableau: tableauModifie, vue, nbFaute });
    }

    render() {
      
        return <div>
              <Helmet>
                <title>Le jeu du memory gratuit en ligne</title>
                <meta name="description" content="Le classique jeu de Memory dans lequel vous devez former des paires pour les faire disparaître de l'aire de jeu. Un jeu simple et amusant pour les adultes ou pour les enfants." />
            </Helmet>
            <h1>Jeu de Memory</h1>
            <div>Retrouvez toutes les paires d'éléments identiques</div>
            {this.state.fin ?this.logique.concours ? <FinEtape donneesJeu={this.logique.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun type='memoryGame' perdu={this.perdu} prochainJeu={this.logique.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={50 * this.taille}></ResultatCommun>
            :<div className="jeuMemory">

                <div className="grilleMemory"><Grille grille={this.state.tableau} taille={this.taille} clickNumero={this.clickNumero}></Grille></div>
                <div className="infoMemory"><p><b>Nombre de vues :</b></p>
             
                    <p>{this.state.vue}</p>
                    <p>Cliquez sur un rond bleu pour voir une ligne et repérer les paires.</p>
                    <p><b>{this.state.nbFaute-1 <= 1 ? "Erreur permise" : "Erreurs permises"}</b></p>
                    {this.state.nbFaute-1 < 0 ?<p>0</p>: <p>{this.state.nbFaute-1}</p>}
                    {this.taille >2 && <p>Trouver plusieurs paires à la suite vous donne des vues supplémentaires.</p>}</div>
            </div>
    }

        </div>
    }
}

export default withRouter(JeuxMemoryGame);