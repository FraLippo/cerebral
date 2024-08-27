import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { Helmet } from 'react-helmet';
import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend'

import { Game } from './Game.js';
import '../../../style/vitesse.css';
import { useMemo, useState } from 'react';
import { Board } from './Board.js';
import { Ingredients } from './Ingredients.js';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat.js';


const containerStyle = {
    width: '360px',
    height: '220px',
    margin: '10px auto'
    
  }

 
  const HTML5toTouch = {
    backends: [
      {
        id: 'html5',
        backend: HTML5Backend,
        transition: MouseTransition,
      },
      {
        id: 'touch',
        backend: TouchBackend,
        options: {enableMouseEvents: true},
        preview: true,
        transition: TouchTransition,
      },
    ],
  }

  
  
export default function JeuBurger() {
    const game = useMemo(() => new Game(), [])
    game.creerJeu();

    let tabListe1 = game.preparerMsg();
    const [tabListe, setTabListe] = useState(tabListe1); 
    const [finJeu, setFinJeu] = useState(false); 
    const [score, setScore] = useState(0); 
    game.observeMsg(setTabListe);
  
   
    function finTimer()
    {
        setFinJeu(true);
    
        setScore(game.score);
    }

    
  
  
    return (
        <React.Fragment> 
               <Helmet>
                <title>Préparer des burgers</title>
                <meta name="description" content="Un jeu simple et amusant pour entrainer son cerveau en concevant des burgers ! " />
            </Helmet>
        {finJeu ? <Resultat score={score} typeExo='vitesseburger'></Resultat> :
         <React.Fragment>
           <div className="titreJeu">Préparer des burgers</div>
        <div className="jeuBurger">
        
           
            <div className="plateauBurger">
            <DndProvider options={HTML5toTouch}>
            <div style={containerStyle}>
      <Board game={game} />
    </div>
            </DndProvider>
         </div>  
        
          <div className="msgBurger">
            <p>Prépare le burger ci-dessous en glissant les ingrédients dans la colonne du centre. L'ordre doit être respecté.</p>
            <Ingredients tabListe={tabListe}></Ingredients>
            <div className="centre marge10"><CompteRebours temps={60} finTimer={finTimer}></CompteRebours></div>
            </div>
        </div> </React.Fragment>}</React.Fragment>
    )
}