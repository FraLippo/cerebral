import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import puzzle from '../../images/puzzle.webp';
import puzzleRotation from '../../images/puzzleRotation.webp';
import compte from '../../images/compte.webp';
import ordre from '../../images/ordre.webp';
import esp from '../../images/esp.webp';
import dessin from '../../images/dessin.webp';
import famille from '../../images/famille.webp';
import pyramide from '../../images/pyramide.webp';
import imagePre from '../../images/imagePre.webp';
import fubuki from '../../images/fubuki.webp';
import bingo from '../../images/bingo.webp';
import tri from '../../images/tri.webp';
import solitaire from '../../images/solitaire.webp';
import InstallBouton from '../commun/InstallBouton';

import { Link } from 'react-router-dom';


export default class PresentationEN extends Component {


  async copier() {
    await navigator.clipboard.writeText(process.env.REACT_APP_URL_JEUXLETTRES + "/" + this.gameNumber + "/2/2");
  }
  render() {
    return <div>


      <h1 className="titre centre">Brain games</h1>
      <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
      <Row gutter={8} className="espaceHaut">
        <Col md={24}>
          <p>Train your brain by practising a set of simple exercises and small games to improve your cognitive abilities and intelligence.
            All the games are free and do not require any registration.</p>
          <p>Each series of tests stimulates a different part of the brain: memory, concentration capacity, reaction speed, discernment of colours and shapes...</p>
          <p>These brain games are easy to understand and can be played by adults, seniors or kids.</p>
          <p>The games are by no means scientific exercises. They are mostly small fun games that are used to evaluate one's abilities in relation to others. At the end of each game you get your ranking and your position in relation to the other players.</p>
          <p>If you have any questions, you can contact us on <a href="https://twitter.com/evalquiz">Twitter</a>.</p>
        </Col>
      </Row>

      <div>
        <h1 className="titre couleurTitre centre">The challenges</h1>
        <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
        <Row gutter={8} className="espaceHaut">

          <Col md={10}>
            <h2>Can you pass a challenge? (new)</h2>
            <p>A challenge is a set of small games and brain tests, all your skills and agility will be needed to complete these challenges.</p>
            <p>It is best to practice with the games below before starting a challenge.</p>
           
          </Col>
          <Col md={14}>
            <SousMenu type="defiCerebral" titre="NOM_DEFI_CEREBRAL"></SousMenu>
            <SousMenu type="defiCalcul" titre="NOM_DEFI_CALCUL"></SousMenu>
          </Col>
        </Row>
      </div>



      <h1 className="titre couleurTitre centre">The puzzles</h1>
      <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
      <Row gutter={8} className="espaceHaut">

        <Col md={10}>
          <h2>Puzzle: reconstructing an image</h2>
          <p>In this puzzle-type game a picture appears for a few seconds, then you have to put it back together in the right order.</p>
          <p>This game improves your memory and logic skills.</p>
          <p>All online puzzles are free and do not require any registration.</p>
          <div className="centre"><img className="img-responsive" width="300" height="102" src={puzzle} alt="The puzzles"></img></div>

        </Col>
        <Col md={14}>
          <SousMenu type="puzzle" titre="PUZZLE_TITLE"></SousMenu>
        </Col>

      </Row>
      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>Puzzle: getting an image back in order</h2>
          <p>In this puzzle type game you have to put pieces of a picture back in place to reconstruct a complete picture.</p>
          <p>This game improves the brain's logical ability and concentration.</p>
          <div className="centre"><img className="img-responsive" width="300" height="170" src={puzzleRotation} alt="puzzle rotation"></img></div>

        </Col>
        <Col md={14}>
          <SousMenu type="puzzleRotation" titre="ROTATION_TITLE"></SousMenu>
        </Col>
      </Row>


      <h1 className="titre couleurTitre centre">The logic</h1>
      <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>The count is good</h2>
          <p>You have to find a given number from other numbers and the 4 operations.</p>
          <p>There is no time limit. You can start over as many times as you want. There is always a solution and you can display the correction each time.</p>
          <div className="centre"><img className="img-responsive" width="300" height="193" src={compte} alt="The count is good"></img></div>

        </Col>
        <Col md={14}>
          <SousMenu type="compte" titre="TITLE_COMPTE"></SousMenu>
        </Col>
      </Row>
      <Row gutter={8} className="espaceHaut">

        <Col md={10}>
          <h2>The Fubuki</h2>
          <p>Fubuki is one of the many Japanese-inspired puzzle games. In this game you have to replace the question marks with numbers. The principle is simple, the sum of the numbers in a column has to match the number at the top of the column and the sum of the numbers in a row has to match the number at the end of the row.</p>
          <p>An easy little game that can be complex in the more difficult levels.</p>
          <div className="centre"><img className="img-responsive" width="300" height="102" src={fubuki} alt="the fubuki game"></img></div>

        </Col>
        <Col md={14}>
          <SousMenu type="fubuki" titre="FUBUKI_TITLE"></SousMenu>
        </Col>
      </Row>
      <Row gutter={8} className="espaceHaut">

        <Col md={10}>
          <h2>Pyramid of numbers</h2>
          <p>This little game combines calculation and logic, you have to find the missing numbers in a pyramid of numbers. Each number in a box is the sum of the numbers in the two boxes below it.</p>
          <p>A simple, quick and easy test to develop mental calculation.</p>
          <div className="centre"><img className="img-responsive" width="300" height="102" src={pyramide} alt="Pyramid of numbers"></img></div>

        </Col>
        <Col md={14}>
          <SousMenu type="pyramide" titre="PYRAMIDE_TITLE"></SousMenu>
        </Col>
      </Row>

      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>The Bingo</h2>
          <p>The classic game of Bingo</p>
          <p>You play against two other virtual people, to win you have to complete a whole row or column of your grid.</p>
          <p>The time between draws depends on the difficulty level. You have 3s to mark your grid in the easy level and 2s in the hard level.</p>
          <p>This game helps to improve your concentration skills.</p>

        </Col>
        <Col md={14}>
          <SousMenu type="bingo" titre="BINGO_TITLE"></SousMenu>
          <div className="centre"><img className="img-responsive" width="300" height="295" src={bingo} alt="game of bingo"></img></div>
        </Col>
      </Row>



      <Row gutter={8} className="espaceHaut">
        <Col md={10}>

          <h2>Getting the items back in order</h2>


          <p>Some numbers or letters are scattered on the screen, you have to put them back in order from the smallest to the largest as quickly as possible by clicking on them.
            You can then evaluate your reaction time in relation to other players.</p>
          <p>The tests vary according to the number of elements on the screen, the colour and the shape of the elements.</p>
          <p>This test improves your logical abilities and increases your ability to discern shapes and colours.</p>




          <div className="centre"><img className="petiteImage" width="300" height="101" src={ordre} alt="Getting the numbers in order"></img></div>

        </Col>
        <Col md={14}>
          <SousMenu type="ordre" titre="ORDRE_TITLE"></SousMenu>
        </Col>
      </Row>


      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>Find the solitaire tile</h2>
          <p>A speedy game where you have to find the solitaire tile of a mahjong game.</p>
          <p>This very fast game helps to improve your ability to concentrate.</p>
          <div className="centre"><img className="img-responsive" width="300" height="289" src={solitaire} alt="solitary"></img></div>
        </Col>
        <Col md={14}>
          <SousMenu type="mahJong" titre="MAH_TITLE"></SousMenu>
        </Col>
      </Row>


      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>Sorting items</h2>
          <p>In this game a number or a letter is displayed on the screen and you have to select the container in which it is located.</p>
          <p>You have to sort the items as quickly as possible. This test exercises your memory, tests your speed and your ability to concentrate.</p>
          <div className="centre"><img className="petiteImage" width="300" height="170" src={tri} alt="jeu trier"></img></div>
        </Col>

        <Col md={14}>
          <SousMenu type="tri" titre="TRI_TITLE"></SousMenu>
        </Col>
      </Row>

      <Row gutter={8} className="espaceHaut">
        <Col md={10}>
          <h2>Find the families</h2>
          <p>A speedy game, you have to find all the images that belong to the same family before the end of the countdown.</p>
          <p>This test improves your ability to react and concentrate.</p>


          <div className="centre"><img className="img-responsive" width="300" height="287" src={famille} alt="game family"></img></div>
        </Col>

        <Col md={14}>
          <SousMenu type="memoireFamille" titre="FAMILLE_TITLE"></SousMenu>
        </Col>
      </Row>


      
        <h1 className="titre couleurTitre centre">The memory</h1>
        <Row className="centre"><img src={border} alt="bordure" width="100" height="41"></img></Row>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Memorize cards</h2>
            <p>In this game some cards are displayed for a few seconds, you have to memorize them and then reconstitute the list of cards.</p>

            <p>These tests quickly become very difficult as soon as the number of cards increases. Is it only possible to remember 8 cards in a few seconds?</p>

            <p>This test determines your ability to remember shapes and colours.</p>
            <div className="centre"><img className="img-responsive" width="300" height="101" src={esp} alt="memory cards game"></img></div>
          </Col>
          <Col md={14}>
            <SousMenu type="esp" titre="ESP_TITLE"></SousMenu>
          </Col>
        </Row>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Memorize a drawing</h2>
            <p>A new game to train your memory. It's about reconstructing a drawing after seeing it for a few seconds.</p>
            <p>This test determines your ability to memorize shapes and colours in space.</p>

            <div className="centre"><img className="img-responsive" width="300" height="282" src={dessin} alt="game memory drawing"></img></div>
          </Col>

          <Col md={14}>
            <SousMenu type="memoireDessin" titre="DESSIN_TITLE"></SousMenu>
          </Col>
        </Row>

        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Remember the previous image</h2>

            <p>In this brain game several images appear successively on the screen, you have to click on a button as soon as the same image appears successively.</p>
            <p>A simple game that allows you to test your memory and your concentration.</p>

            <div className="centre"><img className="img-responsive" width="300" height="98" src={imagePre} alt="game remember cards"></img></div>
          </Col>

          <Col md={14}>
            <SousMenu type="suite" titre="SUITE_TITLE"></SousMenu>
          </Col>
        </Row>
     
      <Row><Ad></Ad></Row>
      <InstallBouton></InstallBouton>
      <h2>Crédits</h2>
      <p>The borders by <a href="https://thenounproject.com/zzyzz/">Olena Panasovska.</a></p>
      <p>The Zener cards by <a href="https://commons.wikimedia.org/w/index.php?curid=31927664">Mikhail Ryazanov</a></p>
      <p>Icons for the family game : <a href="https://thenounproject.com/nicore/collection/love-and-wedding/">Love and wedding</a>-<a href="https://thenounproject.com/thepyramidschool/collection/dance-isotype/>">Ballerina</a>-<a href="https://thenounproject.com/sevag/collection/arabesque-design/">Arabesque</a> </p>
      <p>Photo of animals and paintings for the puzzles games : <a href="https://commons.wikimedia.org/">Wikimedia Commons</a> license:  Creative Commons Attribution 2.0 Generic</p>
      <p>Icons of the mahjong by <a href="http://www.martinpersson.org/">Martin Persson</a></p>
      <p className="centre"><Link to={'/terms-of-service'}>Terms of service</Link></p>
    </div>
  }
}