import React, { Component } from 'react';
import Briques from './Briques';
import Saisie from './Saisie';
import Logique from './Logique';
import { Button, message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';

export default class JeuMur extends Component {

    constructor(props) {


        super(props);
        Logique.constructionBriques();
        this.state =
        {
            tabBriques: [],
            tabSaisie: [],
            afficheResultat: false,
            effetVictoire : false
        }
        this.score = 0;
    }



    componentDidMount() {
        let tabBriques = Logique.constructionBriques();


        this.setState({
            tabBriques,

        });
    }

    clicMur = (index) => {
        if (!this.state.tabBriques[index].selection) return;
        if (this.state.tabSaisie.length === 10) return;
        let nouveauTabBrique = [...this.state.tabBriques];
        let nouveauTabSaisie = [...this.state.tabSaisie];

        let caseMur = nouveauTabBrique[index];
        if (caseMur.etat === 'temp') {
            caseMur.etat = "clic-temp";
        }
        else {
            caseMur.etat = "clic";
        }
        nouveauTabSaisie.push(caseMur);

        //cherche nouvelle case libre
        if (index - 10 > 0) {
            this.state.tabBriques[index - 10].selection = true;
            this.state.tabBriques[index - 10].etat = 'temp';
        }

        this.setState({
            tabBriques: nouveauTabBrique,
            tabSaisie: nouveauTabSaisie,
            effetVictoire : ''
        })

    }


    envoyerMessage = (mot) => {



        let url = new URL(process.env.REACT_APP_URL_VERIFIERMOT);
        var data = new FormData();
        data.append('mot', mot);
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(res => {
                if (!res) {
                    message.error("Le mot  " + mot + " est inconnu dans notre dictionnaire.", () => this.reset());
                    
                }
                else
                {
                    this.accepterMot();
                }
            });
    }

    reset = () => {

        let nouveauTabBrique = [...this.state.tabBriques];

        let nouveauTabSaisie = [...this.state.tabSaisie];
        let tabTemp = nouveauTabBrique.filter(x => x.etat === 'clic-temp' || x.etat === 'clic' || x.etat === 'temp');

        for (let index = 0; index < tabTemp.length; index++) {
            if (tabTemp[index].etat !== 'clic') {
                tabTemp[index].selection = false;
            }
            tabTemp[index].etat = 'init';
        }

        nouveauTabSaisie.splice(0, nouveauTabSaisie.length);


        this.setState({
            tabBriques: nouveauTabBrique,
            tabSaisie: nouveauTabSaisie
        })
    }

    valider = () => {
        if (this.state.tabSaisie.length < 3) {
            message.error("Mots de plus de 2 lettres seulement");
            return;
        }
        let mot = this.state.tabSaisie.map(x => {return x.lettre}).join('');
        console.log(mot)
        this.envoyerMessage(mot);
    }

    accepterMot = () =>
    {
         
            let nouveauTabBrique = [...this.state.tabBriques];

            let nouveauTabSaisie = [...this.state.tabSaisie];

            let min = Math.min(...nouveauTabSaisie.map(x => { return x.no }))
            if (min <= 10) {
                message.success("Bravo");
                this.score = 150;
                   this.setState({ afficheResultat: true });
            }
            let tabTemp = nouveauTabBrique.filter(x => x.etat === 'temp');
            for (let index = 0; index < tabTemp.length; index++) {

                tabTemp[index].etat = 'init';
            }
            let tabFin = nouveauTabBrique.filter(x => x.etat === 'clic-temp' || x.etat === 'clic');

            for (let index = 0; index < tabFin.length; index++) {
                tabFin[index].etat = 'fin';
            }
            nouveauTabSaisie.splice(0, nouveauTabSaisie.length);

            this.setState({
                tabBriques: nouveauTabBrique,
                tabSaisie: nouveauTabSaisie,
                effetVictoire : 'victoire'
            })
       
    }

     finTimer = () => {
         this.setState({ afficheResultat: true });
          let tabValeurs = this.state.tabBriques.filter(x => x.etat === 'fin').map(x => { return x.no });
          console.log(tabValeurs);
          let min = 0;
          if (tabValeurs.length === 0)
          {
            min = 100;
          }
          else
          {
            min = Math.min(...tabValeurs);
          }
          console.log(min);
      
         let rangee = Math.floor(min / 10);

         this.score = 120 - (rangee * 12);
   

    }
    render() {
        return <div>
             {this.state.afficheResultat ?
                            <Resultat score={this.score} typeExo='vitessebrique'></Resultat>:
                            <div className='fond-mur'>
            <div className='plateau-mur'>
                <div className='jeu-mur'>
                    <div className='briques-mur'><Briques clicMur={this.clicMur} tabBriques={this.state.tabBriques}></Briques></div>
                    <div className='mot-mur'>
                        <div className={'saisie-mur ' +  this.state.effetVictoire}><Saisie tabSaisie={this.state.tabSaisie}></Saisie></div>
                    </div>
                    <div className='boutons-mur'>
                        <Button type='primary' onClick={this.valider}>Valider</Button><Button className='espaceBouton' onClick={this.reset}>Reset</Button>
                    </div>

                </div>
<div className=" centre marge10"><CompteRebours temps={100} finTimer={this.finTimer}></CompteRebours></div>
            </div></div>
    }

        </div>
    }

}