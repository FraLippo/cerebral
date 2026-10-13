import React, { Component } from 'react';
import {Button } from 'antd';

import '../../style/jeux.css';

export default class InstallBouton extends Component {

    constructor() {
        super();
        this.deferredPrompt = null;
        this.state = {
            affichage: false
        }
    }

    componentDidMount() {
        //user had already installed the app
        if (!window.matchMedia('(display-mode: standalone)').matches) {
            this.register();
          }
      
    }

    savePrompt(e) {
        this.deferredPrompt = e;
        this.setState({
            affichage : true
        });
    }

    showPrompt() {
        if (this.deferredPrompt !== null)
        {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice
                .then((choiceResult) => {
                    this.deferredPrompt = null;
                    this.setState({
                        affichage : false
                    });
                });
        }
    }

    register() {
        window.addEventListener('beforeinstallprompt', this.savePrompt.bind(this));
    }

    clickButton = () =>
    {
        this.showPrompt();
    }

    render()
    {
       return <div>{this.state.affichage &&
            <div><hr className="espaceHaut"></hr><Button  type="primary" className="tag" onClick={this.clickButton}>{"Installez le site web en local pour pouvoir jouer plus facilement."}</Button>
            <span className="tag">{"Installation"}</span>
            <hr></hr></div>
       }

        </div>
    }
}