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
            niveau : 1,
            etat: 'debut'
        };
        this.animationsCompleted = 0;
        this.tabMouv = [['moving-move1-diag-left', '', '', 'moving-move4-up'],
        ['moving-move1-diag-right', 'moving-move2-up', '', ''],
        ['moving-move1-down', '', 'moving-move3-up', ''],
        ['', 'moving-move2-left', '', 'moving-move4-right'],
        ['', 'moving-move2-down', 'moving-move3-diag-right', ''],
        ['', '', 'moving-move3-diag-left', 'moving-move4-down'],
        ]
        this.mouvement = 3;

    }
 componentDidMount()
 {
    this.placerPion();
 }
    placerPion() {
        let nbPion = 1;
        let tabPion = ['⚪', '⬜']
        let tabJeu = [ '✖', '✖', '✖', '✖'];
        if (this.niveau < NIVEAU2) nbPion = 2;
        let i = 0;
        do {
            let x = Math.floor(Math.random() * tabJeu.length);
            console.log(x);
            if (tabJeu[x] === '✖') {
                tabJeu[x] = tabPion[i];
                i++;
            }
        } while (i < nbPion)
        this.tabContenu = tabJeu;
    console.log(this.tabContenu)
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

        console.log(nonEmptyIndexes);
        let temp = this.tabContenu[nonEmptyIndexes[0]];
        this.tabContenu[nonEmptyIndexes[0]] = this.tabContenu[nonEmptyIndexes[1]];
        this.tabContenu[nonEmptyIndexes[1]] = temp;
        console.log(this.tabContenu);

    }

    swapCards = () => {
        if (this.state.isSwapping) return; // Éviter de déclencher l'animation plusieurs fois
        console.log(this.tabMouv[0][0])
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

    testFin = () =>
    {
        this.setState(() => ({
            etat: 'fin'
          }));
    }

    nouveauJeu = () =>
    {
       
        this.mouvement = 3;
        this.setState({
            etat: 'debut',
        })
        this.placerPion();

    }



    handleAnimationEnd = (event) => {
        this.animationsCompleted += 1;
        console.log(this.animationsCompleted)
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
                console.log(this.mouvement)
                if (this.mouvement !== 0) {
                    this.swapCards();
                }
                else
                {
                    this.testFin();
                   
                }
            }, 500)

            this.animationsCompleted = 0; // Réinitialiser le compteur d'animations
        }
    }

    clicCarte = (event) => {
        const id = parseInt(event.currentTarget.id);
        console.log(this.tabContenu);
        console.log(id)
        this.setState((prevState) => ({
            ['flipped' + id]: prevState['flipped' + id] === '' ? ' flippedBon' : '',
            ['contenu' + id]: this.tabContenu[id - 1]
        }));

        if (this.tabContenu[id - 1] === '⚪' || this.tabContenu[id - 1] === '⚪')
        {
            message.success("Bravo", 1,this.nouveauJeu);
        }
        
    }

    memoriser = () => {
        this.setState(() => ({
            flipped1: '',
            flipped2: '',
            flipped3: '',
            flipped4: '',
            etat : 'jeu'
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
                 <React.Fragment>{this.state.niveau < NIVEAU2 ? <React.Fragment><div>Mémorise l'emplacement de la carte</div>
                <div className="cardTest">⚪</div></React.Fragment>: <div></div>}</React.Fragment></React.Fragment>}
                {this.state.etat === 'fin' &&  <React.Fragment><div>Clique sur la carte</div>
                <div className="cardTest">⚪</div></React.Fragment> }
            </div>
            <button onClick={this.swapCards}>Échanger les cartes</button>
          
          

        </React.Fragment>
    }
}
