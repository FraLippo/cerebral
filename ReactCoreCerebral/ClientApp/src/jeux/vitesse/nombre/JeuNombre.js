import React, { Component } from 'react';
import { message } from 'antd';
import Resultat from '../commun/Resultat';
import Nombre from './Nombre';
import Saisie from './Saisie';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';






export default class JeuNombre extends Component {
    constructor(props) {
        super(props);
        this.niveau = 1;
        this.signe = '+';
        this.score = 0;
        this.fin = false;
        this.state = {
            finJeu: false,
            afficheRebours: true,
            afficheNombre: true,
            nombre: this.constructionNombre()
        }
    }

    constructionNombre() {
        let tabNombre = [];
        for (let index = 1; index <= this.niveau; index++) {
            let nombre = (Math.floor(Math.random() * 10)).toString();
           
            tabNombre.push(nombre);
        }

        return tabNombre;
    }

    clicNombre = () => {
        this.setState({ afficheNombre: false })
    }
    nouveauTirage = () => {
        this.fin=false;
        this.setState({ nombre: this.constructionNombre(), afficheNombre: true })
    }

    finReussi = () => {
        if (this.signe === '+' && this.niveau === 8) {
            this.signe = '-';
        }

        if (this.signe === '+') {
            this.niveau++;
        }
        else {
            this.niveau--;


        }
        if (this.niveau === 0) {
            this.setState({ finJeu: true });
            this.score += 50;
        }
        else {
            this.nouveauTirage();
        }

    }

    clicSaisie = (numero) => {
        if (this.fin) return;
       
        let nbSansEspace = this.state.nombre.join('').replace(/\s/g, '');
   
        if (numero.length === nbSansEspace.length) { 
            this.fin = true;
            if (numero === nbSansEspace) {
                message.success('OK', 1, this.finReussi);
                this.score += 5;
            }
            else {
                message.error('KO', 1, this.nouveauTirage)
            }
        }
    }

    finTimer = () => {
        this.setState({finJeu: true});
    }
    render() {

        return (<div>
            <Helmet>
                <title>Se souvenir des nombres</title>
                <meta name="description" content="Un jeu très facile où vous devez vous souvenir des nombres affichés et les reconstituer le plus rapidement possible." />
            </Helmet>

            {!this.state.finJeu ? <React.Fragment>
                <div className="fontMoyenne couleurTitre">Se souvenir des nombres</div><div ><div className="centre espaceHaut">
                    {this.state.afficheNombre ? <Nombre nombre={this.state.nombre} niveau={this.niveau} clicNombre={this.clicNombre}></Nombre> : <Saisie clicSaisie={this.clicSaisie}></Saisie>}




                    {this.state.afficheRebours &&<div className='espaceHaut'> <CompteRebours temps={75} finTimer={this.finTimer}></CompteRebours></div>}</div></div>
            </React.Fragment> : <Resultat score={this.score} typeExo='vitessenombre' ></Resultat>}
        </div>)
    }

}

