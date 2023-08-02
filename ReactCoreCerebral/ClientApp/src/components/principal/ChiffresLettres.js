import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import compte from '../../images/compte.webp';
import motLong from '../../images/motLong.webp';

import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Helmet } from 'react-helmet';


export default class ChiffreLetttre extends Component {

  constructor()
  {
    super();
   
  }


  render() {
    return <div>
 <Helmet>
            <title>Sport cérébral : Des chiffres et des lettres</title>
            <meta name="description" content='Retrouvez le classique des jeux télévisés "Des chiffres et Des lettres" dans une version revisitée. Les jeux sont gratuits et ne nécessitent pas une inscription au préalable. '/>
        </Helmet>
<div className="titre centre couleurTitre">Jeux d'entrainement cérébral</div>
<div className='centre'>evalquiz.com : le site numéro 1 du divertissement intelligent</div>

    
        <h1 className="titre couleurTitre centre">Des chiffres et des lettres</h1>
   
    
        <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={24}>
            <h2>Le mot le plus long</h2>
            <p>Un jeu qui ressemble au jeu du mot le plus long de l'émission <b>"Des chiffres et des lettres"</b>.</p>
            <p>"Le Mot le Plus Long : Testez vos compétences en vocabulaire et remportez des défis passionnants ! Plongez dans une expérience de jeu linguistique captivante où votre talent pour les mots est mis à l'épreuve. Déjouez les lettres mélangées, formez le mot le plus étendu possible et révélez votre maîtrise des mots. Que vous soyez un passionné des jeux de lettres ou amateur de défis intellectuels, "Le Mot le Plus Long" vous offre une expérience unique qui stimulera votre esprit tout en vous divertissant.</p>
            <p>Le programme accepte tous les mots et les verbes conjugués. Dans l'esprit des mots acceptés on est plus proche du Scrabble que des chiffres et des lettres. </p>
            <p>La partie se joue en 3 manches, si vous remportez la manche, c'est à dire si vous trouvez un mot plus long que celui de l'ordinateur, vous gagnez 3 points (6 points pour la dernière manche) plus le nombre de lettres du mot.</p>

            <div className="centre"><img className="espaceHaut img-responsive" width="500" height="66" src={motLong} alt="le mot le plus long"></img></div>

            <div> <Card title={<span style={{ whiteSpace: 'normal' }}>Le mot le plus long</span>}>
              <ul>
                <li><Link to={"/jeuxlettres/0/1/1"}>Le mot le plus long niveau facile contre l'ordinateur.</Link></li>
                <li><Link to={"/jeuxlettres/0/1/2"}>Le mot le plus long niveau intermédiaire contre l'ordinateur.</Link></li>
                <li><Link to={"/jeuxlettres/0/1/3"}>Le mot le plus long niveau difficile contre l'ordinateur.</Link></li>
                <li><Link to={"/jeuxlettres/0/1/4"}>Le mot le plus long niveau très difficile contre l'ordinateur.</Link></li>
                {/* <li><Link to={"/jeuxlettres/0/1/5"}>Le mot le plus long niveau impossible contre l'ordinateur (mot de 9 lettres possibles).</Link></li> */}
              </ul>
              {/* <p>La fréquentation de ce site n'est pas suffisante pour trouver des joueurs en ligne. Vous devez inviter vos propres amis.
            Il suffit de leur envoyer ce lien <b>{process.env.REACT_APP_URL_JEUXLETTRES}/{this.gameNumber}/2/2 </b> <span className="copier" onClick={this.copier}>copier</span> par mail ou par messagerie.
            Ensuite vous devez attendre votre ou vos camarades de jeu (4 au maximum) ou revenir plus tard quand ils seront disponibles, un message est affiché dès qu'un autre joueur vient dans la partie.
            Le lien vers votre salle de jeu ne change pas, vous pouvez venir jouer quand vous le souhaitez, il suffit de se synchroniser avec vos amis pour jouer en même temps.</p>
              <ul>
                <li><Link to={"/jeuxlettres/" + this.gameNumber + "/2/2"}>Jouer au mot le plus long niveau avec vos amis en ligne.</Link></li>
              </ul> */}
            </Card>
            </div>
          </Col>
        </Row>
        <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={24}> 
          <h2>Le compte est bon</h2>
          <p>Bienvenue dans "Le Compte est Bon", un jeu qui ressemble au "Compte est bon" de la célèbre émission <b>"Des chiffres et des lettres"</b>.</p>

<p>Le principe du jeu est simple : vous serez confronté à une sélection de chiffres aléatoires et votre objectif sera de les combiner pour obtenir un résultat spécifique. Que vous soyez un génie des mathématiques ou simplement passionné par les énigmes, "Le Compte est Bon" vous offre une expérience divertissante et cérébrale.
Vous devrez faire preuve de créativité et d'ingéniosité pour trouver les bonnes combinaisons en utilisant les opérations mathématiques de base telles que l'addition, la soustraction, la multiplication et la division. </p>
<p>Êtes-vous prêt à vous plonger dans l'univers fascinant du jeu  Le Compte est Bon ? Alors, enfilez votre chapeau de mathématicien et préparez-vous à résoudre des puzzles passionnants pour devenir le maître incontesté des calculs ! Le temps n'est pas limité. Vous pouvez recommencer autant de fois que vous le voulez. Il y a toujours une solution et vous pouvez à chaque fois afficher la correction.</p>


<p>Que le défi commence !</p>
          
           
              <div className="centre"><img className="img-responsive" width="230" height="278" src={compte} alt="le compte est bon"></img></div>

       
            <SousMenu type="compte" titre="TITLE_COMPTE"></SousMenu>
           
          </Col>
          
        </Row>
 <Ad></Ad>

         </div>
  }
}