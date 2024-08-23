
import React, { Component } from 'react';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';
import Ad from '../commun/adSense';
import { readFirstName } from '../commun/localStorage';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Podium from '../../jeux/vitesse/commun/Podium';
import {  Progress } from 'antd';


export default class TestMemoire extends Component {

  constructor()
  {
    super();
    this.prenom = '';
    this.state =
    {
        resultatsJoueur : [],
        tabPrenoms : [],
        pourcent : 0
    }
  }

  componentDidMount = () => {

    let prenom = readFirstName();
    if (prenom !== null) {
       this.prenom = prenom.includes('@') ? prenom.split('@')[0] : prenom;
    }
    this.envoyerMessage(prenom);
}



  async envoyerMessage(prenom) {
    let url = new URL(process.env.REACT_APP_URL_RAPIDITECATEGORIE);
    var data = new FormData();
    data.append('categorie', 'm');
    data.append('prenom', prenom);

    const reponse = await fetch(url, {
        method: "POST",
        body: data
    })
    if (!verifierStatus(reponse.status)) {
        return;
    }
    if (reponse.ok) {
        const res = await reponse.json();
        console.log(res.resultatsJoueur);
        console.log(res.resultatsJoueur['vitessememory']);
        let tabPrenoms = res.classementCategorie.map(x => x.prenom);
        const sum = Object.values(res.resultatsJoueur).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        let max = 500;
        let pourcent = (sum / 500) * 100;
        if (pourcent > 100) pourcent = 100; 

        console.log(sum);
        console.log(tabPrenoms);
        this.setState({
            resultatsJoueur: res.resultatsJoueur,
            tabPrenoms,
            pourcent
           
        })

    }
    else {
        alert("Désolé, il y a un problème.")
        window.location.href = "/"
    }

}

msgResultat()
{ 
    if (this.state.pourcent < 25) return 'Faible';
    else if (this.state.pourcent < 50) return 'Satisfaisante';
    else if (this.state.pourcent < 75) return 'Très bonne';
    else if (this.state.pourcent <= 100) return 'Excellente';
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
<Progress
    className='centre'
          type="circle"
          percent={this.state.pourcent}
          showInfo={false}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
        <div>Tu dois participer à tous les jeux sur cette page pour avoir une évaluation correcte.</div>
        <div>Ta capacité de mémorisation est : {this.msgResultat()} </div>
<Podium tabPrenoms={this.state.tabPrenoms}></Podium>

<div className='jeuVitesse'>
              <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🎩 <Link to='/vitessememory'> Le jeu du memory</Link></div>
    
          <p className="marge20">But du jeu : Trouver toutes les paires comme dans le classique jeu du Memory. Une différence avec le jeu classique : tu découvres les paires à ton rythme. Elles ne disparaissent pas au bout d'un certain temps. Le temps alloué est de 60 secondes pour tenter de trouver toutes les paires, un bonus de 30 points est alloué si tu finis le jeu.</p>
     <div>{this.prenom !== '' && this.state.resultatsJoueur["vitessememory"] !== null ? <div>Ton score : {this.state.resultatsJoueur["vitessememory"]}</div>:"Pas encore de résultat" }</div>
        <div className="centre"><Link to='classement/vitessememory'>Classement</Link></div>
      </div>


                <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >✅ <Link to='/vitessenombre'> Mémoire des nombres</Link></div>
   
          <p className="marge20">But du jeu : Mémoriser une série de chiffres pour pouvoir la restituer plus tard. La suite de chiffres augmente à chaque fois d'un chiffre jusqu'à 8 ensuite elle redescend pour revenir à 1 chiffre. Chaque nombre trouvé rapporte 5 points. Si tu réussis à revenir à 1 chiffre en moins de 75 secondes tu obtiens un bonus de 50 points.</p>
 
        <div className="centre"><Link to='classement/vitessenombre'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔺<Link to='/vitesseforme'> Mémoire des formes</Link></div>
    
           <p className="marge20">But du jeu : Se souvenir des formes et de la couleur des éléments présentés sur des cartes. Une fois les cartes mémorisées, elles sont retournées puis c'est à toi de les retrouver. Chaque bonne réponse rapporte 2 points puis 4 points, une mauvaise réponse te fait perdre 3 points. Le temps alloué est de 60 secondes.</p>
     
        <div className="centre "><Link to='classement/vitesseforme'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre titreVitesse" >🔵 <Link to='/vitessememoire'>Se souvenir des cercles</Link></div>
       
        <p className="marge20">But du jeu : On te montre un certain nombre de cercles dans une grille, tu dois mémoriser leurs emplacements et reproduire ce que tu viens de voir dans une nouvelle grille. Le temps alloué est de 90 secondes, chaque cercle trouvé rapporte 1 point, il n'y a pas de pénalité en cas d'erreur.</p>
       
        <div className="centre"><Link to='classement/vitessememoire'>Classement</Link></div>
      </div>
      <div className="presentationJeu marge20">
        <div className="centre titreVitesse">🐈‍⬛ <Link to='/vitessepaire'>L'animal précédent</Link></div>
      
        <p className="marge20">But du jeu : On te montre une suite d'images d'animaux, tu dois indiquer si l'animal que tu as vu juste avant est le même que l'animal affiché. Tu as 30 secondes pour obtenir le meilleur score, +2 points par bonne réponse, -3 points par mauvaise réponse.</p>
       
        <div className="centre"><Link to='classement/vitessepaire'>Classement</Link></div>
      </div>


</div>

       </div>
  }
}