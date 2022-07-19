
import React, { Component } from 'react';
import border from '../../images/border.png';
import {Col, Row} from 'antd';
import SousMenu from './SousMenu';
import pyramide from '../../images/pyramide.webp';
import calcul from '../../images/calcul.webp';
import fubuki from '../../images/fubuki.webp';
import { Helmet } from 'react-helmet';
import { analytics } from '../../components/commun/analytics';

export default class Logique extends Component {
 
  constructor()
  {
    super();
    analytics();
  }

  render() {
    return <div>
 <Helmet>
            <title>Sport cérébral : le calcul mental</title>
            <meta name="description" content="Des jeux et des tests amusants de sport cérébral basés sur le calcul mental et les mathématiques. Les tests sont pour tous les niveaux scolaires à partir de 10 ans, ils sont tous gratuits."/>
        </Helmet>
    
<div className="titre centre couleurTitre">Sport cérébral</div>
<div className='centre'>evalquiz.com : le site numéro 1 du divertissement intelligent</div>
      
<h2 className="titre couleurTitre centre">Le calcul mental</h2>



<Row className="centre"><img src={border} alt="bordure"></img></Row>


        <Row gutter={8} className="espaceHaut">

          <Col md={10}>
            <h2>Le calcul mental</h2>
            <p>Avec ce jeu vous devez résoudre des petits problèmes de calcul mental en ligne : des opérations, des opérateurs manquants, des conversions. Le temps n'est pas limité.</p>
            <p>Ces tests de maths mentales peuvent être abordés dès le cm2.</p>
            <p>Les problèmes de calcul sont issus d'un <a href="https://reussir-cycle2-38.web.ac-grenoble.fr/sites/default/files/media-fichiers/2021-07/banque_pb_ce2_5_07_2021_0.pdf">document de l'Education nationale</a> (niveau CE2).</p>
            <p>Vous pouvez ainsi tester vos capacités en calcul et en raisonnement logique.</p>
            <div className="centre"><img className="img-responsive" width="283" height="100" src={calcul} alt="Le calcul mental"></img></div>

          </Col>
          <Col md={14}>
            <SousMenu type="math" titre="MATH_TITLE"></SousMenu>
          </Col>
        </Row>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>
        <Row gutter={8} className="espaceHaut">

          <Col md={10}>
            <h2>La pyramide des nombres</h2>
            <p>Ce petit jeu associe calcul et logique, vous devez retrouver les nombres manquants dans une pyramide de nombres. Chaque nombre dans une case étant la somme des nombres dans les deux cases situées juste en dessous.</p>
            <p>Un test simple, rapide et facile pour développer le calcul mental.</p>
            <div className="centre"><img className="img-responsive" width="300" height="102" src={pyramide} alt="pyramide de nombres"></img></div>

          </Col>
          <Col md={14}>
            <SousMenu type="pyramide" titre="PYRAMIDE_TITLE"></SousMenu>
          </Col>
        </Row>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>
        <Row gutter={8} className="espaceHaut">

          <Col md={10}>
            <h2>Le Fubuki</h2>
            <p>Le Fubuki fait partie de ces nombreux jeux de réflexion d'inspiration japonaise. Dans ce jeu vous devez remplacer les points d'interrogation par des nombres. Le principe est simple, il suffit que la somme des nombres d'une colonne corresponde au nombre en haut de la colonne et que la somme des nombres d'une ligne corresponde au nombre en fin de la ligne.</p>
            <p>Un petit jeu facile qui peut s'avérer complexe dans les niveaux plus difficiles.</p>
            <div className="centre"><img className="img-responsive" width="300" height="102" src={fubuki} alt="le jeu du fubuki"></img></div>

          </Col>
          <Col md={14}>
            <SousMenu type="fubuki" titre="FUBUKI_TITLE"></SousMenu>
          </Col>
        </Row>
       

         </div>
  }
}