import React, { Component } from 'react';

import Clavier from './Clavier';
import NotesInconnues from './NotesInconnues';
import SuiteNotes from './SuiteNotes';
import { Button, message } from 'antd';
import { ElectricPiano } from "smplr";
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat.js';
import cp80 from "./photos/cp80.jpg";
import ep200 from "./photos/ep200.jpg";
import hohner from "./photos/hohner.jpg"
import { Helmet } from 'react-helmet';

export default class JeuNote extends Component {
    constructor(props) {
        super(props);

        this.nbPartie = 1;

        this.fin = false;
        this.piano = null;
        this.score = 0;
        let tabNotes = [{ nom: 'C', note: 'C3', noteEnCours: 0 },
        { nom: 'Db', note: 'Db3', noteEnCours: 0 },
        { nom: 'D', note: 'D3', noteEnCours: 0 },
        { nom: 'Eb', note: 'Eb3', noteEnCours: 0 },
        { nom: 'E', note: 'E3', noteEnCours: 0 },
        { nom: 'F', note: 'F3', noteEnCours: 0 },
        { nom: 'Gb', note: 'Gb3', noteEnCours: 0 },
        { nom: 'G', note: 'G3', noteEnCours: 0 },
        { nom: 'Ab', note: 'Ab3', noteEnCours: 0 },
        { nom: 'A', note: 'A3', noteEnCours: 0 },
        { nom: 'Bb', note: 'Bb3', noteEnCours: 0 },
        { nom: 'B', note: 'B3', noteEnCours: 0 }];

        this.state = {
            tabNotes: tabNotes,
            tabNotesInconnues: [],
            suiteInconnues: [],
            suiteReponse: [],
            nombreNotes: 1,
            finJeu: false,
            typePiano: 1
        }


    }

    choisirNote() {
        let suite = [];
        for (let i = 0; i < this.state.nombreNotes; i++) {
            let nombre = Math.floor(Math.random() * this.state.tabNotes.length);
            suite.push(this.state.tabNotes[nombre].note);
        }
        this.setState({ suiteInconnues: suite, suiteReponse: [] })
    }

    jouerSuite = () => {
        this.state.suiteInconnues.forEach((note, index) => {
            setTimeout(() => {
                this.joueNote(note);
            }, index * 300);
        });
    }
    async componentDidMount() {
        //  const instruments = getElectricPianoNames(); // => ["CP80", "PianetT", "WurlitzerEP200"]

        this.piano1 = new ElectricPiano(new AudioContext(), {
            instrument: "PianetT",
        });
        this.piano2 = new ElectricPiano(new AudioContext(), {
            instrument: "CP80",
        });
        this.piano3 = new ElectricPiano(new AudioContext(), {
            instrument: "WurlitzerEP200",
        });

        this.piano1.loaded().then(() => {

        });
        this.piano2.loaded().then(() => {

        });
        this.piano3.loaded().then(() => {

        });
        this.choisirNote();
        setTimeout(() => {
            this.jouerSuite();
        }, 500);

    }

    joueNote = (nom) => {


        switch (this.state.typePiano) {
            case 1:
                this.piano1.start({ note: nom, duration: .2 });
                break;
            case 2:
                this.piano2.start({ note: nom, duration: .2 });
                break;
            case 3:
                this.piano3.start({ note: nom, duration: .2 });
                break;
        }
    

    }
    reset = () => {
        this.fin = false;
        let nouveauTabNote = this.state.tabNotes.map(element => { return { note: element.note, nom: element.nom, noteEnCours: 0 } })
        this.choisirNote();



        this.setState({
            tabNotes: nouveauTabNote,

        });
    }

    componentWillUnmount() {


    }
    clicBouton = () => {
        this.jouerSuite();
    }


    clicNote = (id) => {
        if (this.fin) return;
        let nouveauTabNote = [...this.state.tabNotes];
        let index = nouveauTabNote.findIndex(x => x.noteEnCours === 1);
        if (index === -1) {
            nouveauTabNote[id].noteEnCours = 1;
        }
        else {
            nouveauTabNote[index].noteEnCours = 0;
            nouveauTabNote[id].noteEnCours = 1;
        }
        this.joueNote(nouveauTabNote[id].note);
        this.setState({
            tabNotes: nouveauTabNote
        })
    }

    ajouterNoteReponse = () => {
        if (this.fin) return;
        let nouveauTabNote = [...this.state.tabNotes];
        let index = this.state.tabNotes.findIndex(x => x.noteEnCours === 1);

        if (index === -1) {
            message.error('Sélectionne une note');
            return;
        }

        let noteSelectionnee = this.state.tabNotes[index].note;
        let nouvelleReponse = [...this.state.suiteReponse, noteSelectionnee];

        // Réinitialiser la sélection
        nouveauTabNote[index].noteEnCours = 0;
        this.setState({
            tabNotes: nouveauTabNote,
            suiteReponse: nouvelleReponse
        })
    }


    supprimerDerniere = () => {
        if (this.state.suiteReponse.length > 0) {
            let nouvelleReponse = this.state.suiteReponse.slice(0, -1);
            this.setState({
                suiteReponse: nouvelleReponse
            })
        }
    }

    rejouerSequence = () => {
        this.state.suiteReponse.forEach((note, index) => {
            setTimeout(() => {
                this.joueNote(note);
            }, index * 300);
        });
    }

    validerSequence = () => {
        if (this.fin) return;

        // Vérifier que toutes les notes correspondent
        let correctCount = 0;
        for (let i = 0; i < this.state.suiteReponse.length; i++) {
            if (this.state.suiteReponse[i] === this.state.suiteInconnues[i]) {
                correctCount++;
            }
        }

        if (correctCount !== this.state.suiteInconnues.length) {
            message.error(`Erreur. ${correctCount} note${correctCount > 1 ? 's' : ''} correcte${correctCount > 1 ? 's' : ''} sur ${this.state.suiteInconnues.length}`);
            this.fin = true;
            let nouveauTabNote = [...this.state.tabNotes];
            // Marquer TOUTES les notes correctes de la séquence en rose
            for (let i = 0; i < this.state.suiteInconnues.length; i++) {
                let indexBonneNote = nouveauTabNote.findIndex(x => x.note === this.state.suiteInconnues[i]);
                nouveauTabNote[indexBonneNote].noteEnCours = 2;
            }
            this.setState({
                tabNotes: nouveauTabNote
            });

            // Recommencer le niveau après 2 secondes
            setTimeout(() => {
                let nouveauTabNote = this.state.tabNotes.map(element => { return { note: element.note, nom: element.nom, noteEnCours: 0 } })

                this.fin = false;
                this.setState({
                    tabNotes: nouveauTabNote,
                    suiteReponse: []
                }, () => {
                    this.choisirNote();
                    setTimeout(() => {
                        this.jouerSuite();
                    }, 500);
                });
            }, 2000);
            return;
        }


        message.success('👍 Super');
        this.score += 12 * this.state.nombreNotes;
        this.nbPartie++;
        this.fin = true;

        // Augmenter la difficulté
        setTimeout(() => {
            let nextNombre = this.state.nombreNotes + 1;
            let nouveauTabNote = this.state.tabNotes.map(element => { return { note: element.note, nom: element.nom, noteEnCours: 0 } })
            let type = 1;
            if (this.nbPartie > 1) {
                type = 2;
            }
            else if (this.nbPartie > 2) {
                type = 3;
            }

            this.fin = false;
            this.setState({
                tabNotes: nouveauTabNote,
                nombreNotes: nextNombre,
                typePiano: type
            }, () => {
                this.choisirNote();
                setTimeout(() => {
                    this.jouerSuite();
                }, 500);
            });
        }, 1000);
    }
    finTimer = () => {
        this.setState({
            finJeu: true
        });
    }


    render() {
        return (
            <div>
                <Helmet>
                    <title>L'oreille musicale</title>
                    <meta name="description" content="Un jeu pour tester votre oreille musicale, arriverez-vous à reconnaitre les notes jouées ? Un jeu pour tous même sans connaitre la musique." />
                </Helmet>
                {this.state.finJeu ? <Resultat score={this.score} typeExo='vitessenotes'></Resultat> :
                    <React.Fragment>
                        <div className="fontMoyenne couleurTitre">L'oreille musicale</div>
                        <div className="jeuNote">
                            <p>Clique sur le cercle ci-dessous pour entendre la séquence de notes à retrouver.</p>
                            <NotesInconnues tabNotesInconnues={this.state.suiteInconnues} clicBouton={this.clicBouton} ></NotesInconnues>

                            <SuiteNotes
                                sequence={this.state.suiteReponse}
                                rejouerSequence={this.rejouerSequence}
                                supprimerDerniere={this.supprimerDerniere}
                                validerSequence={this.validerSequence}
                                disabledReplay={this.state.suiteReponse.length === 0}
                                disabledValider={this.state.suiteReponse.length !== this.state.suiteInconnues.length}
                            />
                            <Clavier clicNote={this.clicNote} tabNotes={this.state.tabNotes}></Clavier>
                            <p>Sélectionne les notes de la suite une par une et clique sur "Ajouter à la séquence" après chaque note.</p>
                            <Button onClick={this.ajouterNoteReponse}>Ajouter à la séquence</Button>
                            <div className="centre marge10"><CompteRebours temps={120} finTimer={this.finTimer}></CompteRebours></div>
                        </div>
                        {this.state.typePiano === 2 ?
                            <div className='centre'><img src={cp80} alt="clavier cp80 yamaha"></img>
                                <div className='infoNote'>Les sons proviennent du CP-80 de chez Yamaha, sorti en 1976. Instrument utilisé par Phil Collins, Joe Jackson et Genesis, parmi beaucoup d'autres.</div>
                            </div> :
                            this.state.typePiano === 3 ?
                                <div className='centre'><img src={ep200} alt="wurlitzer ep 200"></img>
                                    <div className='infoNote'>Les sons proviennent d'un piano électrique Wurlitzer. Ce piano est un élément caractéristique du son du groupe Supertramp.</div>
                                </div> :
                                <div className='centre'><img src={hohner} alt="Pianet Hohner"></img>
                                    <div className='infoNote'>Les sons proviennent d'un Pianet, une série de pianos électriques construits par la compagnie Hohner. Il est utilisé dans la superbe chanson This Guy's in Love with You. </div>
                                </div>}
                                <p className='centre'>Pardon pour les oreilles délicates : les intervalles sont tirés au sort, et parfois… ça pique un peu.</p>
                    </React.Fragment>
                }


            </div>
        );
    }
}


