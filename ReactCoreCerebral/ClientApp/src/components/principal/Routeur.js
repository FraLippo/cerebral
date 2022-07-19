
import React, { Component, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MenuJeuFR from './MenuJeuFR';
import MenuJeuEN from './MenuJeuEN';
import TermService from './TermService';
import Calcul from './Calcul';
import Puzzle from './Puzzle';
import Logique from './Logique';
import Memoire from './Memoire';
import ChiffresLettres from './ChiffresLettres';
import Scroll from './Top';

import intl from 'react-intl-universal';



const JeuxLettres = React.lazy(() => import('../../jeux/lettres/JeuxLettres'));
const JeuxOrdre = React.lazy(() => import('../../jeux/ordre/JeuxOrdre'));
const JeuxPuzzle = React.lazy(() => import('../../jeux/puzzle/JeuxPuzzle'));
const JeuxSuite = React.lazy(() => import('../../jeux/suite/JeuxSuite'));
const JeuxTri = React.lazy(() => import('../../jeux/tri/JeuxTri'));
const JeuxEsp = React.lazy(() => import('../../jeux/esp/JeuxEsp'));
const JeuxDessin = React.lazy(() => import('../../jeux/dessin/JeuxDessin'));
const JeuxPuzzleRotation = React.lazy(() => import('../../jeux/puzzleRotation/JeuxPuzzleRotation'));
const JeuxCompte = React.lazy(() => import('../../jeux/compte/JeuxCompte'));
const JeuxFamille = React.lazy(() => import('../../jeux/memoireFamille/JeuxFamlle'));
const JeuxMah = React.lazy(() => import('../../jeux/mahjong/JeuxMahJong'));
const JeuxBingo = React.lazy(() => import('../../jeux/bingo/JeuxBingo'));
const JeuxPyramide = React.lazy(() => import('../../jeux/pyramide/JeuxPyramide'));
const DebutEtape = React.lazy(() => import('../../jeux/concours/DebutEtape'));
const Tableau = React.lazy(() => import('../../components/commun/Tableau'));
const JeuxFubuki = React.lazy(() => import('../../jeux/fubuki/jeuxFubuki'));
const JeuxMath = React.lazy(() => import('../../jeux/math/MathJeu'));
const JeuxMemoryGame = React.lazy(() => import('../../jeux/memoryGame/JeuxMemory'));
const JeuxSimon = React.lazy(() => import('../../jeux/simon/jeuxSimon'));


export default class Routeur extends Component {

    render() {

        return (
            <BrowserRouter>
            <Scroll></Scroll>
                  <Suspense fallback={<div>{intl.get('CHARGEMENT')}</div>}>
                { <Switch>
                    <Route exact path='/' component={MenuJeuFR} />
                    <Route exact path='/fr' component={MenuJeuFR} />
                    <Route exact path='/en' component={MenuJeuEN} />
                    <Route path='/(jeuxOrdre|brain-game-order)/:id' render={(props) => <JeuxOrdre {...props} keyProp={'jeuxOrdre'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxPuzzle|brain-game-puzzle)/:id' render={(props) => <JeuxPuzzle {...props} keyProp={'jeuxPuzzle'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxSuite|brain-game-sequence)/:id' render={(props) => <JeuxSuite {...props} keyProp={'jeuxSuite'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxEsp|brain-game-cards)/:id' render={(props) => <JeuxEsp {...props} keyProp={'jeuxEsp'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxTri|brain-game-sorting)/:id' render={(props) => <JeuxTri {...props} keyProp={'jeuxTri'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxPuzzleRotation|brain-game-rotate)/:id' render={(props) => <JeuxPuzzleRotation {...props} keyProp={'jeuxPuzzleRotation'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxCompte|brain-game-numbers)/:id' render={(props) => <JeuxCompte {...props} keyProp={'jeuxCompte'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/jeuxLettres/:id/:nbJoueurs/:niveau' render={(props) => <JeuxLettres {...props} keyProp={'jeuxLettres'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxMemoireDessin|brain-game-drawing)/:id' render={(props) => <JeuxDessin {...props} keyProp={'jeuxMemoire'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxFamille|brain-game-family)/:id' render={(props) => <JeuxFamille {...props} keyProp={'jeuxFamille'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeuxMahJong|brain-game-solo)/:id' render={(props) => <JeuxMah {...props} keyProp={'jeuxMah'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeux-pyramide|brain-game-pyramid)/:id' render={(props) => <JeuxPyramide {...props} keyProp={'jeuxPyramide'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeux-bingo|brain-game-bingo)/:id' render={(props) => <JeuxBingo {...props} keyProp={'jeuxBingo'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(jeux-fubuki|brain-game-fubuki)/:id' render={(props) => <JeuxFubuki {...props} keyProp={'jeuxFubuki'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/jeux-simon/:id' render={(props) => <JeuxSimon {...props} keyProp={'jeuxSimon'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/calcul/:id' render={(props) => <JeuxMath {...props} keyProp={'jeuxMath'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/calcul-mental/' render={(props) => <Calcul {...props} keyProp={'calculMental'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/logique/' render={(props) => <Logique {...props} keyProp={'logique'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/puzzle/' render={(props) => <Puzzle {...props} keyProp={'puzzle'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/memoire/' render={(props) => <Memoire {...props} keyProp={'memoire'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/chiffres-lettres/' render={(props) => <ChiffresLettres {...props} keyProp={'ChiffresLettres'} key={Math.floor(Math.random() * 1000)} />} />

                    <Route path='/calcul/:id' render={(props) => <JeuxMath {...props} keyProp={'jeuxMath'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/jeux-memory/:id' render={(props) => <JeuxMemoryGame {...props} keyProp={'jeuxMemoryGame'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(tableau|board/en)' render={(props) => <Tableau {...props} keyProp={'tableau'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/(defi|brain-challenge)/:no' render={(props) => <DebutEtape {...props} keyProp={'debutEtape'} key={Math.floor(Math.random() * 1000)} />} />
                    <Route path='/terms-of-service' render={(props) => <TermService {...props} keyProp={'termService'} key={Math.floor(Math.random() * 1000)} />} />


                </Switch> 
               
                }
                </Suspense>
            </BrowserRouter>

        );
    }
}