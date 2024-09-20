import React, { Component } from 'react';
import { Button, message } from 'antd';

const NIVEAU2 = 5;
export default class JeuBonneteau extends Component {
    constructor(props) {
        super(props);

        this.tabContenu = [];


        this.state = {
            flipped: '',
            isSwapping: false,
            carte: '',
            anim1: '',
            anim2: '',
            anim3: '',
            anim4: '',
            flipped1: '',
            flipped2: '',
            flipped3: '',
            flipped4: '',
            contenu1: '',
            contenu2: '',
            contenu3: '',
            contenu4: '',
            niveau: 1,
            etat: 'debut',
            typeNiveau: 2,
            carteATrouver: ''
        };
        this.tabNiveau = [['⚪', '⬜'], ['⚪'], ['⚪']['⚪']];
        this.carteEncours = 0;
        this.animationsCompleted = 0;
        this.tabContenu = [];
        this.niveau = 0;
        this.tabMouv = [['moving-move1-diag-left', '', '', 'moving-move4-up'],
        ['moving-move1-diag-right', 'moving-move2-up', '', ''],
        ['moving-move1-down', '', 'moving-move3-up', ''],
        ['', 'moving-move2-left', '', 'moving-move4-right'],
        ['', 'moving-move2-down', 'moving-move3-diag-right', ''],
        ['', '', 'moving-move3-diag-left', 'moving-move4-down'],
        ];
        // this.tabMouv = [['moving-move1-diag-left-f', '', '', 'moving-move4-up-f'],
        // ['moving-move1-diag-right-f', 'moving-move2-up-f', '', ''],
        // ['moving-move1-down-f', '', 'moving-move3-up-f', ''],
        // ['', 'moving-move2-left-f', '', 'moving-move4-right-f'],
        // ['', 'moving-move2-down-f', 'moving-move3-diag-right-f', ''],
        // ['', '', 'moving-move3-diag-left-f', 'moving-move4-down-f'],
        // ];
        this.nivMouv = 3;
        this.mouvement = this.nivMouv;

    }
    componentDidMount() {
        this.placerPion();
    }
    placerPion() {
        console.log(this.tabNiveau);
        let nbPion = this.tabNiveau[this.niveau].length;

        let tabJeu = ['✖', '✖', '✖', '✖'];

        let i = 0;
        do {
            let x = Math.floor(Math.random() * tabJeu.length);

            if (tabJeu[x] === '✖') {
                tabJeu[x] = this.tabNiveau[this.niveau][i];
                i++;
            }
        } while (i < nbPion)
        this.tabContenu = tabJeu;
        this.setState({
            flipped1: ' flippedBon',
            flipped2: ' flippedBon',
            flipped3: ' flippedBon',
            flipped4: ' flippedBon',
            contenu1: this.tabContenu[0],
            contenu2: this.tabContenu[1],
            contenu3: this.tabContenu[2],
            contenu4: this.tabContenu[3],
        });

    }
    swapTab = (no) => {
        let arr = this.tabMouv[no];
        const nonEmptyIndexes = arr
            .map((item, index) => item !== '' ? index : -1)
            .filter(index => index !== -1);


        let temp = this.tabContenu[nonEmptyIndexes[0]];
        this.tabContenu[nonEmptyIndexes[0]] = this.tabContenu[nonEmptyIndexes[1]];
        this.tabContenu[nonEmptyIndexes[1]] = temp;


    }

    swapCards = () => {
        if (this.state.isSwapping) return; // Éviter de déclencher l'animation plusieurs fois

        const x = Math.floor(Math.random() * 6);
        this.swapTab(x);
        this.setState({
            isSwapping: true,
            anim1: this.tabMouv[x][0],
            anim2: this.tabMouv[x][1],
            anim3: this.tabMouv[x][2],
            anim4: this.tabMouv[x][3],
            contenu1: '',
            contenu2: '',
            contenu3: '',
            contenu4: '',
        });


        // Événement déclenché à la fin de l'animation

    }

    testFin = () => {
        let carte = this.tabNiveau[this.niveau][0];
        if (this.tabNiveau[this.niveau].length > 1) {
            let x = Math.floor(Math.random() * this.tabNiveau[this.niveau].length)
            carte = this.tabNiveau[this.niveau][x];
        }
        this.setState(() => ({
            etat: 'fin',
            carteATrouver: carte
        }));
    }

    nouveauJeu = () => {
        this.setState({
            flipped1: '',
            flipped2: '',
            flipped3: '',
            flipped4: '',
            niveau: this.state.pause + 1

        })
        setTimeout(() => {
            this.mouvement = this.nivMouv;
            this.setState({
                etat: 'debut',

            })
            this.placerPion();
        }, 1000);


    }



    handleAnimationEnd = (event) => {
        this.animationsCompleted += 1;

        // Quand les deux animations sont terminées
        if (this.animationsCompleted === 2) {
            this.setState(() => ({
                anim1: '',
                anim2: '',
                anim3: '',
                anim4: '',
                isSwapping: false
            }));
            setTimeout(() => {
                this.mouvement--;

                if (this.mouvement !== 0) {
                    this.swapCards();
                }
                else {
                    this.testFin();

                }
            }, 20)

            this.animationsCompleted = 0; // Réinitialiser le compteur d'animations
        }
    }

    clicCarte = (event) => {
        const id = parseInt(event.currentTarget.id);

        console.log(this.state['flipped' + id])
        if (this.state.etat !== 'fin' || this.state['flipped' + id] === ' flippedBon') return;

        this.setState((prevState) => ({
            ['flipped' + id]: prevState['flipped' + id] === '' ? ' flippedBon' : '',
            ['contenu' + id]: this.tabContenu[id - 1]
        }));

        if (this.tabContenu[id - 1] === this.state.carteATrouver) {

            message.success("Bravo", 1, this.nouveauJeu);


        }

    }

    memoriser = () => {
        this.setState(() => ({
            flipped1: '',
            flipped2: '',
            flipped3: '',
            flipped4: '',
            etat: 'jeu'
        }));
        this.swapCards();

    }


    render() {
        return <React.Fragment>

            <div className="plateauBon">

                <div className="containerBon">
                    <div className={"card1Bon cardBon " + this.state.anim1 + this.state.flipped1} id="1" onClick={this.clicCarte} onAnimationEnd={this.handleAnimationEnd}>
                        <div className="card-frontBon"></div>
                        <div className="card-backBon">{this.state.contenu1}</div>
                    </div>
                    <div
                        className={"card2Bon cardBon " + this.state.anim2 + this.state.flipped2} id="2" onClick={this.clicCarte} onAnimationEnd={this.handleAnimationEnd}>
                        <div className="card-frontBon"></div>
                        <div className="card-backBon">{this.state.contenu2}</div>
                    </div>
                    <div
                        className={"card3Bon cardBon " + this.state.anim3 + this.state.flipped3} id="3" onClick={this.clicCarte} onAnimationEnd={this.handleAnimationEnd}>
                        <div className="card-frontBon"></div>
                        <div className="card-backBon">{this.state.contenu3}</div>
                    </div>
                    <div
                        className={"card4Bon cardBon " + this.state.anim4 + this.state.flipped4} id="4" onClick={this.clicCarte} onAnimationEnd={this.handleAnimationEnd}>
                        <div className="card-frontBon"></div>
                        <div className="card-backBon">{this.state.contenu4}</div>
                    </div>
                </div>


                {this.state.etat === 'debut' && <React.Fragment>
                    <div><Button onClick={this.memoriser}>J'ai mémorisé</Button></div>

                    {this.state.typeNiveau === 1 && <React.Fragment><div>Mémorise l'emplacement de la carte</div>
                        <div className="cardTest">⚪</div></React.Fragment>}
                    {this.state.typeNiveau === 2 && <React.Fragment><div>Mémorise l'emplacement des cartes</div>
                        <div className="cardTest">⚪</div>  <div className="cardTest">⬜</div></React.Fragment>}
                </React.Fragment>}
                {this.state.etat === 'fin' && <React.Fragment>
                    <React.Fragment><div>Clique sur la carte</div>
                        <div className="cardTest">{this.state.carteATrouver}</div></React.Fragment> </React.Fragment>}
            </div>




        </React.Fragment>
    }
}
