import React, { Component } from 'react';
import Logique from './LogiqueLettre';


export default class Dialogue extends Component {

    constructor() {
        super();
        this.state = {
            message: ''
        }
        this.i = 0;
        this.texte = '';

    }

    componentDidMount() {
        if (this.props.etape === 'debut') {

            this.afficheDebut();
        }
        else if (this.props.etape === 'finManche') {
            this.afficheFinManche();
        }
        else if (this.props.etape === 'fin') {
            this.afficheFin();
        }
      
    }

    afficheFinManche = () => {
        let msg1 = '';
        if (this.props.info.nbLettres === 0) {
            msg1 = "Tu n'as pas trouvé de mot.<br>";
        }
        else {
            msg1 = "Tu as trouvé un mot de " + this.props.info.nbLettres + " lettres.<br>";
        }
        this.setState({
            message: msg1

        })
        let msg2 = '';
        if (this.props.info.resultatManche === "victoire") {
            msg2 = "Bravo ! Tu as gagné la manche."
        }
        else if (this.props.info.resultatManche === 'nul') {
            msg2 = "Vous êtes à égalité. Personne ne marque de points."
        }
        else {
            msg2 = "Tu as perdu cette manche."
        }

        setTimeout(() => {

            this.setState({
                message: msg1 + this.props.info.adversaire + " a trouvé le mot " + this.props.info.motAdversaire + " (" + this.props.info.nbLettresAdversaire + " lettres). <br>" + msg2
            }
            )

        }
            , 1500);
    }
    affiche = () => {

        setTimeout(() => {
            if (this.i < this.texte.length) {
                this.setState({
                    message: this.state.message + (this.texte.charAt(this.i) === '@' ? '<br>' : this.texte.charAt(this.i))
                })
                this.i++;
                this.affiche();
            }
        }
            , 50);
    }

    afficheDebut = () =>
        {
            this.texte = "Bienvenue " + this.props.info.prenom + "@ Tu joues contre " + this.props.info.adversaire + ".@ C'est une joueuse " + this.props.info.niveau + ", elle trouve des mots entre " + this.props.info.intervalle + "  lettres.";
            this.affiche();
        }

    afficheFin = () => {
        let msg1 = "C'était la dernière manche.<br>";


        let msg2 = '';
        if (this.props.info.resultatManche === "victoire") {
            msg2 = "Tu as gagné la manche."
        }
        else if (this.props.info.resultatManche === 'nul') {
            msg2 = "Personne ne marque de points dans cette manche."
        }
        else {
            msg2 = "Tu as perdu cette manche."
        }

        this.setState({
            message: msg1 + this.props.info.adversaire + " a trouvé le mot " + this.props.info.motAdversaire + " (" + this.props.info.nbLettresAdversaire + " lettres). <br>" + msg2 + "<br>"
        });
        let msg3 = '';
        if (this.props.info.resultatFinal === "victoire") {
            msg3 = "Bravo ! Tu as gagné la partie."
        }
        else if (this.props.info.resultatFinal === 'nul') {
            msg3 = "Égalité. La partie n'a pas de vainqueur."
        }
        else {
            msg3 = "Tu as perdu cette partie."
        }

        setTimeout(() => {
            this.setState({
                message: this.state.message + "<div class='centre fontMoyenne backVictoire'>" + msg3 + "</div>"
            }
            )
        }
            , 1800);
    }
    render() {
        return <div><div className="textePresentation" dangerouslySetInnerHTML={{ __html: this.state.message }}></div>
    </div>}
}