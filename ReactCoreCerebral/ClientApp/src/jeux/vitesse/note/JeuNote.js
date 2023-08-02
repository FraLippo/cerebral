import React, { Component } from 'react';

import Clavier from './Clavier';
import NotesInconnues from './NotesInconnues';
import { Button, message } from 'antd';
import { ElectricPiano } from "smplr";
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat.js';

import { Helmet } from 'react-helmet';

export default class JeuNote extends Component {
    constructor(props) {
        super(props);

        this.nbPartie = 1;
        this.type = 1;
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
            finJeu: false
        }
   

    }

    choisirNote() {
        let tabNoteX = [];
        let nombre = Math.floor(Math.random() * this.state.tabNotes.length);
        tabNoteX.push(this.state.tabNotes[nombre].note);
        console.log(tabNoteX[0]);
        this.setState({ tabNotesInconnues: tabNoteX })
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
            console.log('activated1');
        });
        this.piano2.loaded().then(() => {
            console.log('activated2');
        });
        this.piano3.loaded().then(() => {
            console.log('activated3');
        });
        this.choisirNote();



    }
    joueNote = (nom,type) => {
        if (this.fin) return;
        switch (type) {
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
        if (this.nbPartie > 7) {
            this.type = 3;
        }
        else if (this.nbPartie > 5) {
            this.type = 2;
        }
        console.log(this.type);
        console.log(this.nbPartie);
        this.setState({
            tabNotes: nouveauTabNote,

        });
    }

    componentWillUnmount() {


    }
    clicBouton = () => {

        this.joueNote(this.state.tabNotesInconnues[0], this.type);
    }


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
        this.joueNote(nouveauTabNote[id].note, this.type);
        this.setState({
            tabNotes: nouveauTabNote
        })
    }

    clickReponse = () => {
        if (this.fin) return;
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
            this.score += 7;
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
        this.fin = true;

    }
    finTimer = () =>
    {
        this.setState({
            finJeu: true
        });
    }


    render() {
        return (
            <div>
            <Helmet>
                    <title>L'oreille musicale</title>
                    <meta name="description" content="Un jeu pour tester votre oreille musicale, arriverez-vous à reconnaitre la note jouée ? Un jeu pour tous même sans connaitre la musique." />
                </Helmet>
             { this.state.finJeu ? <Resultat score={this.score} typeExo='vitessenotes'></Resultat> :
               <React.Fragment> 
                <div className="fontMoyenne couleurTitre">L'oreille musicale</div>
               <div className="jeuNote">
                   
                    <NotesInconnues tabNotesInconnues={this.state.tabNotesInconnues} clicBouton={this.clicBouton} ></NotesInconnues>
                    <p>Cliquer sur le point d'interrogation pour entendre la note inconnue.</p>
                    <Clavier clicNote={this.clicNote} tabNotes={this.state.tabNotes}></Clavier>
                    <p>Sélectionner la note qui correspond au point d'interrogation puis valider. Pas besoin de connaitre la musique, il suffit de se fier à son oreille.</p>
                    <Button onClick={this.clickReponse}>Je valide la réponse</Button>  
                    <div className="centre marge10"><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
                    </div></React.Fragment>
                    }
                 

            </div>
        );
    }
}


