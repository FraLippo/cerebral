import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import ordre from '../../images/ordre.webp';
import bingo from '../../images/bingo.webp';
import famille from '../../images/famille.webp';
import tri from '../../images/tri.webp';
import solitaire from '../../images/solitaire.webp';

import { Helmet } from 'react-helmet';



export default class MenuJeuFR extends Component {



  render() {
    return <div>
 <Helmet>
            <title>Sport cérébral : la logique </title>
            <meta name="description" content="Des jeux et des tests amusants de sport cérébral basés sur la logique et la concentration pour faire travailler son cerveau. Les tests en ligne sont tous gratuits. Ils ne nécessitent pas d'inscription."/>
        </Helmet>
      <div className="titre centre couleurTitre">Sport cérébral</div>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <h2 className="titre couleurTitre centre">Les tests de logique</h2>
      <Row className="centre"><img src={border} alt="bordure"></img></Row>


        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Remettre les éléments dans l'ordre</h2>
            <p>Des éléments sont disséminés sur l'écran, il faut les remettre dans l'ordre du plus petit au plus grand le plus rapidement en cliquant dessus.</p>
            <p>Vous pouvez évaluer ensuite votre temps de réaction par rapport aux autres joueurs.</p>
            <p>Les tests varient en fonction du nombre d'éléments présents à l'écran, de la couleur et de la forme des éléments.</p>
            <p>Ce test améliore vos capacités logiques et accroit votre capacité à discerner les formes et les couleurs.</p>
            <div className="centre"><img className="petiteImage" width="300" height="101" src={ordre} alt="jeu remettre dans l'ordre"></img></div>

          </Col>
          <Col md={14}>
            <SousMenu type="ordre" titre="ORDRE_TITLE"></SousMenu>
          </Col>
        </Row>

        <Row className="centre"><img src={border} alt="bordure"></img></Row>


        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Le Bingo</h2>
            <p>Le classique jeu de Bingo qui est une variante du Loto.</p>
            <p>Vous jouez contre d'autres personnes virtuelles qui ont toutes une grille comme la vôtre. Pour gagner vous devez compléter une ligne ou une colonne complète de votre grille.</p>
            <p>Le temps entre deux tirages au sort dépend du niveau de difficulté, il devient de plus en plus rapide au fil des tirages. </p>
            <p>Ce jeu permet d'améliorer votre capacité de concentration.</p>

          </Col>
          <Col md={14}>
            <SousMenu type="bingo" titre="BINGO_TITLE"></SousMenu>
            <div className="centre"><img className="img-responsive" width="300" height="295" src={bingo} alt="le jeu du bingo"></img></div>
          </Col>
        </Row>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Retrouvez la tuile solitaire</h2>
            <p>Un jeu de rapidité pour retrouver la tuile solitaire d'un jeu de mah-jong.</p>
            <p>Ce jeu très rapide permet d'améliorer sa capacité de concentration. </p>
            <div className="centre"><img className="img-responsive" width="300" height="289" src={solitaire} alt="solitaire"></img></div>
          </Col>
          <Col md={14}>
            <SousMenu type="mahJong" titre="MAH_TITLE"></SousMenu>
          </Col>
        </Row>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>

        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Trier des éléments</h2>
            <p>Pour ce jeu vous voyez apparaitre un nombre ou une lettre et vous devez sélectionnez le récipient dans lequel il se trouve.</p>
            <p>Vous devez trier les éléments le plus vite possible. Ce test exerce votre mémoire, teste votre rapidité et votre capacité de concentration.</p>
            <div className="centre"><img className="petiteImage" width="300" height="170" src={tri} alt="jeu trier"></img></div>
          </Col>

          <Col md={14}>
            <SousMenu type="tri" titre="TRI_TITLE"></SousMenu>
          </Col>
        </Row>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>

      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>Retrouvez les familles</h2>
          <p>Un jeu de rapidité pour retrouver toutes les images qui appartiennent à la même famille.</p>
          <p>Ce test permet d'améliorer sa capacité de réaction et de concentration. </p>
          <div className="centre"><img className="img-responsive" width="300" height="287" src={famille} alt="memoire famille"></img></div>
        </Col>

        <Col md={14}>
          <SousMenu type="memoireFamille" titre="FAMILLE_TITLE"></SousMenu>
        </Col>
      </Row>
      <Row className="centre"><img src={border} alt="bordure"></img></Row>

      <Ad></Ad>
  </div>
  }
}