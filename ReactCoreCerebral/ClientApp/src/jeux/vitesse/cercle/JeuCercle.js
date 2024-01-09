import React, { Component } from 'react';
import Fleches from './Fleches';
import Lettres from './Lettres';
import Camembert from './Camembert';
import { message } from 'antd';
import Logique from './Logique';



export default class JeuCercle extends Component {
  constructor(props) {
    super(props);
    let tabLettresCamemberts = Logique.creationTableau();
    console.log(tabLettresCamemberts);
    this.fin = false;
    this.state = {
      tabLettresCamemberts

    }


  }

  clicCamembert = (id) => {
    if (this.fin) return;
    let no = id % 100;
    let noTab = Math.floor(id / 100) - 1;
    let nouveauTabLettresCamemberts = [...this.state.tabLettresCamemberts];

    for (let index = 0; index < nouveauTabLettresCamemberts[noTab].infoMots.length; index++) {
      nouveauTabLettresCamemberts[noTab].infoMots[index].etat = 'vide';

    }
    nouveauTabLettresCamemberts[noTab].infoMots[no].etat = 'selection';
    this.setState({ tabLettresCamemberts: nouveauTabLettresCamemberts })
  }

  clicFleche = (id) => {
    if (this.fin) return;
    this.fin= true;
    let no = id % 1000
    let noTab = Math.floor(id / 1000) - 1;

    let nouveauTabLettresCamemberts = [...this.state.tabLettresCamemberts];

    let place = nouveauTabLettresCamemberts[noTab].infoMots.findIndex(x => x.etat === 'selection');
    if (place === -1) {
      this.fin = false;
      message.error('Sélectionnez une lettre sur le camembert avant de choisir un sens de rotation');
      return;
    }

    let mot = [];
    let tabPlace = [];
    for (let index = 0; index < nouveauTabLettresCamemberts[noTab].infoMots.length; index++) {
      mot += nouveauTabLettresCamemberts[noTab].infoMots[place].lettre;

      tabPlace.push(place);

      if (no === 1) {
        place++;
        if (place === nouveauTabLettresCamemberts[noTab].infoMots.length) {
          place = 0;
        }
      }
      else {
        place--;
        if (place === -1) {
          place = nouveauTabLettresCamemberts[noTab].infoMots.length - 1;
        }
      }
    }
    let resultat = false;
    if (mot === nouveauTabLettresCamemberts[noTab].mot) {
      nouveauTabLettresCamemberts[noTab].mot = 'fin';
      resultat = true;
      this.setState({ tabLettresCamemberts: nouveauTabLettresCamemberts })
    }


    let i = 0;
    let timer = setInterval(() => {
      if (i === tabPlace.length) {
        clearInterval(timer);
       this.messageFin(noTab, resultat);
        return;
      }
      let nouveauTabSelection = [...this.state.tabLettresCamemberts];
      nouveauTabSelection[noTab].infoMots[tabPlace[i]].etat = 'selection';
      this.setState({ tabLettresCamemberts: nouveauTabSelection })
      i++;
     

    }, 200);
  }

  messageFin = (noTab, resultat) => {
    this.fin = false;
    if (resultat) {
      message.success('Bravo !');
    }
    else {
      message.error("Ce n'est pas le bon mot");
      let nouveauTabLettresCamemberts = [...this.state.tabLettresCamemberts];
      for (let index = 0; index < nouveauTabLettresCamemberts[noTab].infoMots.length; index++) {
        nouveauTabLettresCamemberts[noTab].infoMots[index].etat = 'vide';
      }
      this.setState({ tabLettresCamemberts: nouveauTabLettresCamemberts })


    }

  }
  render() {

    return <div> <div className="plateauCercle">
      {this.state.tabLettresCamemberts.map((infoCamembert, i) =>
        <div className={infoCamembert.mot === 'fin' ? 'colonneCercle finColonneCercle' : 'colonneCercle'} key={10000 + i}>
          <div className='parentCercle'>
            <Lettres tabLettres={infoCamembert.infoMots} no={i + 1}></Lettres>



            <Camembert no={(i + 1) * 100} tabLettres={infoCamembert.infoMots} clicCamembert={this.clicCamembert}></Camembert>
          </div>
          <Fleches no={(i + 1) * 1000} clicFleche={this.clicFleche}></Fleches>
        </div>)
      }
    </div>


    </div>
  }


}
