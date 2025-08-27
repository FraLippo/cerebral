import React, { Component } from 'react';
import { message } from 'antd';
import { creerQuestion } from './Logique';
import Resultat from '../commun/Resultat.js';
import CompteRebours from '../commun/CompteRebours';

export default class JeuDoigt extends Component {
    constructor(props) {
        super(props);
        this.questionEnCours = null;
        this.noQuestion = -1;
        this.state = {
            mouseX: 0,
            mouseY: 0,
            enJeu: false,
            compteARebours: 3,
            jeuCommence: false,
            question: '',
            messageErreur: '',
            nombreErreur: 0,
            bonneReponse: 0,
            finJeu: false
        };

        this.erreur = false;
        this.score = 0;
        this.rayon = 80;
        this.vitesseX = 1;
        this.vitesseY = 1;
        this.distance = 0;

        this.canvasRef = React.createRef();
        this.animationFrame = null;
        this.interval = null; // Ajouter cette ligne

    }

    demarrerCompteARebours = () => {
        const canvas = this.canvasRef.current;
        this.x = canvas.width / 2;
        this.y = canvas.height / 4;
        this.dessiner();
        this.interval = setInterval(() => {
            this.setState(prev => ({
                compteARebours: prev.compteARebours - 1
            }), () => {
                if (this.state.compteARebours === 0) {
                    clearInterval(this.interval);
                    this.setState({ jeuCommence: true}, () => this.demarrerJeu());
                }
            });
        }, 1000);
    }

    gestionClicsOuEspace() {
        if (this.questionEnCours.resultat) {
            this.erreur = true;
            cancelAnimationFrame(this.animationFrame);
            if (!this.estFinErreur()) {
                this.setState({
                    enJeu: false,
                    messageErreur: "Il ne fallait pas appuyer sur espace ou sur le bouton bleu."
                }, () => this.nouveauDepart())
            }
        }
        else {
            this.ajouterBonneReponse();
            this.distance = 0;
            this.changerQuestion();
        }

    }

    clicDoigt = () => {
        this.gestionClicsOuEspace();
    }

    handleKeyDown = (event) => {
        if (event.code === "Space" || event.key === " ") {

            event.preventDefault(); // Empêche le scroll par défaut

            this.gestionClicsOuEspace();

        }
    };

    testerQuestion = () => {
        return this.questionEnCours.resultat;

    }
    changerQuestion = () => {

        this.questionEnCours = creerQuestion();
        this.setState({
            question: this.questionEnCours.msg
        })



    }
    estFinErreur = () => {

        if (this.state.nombreErreur + 1 === 5) {
            this.finJeu();
            this.setState({
                finJeu: true
            })
            return true;
        } else {
            this.setState({
                nombreErreur: this.state.nombreErreur + 1
            })
             this.score = 0;
            return false;
        }
    }
    ajouterBonneReponse = () => {
        if (this.state.bonneReponse + 1 === 12) {
            this.finJeu();
            this.setState({
                finJeu: true
            })
        } else {
            this.score += 10;
            this.setState({
                bonneReponse: this.state.bonneReponse + 1
            })
        }
    }
    finJeu = () => {
        if (this.interval) {
            clearInterval(this.interval);

        }
        const canvas = this.canvasRef.current;

        canvas.removeEventListener('mousemove', this.suivreSouris);
        canvas.removeEventListener('touchmove', this.suivreDoigt, { passive: false });
        window.removeEventListener("keydown", this.handleKeyDown);
        cancelAnimationFrame(this.animationFrame);

    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        canvas.addEventListener('mousemove', this.suivreSouris);
        canvas.addEventListener('touchmove', this.suivreDoigt, { passive: false });

        window.addEventListener("keydown", this.handleKeyDown);
        // Démarrer le compte à rebours
        this.demarrerCompteARebours();

    }

    componentWillUnmount() {

        this.finJeu();
    }


    suivreSouris = (e) => {
        e.preventDefault();

        const rect = this.canvasRef.current.getBoundingClientRect();
        this.setState({
            mouseX: e.clientX - rect.left,
            mouseY: e.clientY - rect.top
        });
    }



    suivreDoigt = (e) => {
        e.preventDefault();
        const rect = this.canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        this.setState({
            mouseX: touch.clientX - rect.left,
            mouseY: touch.clientY - rect.top
        });
    }

    demarrerJeu = () => {
        this.changerQuestion();
        const canvas = this.canvasRef.current;

        this.x = canvas.width / 2;
        this.y = canvas.height / 4;

        this.setState({ enJeu: true }, this.boucleJeu);
    }

    boucleJeu = () => {

        this.mettreAJourPosition();
        this.dessiner();

        if (this.state.enJeu && !this.erreur) {
            this.animationFrame = requestAnimationFrame(this.boucleJeu);
        }
    }

    nouveauDepart = () => {
   
        this.distance = 0;
        this.erreur = false;
        this.setState({
            question: '',
            mouseX: 0,
            mouseY: 0,
            enJeu: false,
            compteARebours: 3,
            jeuCommence: false,
       
        }, this.demarrerCompteARebours)

    }


    mettreAJourPosition = () => {
        const canvas = this.canvasRef.current;

        // Mise à jour de la position
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        this.distance += (Math.abs(this.vitesseX) + Math.abs(this.vitesseY));
        // Rebonds sur les bords
        if (this.x <= this.rayon || this.x >= canvas.width - this.rayon) {
            this.vitesseX = -this.vitesseX * (0.8 + Math.random() * 0.4);
            this.x = this.x <= this.rayon ? this.rayon : canvas.width - this.rayon;
        }
        if (this.y <= this.rayon || this.y >= canvas.height - this.rayon) {
            this.vitesseY = -this.vitesseY * (0.8 + Math.random() * 0.4);
            this.y = this.y <= this.rayon ? this.rayon : canvas.height - this.rayon;
        }
        let resultatQuestion = true;

        if (this.distance > 500) {
            resultatQuestion = this.testerQuestion();
            if (resultatQuestion) {
                this.changerQuestion();
                this.ajouterBonneReponse();
            }
            this.distance = 0;
        }
        // Vérifier si la souris est hors du cercle
        const distance = Math.sqrt(
            Math.pow(this.state.mouseX - this.x, 2) +
            Math.pow(this.state.mouseY - this.y, 2)
        );
        const rayonDetection = this.rayon * 1.1;
        if (distance > rayonDetection || !resultatQuestion) {
          
            cancelAnimationFrame(this.animationFrame);
            this.erreur = true;
            if (!this.estFinErreur()) {
                this.setState(state => ({
                 
                    enJeu: false,
                    messageErreur: !resultatQuestion ? "Tu n'a pas appuyé sur espace ou sur le bouton bleu." : "Tu es sorti du cercle."
                }), () => { this.nouveauDepart() });
               
            }




        }
    }


    dessiner = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner le cercle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2);
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
        ctx.closePath();
    }

    finTimer = () => {
        this.finJeu();
        this.setState({
            finJeu: true
        });
    }
    render() {
        return (<React.Fragment>
            {this.state.finJeu ? <Resultat score={this.score} typeExo='vitessemulti'></Resultat> :
                <div>
                    <div className='centre'>
                        <div>Erreurs : {this.state.nombreErreur} / 5
                            <span className="margeGauche10">Bonnes réponses : {this.state.bonneReponse} / 12</span></div>
                        <div className="margeMenu">Tape sur le bouton bleu (smartphone) ou tape sur la barre d'espace (PC) si l'affirmation est FAUSSE.</div>
                        <div className="questionDoigt" onPointerDown={this.clicDoigt}><b>{this.state.question}</b></div>

                    </div  >
                    <div style={{ position: 'relative' }}>
                        {!this.state.jeuCommence &&


                            <div className="compte-rebours" >
                                <p className='rougeV' ><b>{this.state.messageErreur}</b></p>
                                <p>Place ton doigt ou la souris au centre du cercle et suis les mouvements du cercle.</p>
                                <div>Le jeu commence dans</div>
                                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{this.state.compteARebours}</div>
                            </div>
                        }
                        <div>
                            <canvas className="canvasDoigt"  ref={this.canvasRef}></canvas>
                                

                        </div>
                    </div>
                    <div className="centre marge10"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours></div>
                    <div className='centre titreJeu'>Multitâche</div>
                </div>}
        </React.Fragment>);
    }
}
