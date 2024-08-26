import SousMenu from './SousMenu';
import React, { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';


export default class TesConcentration extends Component {

  constructor()
  {
    super();
  }

  render() {
    return <div>
         <Helmet>
            <title>Jeu cérébral : la mémoire </title>
            <meta name="description" content="Des jeux simples et amusants de sport cérébral axés sur la mémoire. Ces jeux sont disponibles pour les seniors et les juniors, ils sont tous gratuits."/>
        </Helmet>
      <div className="titre centre couleurTitre">Sport cérébral</div>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <h2 className="titre couleurTitre centre">Les tests de la mémoire</h2>
      <p>Entraînez votre cerveau et stimulez votre mémoire avec une sélection captivante de jeux de mémoire gratuits en ligne pour les adultes ou les enfants. Testez vos capacités de rappel, votre concentration et votre capacité à mémoriser des informations tout en vous amusant. 

Plongez dans un monde d'énigmes et de défis conçus pour exercer votre mémoire à court terme et à long terme. Découvrez des jeux de cartes où vous devez retrouver des paires identiques ou des jeux de séquences où vous devez mémoriser et reproduire des modèles.</p>

<p>Les jeux de mémoire ne sont pas seulement amusants, mais ils sont également bénéfiques pour votre développement cognitif. Ils améliorent votre concentration, votre capacité de rétention et votre vitesse de traitement de l'information. En jouant régulièrement, vous pouvez renforcer votre mémoire et votre capacité d'apprentissage, ce qui peut être utile dans de nombreux aspects de la vie quotidienne.</p>
<GraphiqueRapidite ></GraphiqueRapidite>

<Ad></Ad>
       </div>
  }
}