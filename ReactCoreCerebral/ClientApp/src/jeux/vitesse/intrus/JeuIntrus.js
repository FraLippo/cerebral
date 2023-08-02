import React, { Component } from 'react';
import Grille from './Grille';
import Logique from './Logique';
import {message} from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import '../../../style/vitesse.css';
import { Helmet } from 'react-helmet';



export default class JeuIntrus extends Component
{
    constructor(props)
    {
        super(props);
     
        this.noPartie= 0;

        this.nbImageFaux = 0;
        this.imageTrouve = 0;
        this.fin = false;
        this.state = {
            tabGrille : [],
            taille : 0,
            score : 0,
            afficheResultat : false,
            message: '',
            typeImage : '',
            imageVrai: 6
        }
   
    }

    niveauSuivant = () => {  
        if (this.fin) return;
       let typeImage = Logique.typeImage(this.noPartie);
        let infoGrille = Logique.creerTableauImage(); 
        let tabGrille = infoGrille.tableauImage;
        this.nbImageFaux = infoGrille.nbImageFaux;
        this.setState({
            tabGrille,
            typeImage,
            imageVrai: infoGrille.imageVrai
        })
       this.noPartie++;
    }

    componentDidMount()
    {
        this.niveauSuivant();
    }

    clicImage = (no) => {
        let score = this.state.score;
        if (this.state.tabGrille[no] === 5 || this.state.tabGrille[no] === 6) return;
        let nouveauTabGrille = [...this.state.tabGrille];
        if (nouveauTabGrille[no] !== this.state.imageVrai)
        {
            nouveauTabGrille[no]=5;
            this.imageTrouve++;
            score++;
        }
        else
        {
            nouveauTabGrille[no]=6;
            score -=2;
        }
        this.setState({tabGrille: nouveauTabGrille, score});
        if (this.imageTrouve === this.nbImageFaux)
        {
            message.success("Bravo",.5, this.finNiveau);
            
        }
    }

    finNiveau = () => {
        this.niveauSuivant();
            this.imageTrouve = 0;
    }

    finTimer = () => {
        this.fin = true;
        this.setState({afficheResultat : true});
    }
   
    render()
    {
return <React.Fragment>
<Helmet>
            <title>Le jeu des différences</title>
            <meta name="description" content="Un jeu simple où vous devez rapidement trouver les différences entre plusieurs dessins." />
        </Helmet>
        {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitesseintrus'></Resultat>:<div>
    <div className="centreGrilleCalMen"><Grille clicImage={this.clicImage} taille={3} type={this.state.typeImage} tabGrille={this.state.tabGrille}></Grille></div>
<div className="centre" >Clique sur toutes les images qui <b>ne sont pas semblables</b> à l'image ci-dessous:</div>
<div className="centre"><img src={Logique.obtenirImage(this.state.typeImage, this.state.imageVrai)}></img></div>

<div className="centre marge20">Score: {this.state.score}</div>
<div className="centre"><CompteRebours finTimer={this.finTimer} temps={60}></CompteRebours></div>
</div>}
</React.Fragment>
}
}