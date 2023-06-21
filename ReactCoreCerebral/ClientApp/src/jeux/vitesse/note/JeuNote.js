import React, { Component } from 'react';
import * as Tone from 'tone';
import Clavier from './Clavier';
import NotesInconnues from './NotesInconnues';
import { Button, message } from 'antd';
import { SplendidGrandPiano } from "smplr";

export default class JeuNote extends Component {
    constructor(props) {
        super(props);
        // Charger le préréglage pour un synthétiseur spécifique
        this.synth = null;
        this.synth1 = null;
        this.nbPartie = 1;
        this.type = 0;


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
            tabNotesInconnues: []
        }


    }

    choisirNote() {
        let tabNoteX = [];
        let nombre = Math.floor(Math.random() * this.state.tabNotes.length);
        tabNoteX.push(this.state.tabNotes[nombre].note);

        this.setState({ tabNotesInconnues: tabNoteX })
    }
    async componentDidMount() {
        const context = new AudioContext();
        this.piano = await new SplendidGrandPiano(context).loaded();
        this.choisirNote();
        if (Tone.context.state === 'running') {
            console.log('Audio est déjà activé.');

            this.joueNote(this.state.tabNotesInconnues[0], this.type);
        }


    }
    joueNote = (nom, type) => {
        if (Tone.context.state === 'running') {
            this.entendreNote(nom, type);
        }
        else {
            Tone.start().then(() => {
                console.log('Audio activé.');
                var instrument1 = new Tone.Synth();
                var synthJSON = {
                    "oscillator": {
                        "partials": [
                            1,
                            0,
                            2,
                            0,
                            3
                        ]
                    },
                    "envelope": {
                        "attack": 0.001,
                        "decay": 1.2,
                        "sustain": 0,
                        "release": 1.2
                    }
                }

                instrument1.set(synthJSON);
                this.synth = instrument1.toDestination();
                
                
                //2e synthe
                var instrument2 = new Tone.MonoSynth();
                var synthJSON ={
                   
                    "oscillator": {
                        "type": "square"
                    },
                    "filter": {
                        "Q": 2,
                        "type": "lowpass",
                        "rolloff": -12
                    },
                    "envelope": {
                        "attack": 0.005,
                        "decay": 3,
                        "sustain": 0,
                        "release": 0.45
                    },
                    "filterEnvelope": {
                        "attack": 0.001,
                        "decay": 0.32,
                        "sustain": 0.9,
                        "release": 3,
                        "baseFrequency": 700,
                        "octaves": 2.3
                    }
                }
                instrument2.volume.value = -12;
                instrument2.set(synthJSON);
                this.synth1 = instrument2.toDestination();
            

                //3e synthe
                var instrument3 = new Tone.FMSynth();
                var synthJSON ={
                    "harmonicity": 3.01,
                    "modulationIndex": 14,
                    "oscillator": {
                        "type": "triangle"
                    },
                    "envelope": {
                        "attack": 0.2,
                        "decay": 0.3,
                        "sustain": 0.1,
                        "release": 1.2
                    },
                    "modulation" : {
                        "type": "square"
                    },
                    "modulationEnvelope" : {
                        "attack": 0.01,
                        "decay": 0.5,
                        "sustain": 0.2,
                        "release": 0.1
                    }
                }
                //instrument2.volume.value = -12;
                instrument3.set(synthJSON);
                this.synth2 = instrument3.toDestination();
            



                this.entendreNote(nom, type);
            }).catch((error) => {
                console.log('Impossible de démarrer l\'audio :', error);
            });
        }

    }
    reset = () => {
        let nouveauTabNote = this.state.tabNotes.map(element => { return { note: element.note, nom: element.nom, noteEnCours: 0 } })
        this.choisirNote();
        if (this.nbPartie > 2)
        {
            this.type = 2;
        }
        else if (this.nbPartie > 1)
        { this.type = 1;
        }
        this.setState({
            tabNotes: nouveauTabNote,

        });
    }

    componentWillUnmount() {
        // Arrête le synthétiseur lorsque le composant est démonté
        if (this.synth != null)  this.synth.dispose();
        if (this.synth1 != null)  this.synth1.dispose();
        if (this.synth2 != null)  this.synth2.dispose();
        
    }
    clicBouton = () => {

        this.joueNote(this.state.tabNotesInconnues[0], this.type);
    }
    entendreNote = (nom, type) => {
        // if (type === 0) {
        //     this.synth.triggerAttackRelease(nom, '4n');
        // }
        // else if (type === 1) {
        //     this.synth1.triggerAttackRelease(nom, '4n');
        // }
        // else
        // {
        //     this.synth2.triggerAttackRelease(nom, '4n');
        // }
        this.piano.start({ note: nom });
    };

    clicNote = (id) => {
        let nouveauTabNote = [...this.state.tabNotes];
        let index = nouveauTabNote.findIndex(x => x.noteEnCours === 1);
        if (index === -1) {
            nouveauTabNote[id].noteEnCours = 1;
        }
        else {
            nouveauTabNote[index].noteEnCours = 0;
            nouveauTabNote[id].noteEnCours = 1;
        }
        this.joueNote(nouveauTabNote[id].note, 0);
        this.setState({
            tabNotes: nouveauTabNote
        })
    }

    clickReponse = () => {
        let victoire;
        let nouveauTabNote = [...this.state.tabNotes];
        let index = this.state.tabNotes.findIndex(x => x.noteEnCours === 1);
        let indexBonneNote = nouveauTabNote.findIndex(x => x.note === this.state.tabNotesInconnues[0]);
        if (index === -1) {
            victoire = false;
        }
        else {
            if (this.state.tabNotes[index].note === this.state.tabNotesInconnues[0]) {
                victoire = true;
            }
        }
        if (victoire) {
            message.success('Bravo', this.reset);
        
            this.nbPartie++;
        }
        else {
            message.error('Erreur', this.reset);
            nouveauTabNote[indexBonneNote].noteEnCours = 2;
            console.log(nouveauTabNote);
            this.setState({
                tabNotes: nouveauTabNote
            })
        }
        
    }

    render() {
        return (
            <div>
                <div className="jeuNote">
                    <NotesInconnues tabNotesInconnues={this.state.tabNotesInconnues} clicBouton={this.clicBouton} ></NotesInconnues>
                    <Button onClick={this.clicBouton}>Jouer le son inconnu</Button>
                    <Clavier clicNote={this.clicNote} tabNotes={this.state.tabNotes}></Clavier>
                    <Button onClick={this.clickReponse}>Je valide la réponse</Button></div>


            </div>
        );
    }
}


