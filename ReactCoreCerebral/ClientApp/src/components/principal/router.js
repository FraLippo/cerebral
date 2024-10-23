
import React from 'react';
import {ScrollRestoration, createBrowserRouter, Outlet } from "react-router-dom";

import PresentationTemps from './PresentationTemps';

import { Menu } from 'antd';
import { itemsMenu } from './menu';
import PageFaute from '../commun/PageFaute';
import CreationGrilleRobot from '../../jeux/vitesse/robot/CreationGrilleRobot';

const Presentation = React.lazy(() => import('./Presentation'));
const Calcul = React.lazy(() => import('./Calcul'));
const Puzzle = React.lazy(() => import('./Puzzle'));
const Logique = React.lazy(() => import('./Logique'));
const Memoire = React.lazy(() => import('./Memoire'));
const ChiffresLettres = React.lazy(() => import('./ChiffresLettres'));
//const TermService = React.lazy(() => import('./TermService'));
// const PresentationEN = React.lazy(() => import('./Presentationanglais'));



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
const JeuxPhoto = React.lazy(() => import('../../jeux/photo/JeuPhoto'));

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
const ClassementMois =  React.lazy(() => import('../../jeux/vitesse/commun/ClassementMois'));
const JeuOrdre = React.lazy(() => import('../../jeux/vitesse/ordre/JeuOrdre'));
const JeuSolitaire = React.lazy(() => import('../../jeux/vitesse/solitaire/JeuSolitaire'));
const JeuPaire = React.lazy(() => import('../../jeux/vitesse/paire/JeuPaire'));
const JeuCalcul = React.lazy(() => import('../../jeux/vitesse/calcul/JeuCalcul'));
const JeuIntrus = React.lazy(() => import('../../jeux/vitesse/intrus/JeuIntrus'));
const JeuOperation = React.lazy(() => import('../../jeux/vitesse/operation/JeuOperation'));
const JeuChemin = React.lazy(() => import('../../jeux/vitesse/chemin/JeuChemin'));
const JeuBurger = React.lazy(() => import('../../jeux/vitesse/burger/JeuBurger'));
const JeuMonnaie = React.lazy(() => import('../../jeux/vitesse/monnaie/JeuMonnaie'));
const JeuEcrire = React.lazy(() => import('../../jeux/vitesse/ecrire/JeuEcrire'));
const JeuTresor = React.lazy(() => import('../../jeux/vitesse/tresor/JeuTresor'));
const JeuAddition = React.lazy(() => import('../../jeux/vitesse/addition/JeuAddition'));
const JeuForme = React.lazy(() => import('../../jeux/vitesse/forme/JeuForme'));
// const JeuTaupe = React.lazy(() => import('../../jeux/vitesse/taupe/JeuTaupe'));
const JeuLettres = React.lazy(() => import('../../jeux/vitesse/lettres/JeuLettres'));
const JeuNote = React.lazy(() => import('../../jeux/vitesse/note/JeuNote'));
const JeuMemoire = React.lazy(() => import('../../jeux/vitesse/memoire/JeuMemoire'));
const JeuCercle = React.lazy(() => import('../../jeux/vitesse/cercle/JeuCercle'));
const JeuRecensement = React.lazy(() => import('../../jeux/vitesse/recensement/JeuRecensement'));
const JeuPanneaux = React.lazy(() => import('../../jeux/vitesse/panneaux/JeuPanneaux'));
const JeuAri = React.lazy(() => import('../../jeux/vitesse/arithmetique/JeuAri'));
const JeuMatch = React.lazy(() => import('../../jeux/vitesse/match/JeuMatch'));
const JeuNombre = React.lazy(() => import('../../jeux/vitesse/nombre/JeuNombre'));
const JeuMemory = React.lazy(() => import('../../jeux/vitesse/memory/JeuMemory'));
const JeuTresse = React.lazy(() => import('../../jeux/vitesse/tresse/JeuTresse'));
const JeuBoogle = React.lazy(() => import('../../jeux/vitesse/boogle/JeuBoogle'));
const JeuTaquin = React.lazy(() => import('../../jeux/vitesse/taquin/JeuTaquin'));
const JeuBonneteau = React.lazy(() => import('../../jeux/vitesse/bonneteau/JeuBonneteau'));
const JeuRobot = React.lazy(() => import('../../jeux/vitesse/robot/JeuRobot'));
const JeuComplet = React.lazy(() => import('../../jeux/vitesse/complet/JeuComplet'));
const TestMemoire = React.lazy(() => import('./TestMemoire'));
const JeuCreationRobot = React.lazy(() => import('./../../jeux/vitesse/robot/CreationGrilleRobot'));

const TestCalcul = React.lazy(() => import('./TestCalcul'));
const TestConcentration = React.lazy(() => import('./TestConcentration'));
const TestPlanification = React.lazy(() => import('./TestPlanification'));
const TestLettres = React.lazy(() => import('./TestLettres'));
const TestCulture = React.lazy(() => import('./TestCulture'));


const router = createBrowserRouter([
    {
      path: '/',
      element: <div><ScrollRestoration
      getKey={(location) => {
        return location.pathname;
      }}
      ></ScrollRestoration>
      <div className='menuHaut'><Menu items={itemsMenu} mode="horizontal"></Menu></div>
      <div className='margeEcran'><Outlet></Outlet></div></div>,
      errorElement : <PageFaute></PageFaute>,
      children: [
       
          {
            index : true,
            element: <JeuRobot />,
          },
          {
            path :"en",
            element: <PageFaute />,
          },
          {
            path :"c",
            element: <JeuCreationRobot />,
          },
          {
            path :"defi",
            element: <Presentation />,
          },
          {
            path :"test-memoire",
            element: <TestMemoire />,
          },
          {
            path :"test-concentration",
            element: <TestConcentration />,
          },
          {
            path :"test-calcul",
            element: <TestCalcul />,
          },
          {
            path :"test-lettres",
            element: <TestLettres />,
          },
          {
            path :"test-culture",
            element: <TestCulture />,
          },
          {
            path :"test-planification",
            element: <TestPlanification />,
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
          // {
          //   path: 'terms-of-service',
          //   element: <TermService/>,
            
          // },
           {
            path:'jeux-bingo/:id',
            element: <JeuxBingo/>,
            
          },
          {
            path:'jeux-photo/:id',
            element: <JeuxPhoto/>,
            
          },
          {
            path:'brain-game-bingo/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxcompte/:id',
            element: <JeuxCompte/>,
            
          },
          {
            path: 'brain-game-numbers/:id',
            element: <PageFaute/>
            
          },
          {
            path: '/jeuxlettres/:id/:nbJoueurs/:niveau',
            element: <JeuxLettres/>,
            
          },
          {
            path: 'jeuxmemoiredessin/:id',
            element: <JeuxDessin/>,
            
          },
          {
            path: 'brain-game-drawing/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxesp/:id',
            element: <JeuxEsp/>,
            
          },
          {
            path: 'brain-game-cards/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxpuzzle/:id',
            element: <JeuxPuzzle/>,
            
          },
          {
            path: 'brain-game-puzzle/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxtri/:id',
            element: <JeuxTri/>,
            
          },
           
          {
            path: 'brain-game-sorting/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxSuite/:id',
            element: <JeuxSuite/>,
            
          },
          {
            path: 'brain-game-sequence/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxpuzzlerotation/:id',
            element: <JeuxPuzzleRotation/>,
            
          },
          {
            path: 'photo/:id',
            element: <JeuxPhoto/>,
            
          },
          {
            path: 'brain-game-rotate/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxfamille/:id',
            element: <JeuxFamille/>,
            
          },
              {
            path: 'brain-game-family/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeuxmahjong/:id',
            element: <JeuxMah/>,
            
          },
              {
            path: 'brain-game-solo/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeux-pyramide/:id',
            element: <JeuxPyramide/>,
            
          },
                {
            path: 'brain-game-pyramid/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'jeux-fubuki/:id',
            element: <JeuxFubuki/>,
            
          },
                {
            path: 'brain-game-fubuki/:id',
            element: <PageFaute/>
            
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
            path: 'jeuxordre/:id',
            element: <JeuxOrdre/>,
            
          },
          {
            path: 'brain-game-order/:id',
            element: <PageFaute/>
            
          },
          {
            path: 'defi/:no',
            element: <DebutEtape/>,
            
          },
          {
            path: 'brain-challenge/:no',
            element: <PageFaute/>
            
          },
          {
            path: 'vitessecouleur',
            element: <JeuCouleur/>,
            
          },
          {
            path: 'vitesseordre',
            element: <JeuOrdre/>,
            
          },
          {
            path: 'vitessetresse',
            element: <JeuTresse/>,
            
          },
          {
            path: 'vitesseboogle',
            element: <JeuBoogle/>,
            
          },
          {
            path: 'vitesserobot',
            element: <JeuRobot/>,
            
          },
          {
            path: 'vitessebonneteau',
            element: <JeuBonneteau/>,
            
          },
          {
            path: 'vitessepanneauroutier',
            element: <JeuPanneaux/>,
            
          },
          {
            path: 'vitessesolitaire',
            element: <JeuSolitaire/>,
            
          },
          {
            path: 'vitessearithmetique',
            element: <JeuAri/>,
            
          },
          {
            path: 'vitessecomplet',
            element: <JeuComplet/>
          },
          {
            path: 'vitessemonnaie',
            element: <JeuMonnaie/>,
            
          },
          {
            path: 'vitessepaire',
            element: <JeuPaire/>,
            
          },
          {
            path: 'vitessetaquin',
            element: <JeuTaquin/>,
            
          },
          {
            path: 'vitessecalcul',
            element: <JeuCalcul/>,
            
          },
          {
            path: 'vitesseintrus',
            element: <JeuIntrus/>,
            
          },
          {
            path: 'vitesseoperation',
            element: <JeuOperation/>,
            
          },
          {
            path: 'vitessematch',
            element: <JeuMatch/>,
            
          },
          {
            path: 'vitessechemin',
            element: <JeuChemin/>,
            
          },
          {
            path: 'vitesseburger',
            element: <JeuBurger/>,
            
          },
          {
            path: 'vitesserecensement',
            element: <JeuRecensement/>,
            
          },
          {
            path: 'vitessecercle',
            element: <JeuCercle/>,
            
          },
          {
            path: 'vitesselettres',
            element: <JeuLettres/>,
            
          },
          {
            path: 'vitessenotes',
            element: <JeuNote/>,
            
          },
          {
            path: 'vitessenombre',
            element: <JeuNombre/>,
            
          },
          {
            path: 'vitessememoire',
            element: <JeuMemoire/>,
            
          },
          {
            path: 'vitesseecrire',
            element: <JeuEcrire/>,
            
          },
          // {
          //   path: 'vitessezoo',
          //   element: <JeuTaupe/>,
            
          // },
          {
            path: 'vitessetresor',
            element: <JeuTresor/>,
            
          },
          {
            path: 'vitesseaddition',
            element: <JeuAddition/>,
            
          },
          {
            path: 'vitessememory',
            element: <JeuMemory/>,
            
          },
          {
            path: 'vitesseforme',
            element: <JeuForme/>,
            
          },
          {
            path: 'classement/:type',
            element: <Classement/>,
          },
          {
            path: 'classementmois',
            element: <ClassementMois/>,
          },
    
      ], 
    },
   

  ]);
  


export {router}