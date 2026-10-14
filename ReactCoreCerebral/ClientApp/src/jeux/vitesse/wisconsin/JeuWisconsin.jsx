import React, { Component } from 'react';
import Card from './Card';
import Resultat from "../commun/Resultat";
import CompteRebours from "../commun/CompteRebours";
import { Helmet } from "react-helmet";

export default class JeuWisconsin extends Component {
    constructor() {
        super();
        this.couleurs = ["#E53935", "#43A047", "#1E88E5", "#FDD835"];
        this.formes = ["circle", "cross", "triangle", "star"];
        this.nombres = [1, 2, 3, 4]
        this.fin = false;
        this.nbErreurs = 0;

        let { carteReference, tirage } = this.nouveauTirage();

        this.caracteristique = '';
        this.nbTiragesAvantChangement = this.nombreTirages();
      
        this.nbTirages = 0;
        this.caracteristique = this.tirageCaracteristique();
       
        this.state = {
            message: '',
            score: 0,
            carteReference,
            tirage,
            afficheResultat: false
        }

    }

    nombreTirages = () => {
        return Math.floor(Math.random() * 5) + 2;
    }

    nouveauTirage() {
        let carteReference = this.tirageAleatoireReference();
        let tirage = this.tirageCartes(carteReference);
        return { carteReference, tirage }

    }

    tirageCartes = (carteReference) => {
        let tirage = [];
        let couleurs = [...this.couleurs];
        let formes = [...this.formes];
        let nombres = [...this.nombres];

        let i = 0;
        do {
            const c = Math.floor(Math.random() * couleurs.length);
            const f = Math.floor(Math.random() * formes.length);
            const n = Math.floor(Math.random() * nombres.length);
            if (!(
                carteReference.couleur === couleurs[c] &&
                carteReference.forme === formes[f] &&
                carteReference.nombre === nombres[n]
            )) {
                i++;
                tirage.push({ couleur: couleurs[c], forme: formes[f], nombre: nombres[n] });
                couleurs.splice(c, 1);
                formes.splice(f, 1);
                nombres.splice(n, 1);
            } else if (couleurs.length === 1) {
                couleurs = [...this.couleurs];
                formes = [...this.formes];
                nombres = [...this.nombres];
                tirage = [];
                i = 0;
            }


        } while (i < 4)
        return tirage;
    }


    tirageAleatoireReference = () => {
        let couleurs = [...this.couleurs];
        let formes = [...this.formes];
        let nombres = [...this.nombres];

        const c = Math.floor(Math.random() * 4);
        const f = Math.floor(Math.random() * 4);
        const n = Math.floor(Math.random() * 4);
        return { couleur: couleurs[c], forme: formes[f], nombre: nombres[n] }
    }

    tirageCaracteristique = () => {
        let c = 0;
        const caracteristiques = ['couleur', 'forme', 'nombre'];
        do {
            c = Math.floor(Math.random() * 3);
        } while (this.caracteristique === caracteristiques[c])
        return caracteristiques[c];
    }

    clicCarte = (carte) => {
        if (this.fin) return;
        this.fin = true;
   
        let message = '';
        let score = this.state.score;
        if (carte[this.caracteristique] === this.state.carteReference[this.caracteristique]) {
            message = 'CORRECT';
            this.nbErreurs = 0;
            score += 7;
            this.nbTirages++;
        }
        else {
            message = 'INCORRECT';
            this.nbErreurs++;
            if (this.nbErreurs >= 3) {
                score = score >= 15 ? score - 15 : 0;
            }
        }
        let { carteReference, tirage } = this.nouveauTirage();
        this.setState({
            message,
            score,
        });
        if (this.nbTirages === this.nbTiragesAvantChangement) {
            this.nbTiragesAvantChangement = this.nombreTirages();
            this.nbTirages = 0;
            this.caracteristique = this.tirageCaracteristique();
         
        }
        window.setTimeout(() => {this.fin = false; this.setState({ message: '', tirage, carteReference }) }, 1000)
    }

finTimer = () =>
    {
        this.setState({
            afficheResultat: true});
    }

    render() {
        return (<React.Fragment>
               <Helmet>
<title>Test du Wisconsin (WCST) gratuit - Évaluez votre flexibilité cognitive</title> 
<meta name="description" content="Passez gratuitement le test du Wisconsin (Wisconsin Card Sorting Test). Évaluez votre flexibilité cognitive, votre capacité d'adaptation et vos fonctions exécutives grâce à ce test interactif en ligne."/>
            </Helmet>
             {this.state.afficheResultat ?  <Resultat score={this.state.score} typeExo='vitessewisconsin'></Resultat>  :
            <div className='plateauForme'>
                <div>
                    <Card

                        couleur={this.state.carteReference.couleur}
                        forme={this.state.carteReference.forme}
                        nombre={this.state.carteReference.nombre}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 12,
                        marginTop: '10px'
                    }}
                >

                    {this.state.tirage.map((carte, i) => (

                        <Card
                            clicCarte={this.clicCarte}
                            key={i}
                            couleur={carte.couleur}
                            forme={carte.forme}
                            nombre={carte.nombre}
                        />

                    ))}

                </div>
            <div className="marge20"> <CompteRebours temps={45} finTimer={this.finTimer}></CompteRebours></div>
            <div style={{height: "60px"}}> 
                <div className='fontMoyenne centre'>Score {this.state.score}</div>
                <div className='fontMoyenne centre'>{this.state.message}</div>
                </div>
                <h1 className="couleurTitre centre">Le test du Wisconsin</h1>
                <p>Trouve la relation qui unit la carte du haut avec une des cartes en bas. Trois cas sont possibles : la même forme, la même couleur ou le même nombre d'éléments. La relation change au cours de la partie. Tu es obligé d'avoir des réponses incorrectes pour trouver la relation correcte.</p>
            </div>}
            </React.Fragment>
        );
    }
}
