import React, { Component } from 'react';
import Ligne from './Ligne';
import { Button } from 'antd';
import creerDonnee from './Logique';




export default class JeuEcrire extends Component {
    constructor(props) {
        super(props);
        
        this.no = 0;
        this.tabLettres = [];
        this.lettres= creerDonnee();
       
        this.state = {
            tabLettres : this.lettres,
            pause :false,
            position:0
        }
        this.textInput = React.createRef();
    }



    keydownHandler = (event) => {
        let nouveauTabLettres = [...this.state.tabLettres]; 
        if (event.key === nouveauTabLettres[this.state.position])
        {
       
           
            this.setState({position: this.state.position+1});
        }
      }

      componentDidMount() {
        this.textInput.current.focus();
    }

    focusOut = () =>
    {
        this.setState({pause: true});
    }

    stopPause = () =>
    {
        this.textInput.current.focus();
        this.setState({pause: false});
    }


    render() {

        return <div>
            <div className="titreJeu">La dactylographie</div>
            <div>Tapez sur votre clavier la lettre dans le carré rouge. Pour aller vite sur un PC placer vos deux mains côte à côte au milieu du clavier et ne regardez pas votre clavier. </div>
            <Ligne position={this.state.position} tabLettres={this.state.tabLettres}></Ligne>
          <input type="text" onKeyDown={this.keydownHandler} ref={this.textInput} onBlur={this.focusOut} style={{opacity:0}} /> 
          <div className="centre">{this.state.pause && <Button onClick={this.stopPause}>Revenir au jeu</Button>}</div>
        </div>
    }

}
