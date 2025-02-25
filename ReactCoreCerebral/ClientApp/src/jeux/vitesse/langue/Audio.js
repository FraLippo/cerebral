import React, { Component } from 'react';
import l40 from '../../../sons/langue40.mp3';
import l41 from '../../../sons/langue41.mp3';
import l42 from '../../../sons/langue42.mp3';
import l43 from '../../../sons/langue43.mp3';
import l44 from '../../../sons/langue44.mp3';
import l50 from '../../../sons/langue50.mp3';
import l51 from '../../../sons/langue51.mp3';
import l52 from '../../../sons/langue52.mp3';
import l53 from '../../../sons/langue53.mp3';
import l54 from '../../../sons/langue54.mp3';
import l60 from '../../../sons/langue60.mp3';
import l61 from '../../../sons/langue61.mp3';
import l62 from '../../../sons/langue62.mp3';
import l63 from '../../../sons/langue63.mp3';
import l64 from '../../../sons/langue64.mp3';
import l70 from '../../../sons/langue70.mp3';
import l71 from '../../../sons/langue71.mp3';
import l72 from '../../../sons/langue72.mp3';
import l73 from '../../../sons/langue73.mp3';
import l74 from '../../../sons/langue74.mp3';
import l80 from '../../../sons/langue80.mp3';
import l81 from '../../../sons/langue81.mp3';
import l82 from '../../../sons/langue82.mp3';
import l83 from '../../../sons/langue83.mp3';
import l84 from '../../../sons/langue84.mp3';

const audioFiles = {
    40: l40,
    41: l41,
    42: l42,
    43: l43,
    44: l44,
    50: l50,
    51: l51,
    52: l52,
    53: l53,
    54: l54,
    60: l60,
    61: l61,
    62: l62,
    63: l63,
    64: l64,
    70: l70,
    71: l71,
    72: l72,
    73: l73,
    74: l74,
    80: l80,
    81: l81,
    82: l82,
    83: l83,
    84: l84,
};

export default class Audio extends Component {

    constructor(props) {
        super();
        this.audio = React.createRef();
        this.fichierEnCours = 0;
        this.state =
        {
            etat: 'bouton1PlayCode'
        }
    }
    componentDidMount() {

        console.log('play');
        let promise = this.audio.current.play();

        // if (promise !== undefined) {
        //     promise.catch(error => {
        //         console.log("pas démarré");
        //         this.setState({ etat: 'boutonPlayCode pausedCode' });
        //     });
        // };
    }

    componentDidUpdate(prevProps) {
        // Vérifie si le numéro du fichier audio a changé
        if (prevProps.numero !== this.props.numero) {
            this.audio.current.currentTime = 0; // Réinitialise la position
            this.audio.current.play(); // Joue le nouveau son
            this.setState({ etat: 'bouton1PlayCode' });
        }
    }

    componentWillUnmount() {
    console.log('fin');
    }

    finAudio = () => {

        this.setState({ etat: 'bouton1PlayCode paused1Code' });



    }
    demarreAudio = () => {

        if (this.audio.current.paused) {
            this.audio.current.play();
        }


    }

    clic = () => {
        this.audio.current.currentTime = 0;
        this.audio.current.play();

        this.setState({ etat: 'bouton1PlayCode' });
    }



    render() {
        return <div className='audioOrto'><button className={this.state.etat} onClick={this.clic} ></button><audio

            ref={this.audio}
            src={audioFiles[this.props.numero]}
            onEnded={this.finAudio}>
        </audio>
        </div>

    }
}