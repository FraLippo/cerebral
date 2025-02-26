import React, { Component } from 'react';
import { formulePolitesse } from './data';



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
            src={formulePolitesse[this.props.numero].audio}
            onEnded={this.finAudio}>
        </audio>
        </div>

    }
}