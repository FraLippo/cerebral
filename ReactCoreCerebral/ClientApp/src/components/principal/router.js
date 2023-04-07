
import React from 'react';
import {ScrollRestoration, createBrowserRouter, Outlet } from "react-router-dom";
import Presentation from './Presentation';
import PresentationTemps from './PresentationTemps';
import PresentationEN from './Presentationanglais';
import { Menu } from 'antd';
import { itemsMenu } from './menu';
import PageFaute from '../commun/PageFaute';

 import TermService from './TermService';
 import Calcul from './Calcul';
 import Puzzle from './Puzzle';
 import Logique from './Logique';
 import Memoire from './Memoire';
 import ChiffresLettres from './ChiffresLettres';



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
// const Tableau = React.lazy(() => import('../../components/commun/Tableau'));
const JeuxFubuki = React.lazy(() => import('../../jeux/fubuki/jeuxFubuki'));
const JeuxMath = React.lazy(() => import('../../jeux/math/MathJeu'));
const JeuxMemoryGame = React.lazy(() => import('../../jeux/memoryGame/JeuxMemory'));
const JeuxSimon = React.lazy(() => import('../../jeux/simon/jeuxSimon'));
const JeuxBinero = React.lazy(() => import('../../jeux/binero/JeuxBinero'));
const JeuxPicross = React.lazy(() => import('../../jeux/picross/JeuxPicross'));
const JeuCouleur = React.lazy(() => import('../../jeux/vitesse/couleur/JeuCouleur'));
const Classement = React.lazy(() => import('../../jeux/vitesse/commun/Classement'));
const JeuOrdre = React.lazy(() => import('../../jeux/vitesse/ordre/JeuOrdre'));
const JeuSolitaire = React.lazy(() => import('../../jeux/vitesse/solitaire/JeuSolitaire'));
const JeuPaire = React.lazy(() => import('../../jeux/vitesse/paire/JeuPaire'));
const JeuCalcul = React.lazy(() => import('../../jeux/vitesse/calcul/JeuCalcul'));
const JeuIntrus = React.lazy(() => import('../../jeux/vitesse/intrus/JeuIntrus'));

const router = createBrowserRouter([
    {
      path: '/',
      element: <div><ScrollRestoration></ScrollRestoration>
      <div className='menuHaut'><Menu items={itemsMenu} mode="horizontal"></Menu></div>
      <div className='margeEcran'><Outlet></Outlet></div></div>,
      errorElement : <PageFaute></PageFaute>,
      children: [
       
          {
            index : true,
            element: <PresentationTemps />,
          },
          {
            path :"en",
            element: <PresentationEN />,
          },
          {
            path :"defi",
            element: <Presentation />,
          },
          {
            path: 'binero/:id',
            element: <JeuxBinero/>,
          },
          {
            path: 'calcul-mental/',
            element: <Calcul/>,
          },
          {
            path: 'logique/',
            element: <Logique/>,
          },
          {
            path: 'puzzle/',
            element: <Puzzle/>,
          },
          {
            path: 'memoire/',
            element: <Memoire/>,
            
          },
          {
            path: 'chiffres-lettres/',
            element: <ChiffresLettres/>,
            
          },
          {
            path: 'terms-of-service',
            element: <TermService/>,
            
          },
           {
            path:'jeux-bingo/:id',
            element: <JeuxBingo/>,
            
          },
          {
            path:'brain-game-bingo/:id',
            element: <JeuxBingo/>,
            
          },
          {
            path: 'jeuxCompte/:id',
            element: <JeuxCompte/>,
            
          },
          {
            path: 'brain-game-numbers/:id',
            element: <JeuxCompte/>,
            
          },
          {
            path: '/jeuxLettres/:id/:nbJoueurs/:niveau',
            element: <JeuxLettres/>,
            
          },
          {
            path: 'jeuxMemoireDessin/:id',
            element: <JeuxDessin/>,
            
          },
          {
            path: 'brain-game-drawing/:id',
            element: <JeuxDessin/>,
            
          },
          {
            path: 'jeuxEsp/:id',
            element: <JeuxEsp/>,
            
          },
          {
            path: 'brain-game-cards/:id',
            element: <JeuxEsp/>,
            
          },
          {
            path: 'jeuxPuzzle/:id',
            element: <JeuxPuzzle/>,
            
          },
          {
            path: 'brain-game-puzzle/:id',
            element: <JeuxPuzzle/>,
            
          },
          {
            path: 'jeuxTri/:id',
            element: <JeuxTri/>,
            
          },
           
          {
            path: 'brain-game-sorting/:id',
            element: <JeuxTri/>,
            
          },
          {
            path: 'jeuxSuite/:id',
            element: <JeuxSuite/>,
            
          },
          {
            path: 'brain-game-sequence/:id',
            element: <JeuxSuite/>,
            
          },
          {
            path: 'jeuxPuzzleRotation/:id',
            element: <JeuxPuzzleRotation/>,
            
          },
          {
            path: 'brain-game-rotate/:id',
            element: <JeuxPuzzleRotation/>,
            
          },
          {
            path: 'jeuxFamille/:id',
            element: <JeuxFamille/>,
            
          },
              {
            path: 'brain-game-family/:id',
            element: <JeuxFamille/>,
            
          },
          {
            path: 'jeuxMahJong/:id',
            element: <JeuxMah/>,
            
          },
              {
            path: 'brain-game-solo/:id',
            element: <JeuxMah/>,
            
          },
          {
            path: 'jeux-pyramide/:id',
            element: <JeuxPyramide/>,
            
          },
                {
            path: 'brain-game-pyramid/:id',
            element: <JeuxPyramide/>,
            
          },
          {
            path: 'jeux-fubuki/:id',
            element: <JeuxFubuki/>,
            
          },
                {
            path: 'brain-game-fubuki/:id',
            element: <JeuxFubuki/>,
            
          },
          {
            path: '/calcul/:id',
            element: <JeuxMath/>,
            
          },      
          {
            path: '/jeux-memory/:id',
            element: <JeuxMemoryGame/>,
            
          },
          {
            path: 'jeux-simon/:id',
            element: <JeuxSimon/>,
            
          },
           
             {
            path: '/picross/:id',
            element: <JeuxPicross/>,
            
          },
          {
            path: 'jeuxOrdre/:id',
            element: <JeuxOrdre/>,
            
          },
          {
            path: 'brain-game-order/:id',
            element: <JeuxOrdre/>,
            
          },
          {
            path: 'defi/:no',
            element: <DebutEtape/>,
            
          },
          {
            path: 'brain-challenge/:no',
            element: <DebutEtape/>,
            
          },
          {
            path: 'vitesseCouleur',
            element: <JeuCouleur/>,
            
          },
          {
            path: 'vitesseOrdre',
            element: <JeuOrdre/>,
            
          },
          {
            path: 'vitesseSolitaire',
            element: <JeuSolitaire/>,
            
          },
          {
            path: 'vitessePaire',
            element: <JeuPaire/>,
            
          },
          {
            path: 'vitesseCalcul',
            element: <JeuCalcul/>,
            
          },
          {
            path: 'vitesseIntrus',
            element: <JeuIntrus/>,
            
          },
          {
            path: 'classement/:type',
            element: <Classement/>,
          },
    
      ], 
    },
   

  ]);
  


export {router}