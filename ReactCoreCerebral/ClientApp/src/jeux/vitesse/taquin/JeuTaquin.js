import React, { useState, useEffect } from "react";
import "./style.css";
import { message } from "antd";
import { Helmet } from "react-helmet";
import Resultat from "../commun/Resultat";
import CompteRebours from "../commun/CompteRebours";

const emojis = [
  "😀", "🚀", "🍕", "🌈", "🐶", "⚽", "🎸", "📚", "🌍", "🚴‍♂️", "🎨", "💡", "🏆", "✈️", "🧩"
];
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function getRandomEmojis(count) {
  const randomEmojis = [];
  while (randomEmojis.length < count) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const randomEmoji = emojis[randomIndex];
    if (!randomEmojis.includes(randomEmoji)) {
      randomEmojis.push(randomEmoji);
    }
  }
  return randomEmojis;
}

const JeuTaquin = () => {
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [tabSolution, setTabSolution] = useState([]);
  const [afficheResultat, setAfficheResultat] = useState(false);
  const [jeu, setJeu] = useState(1);
  const [score, setScore] = useState(0);
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {

    let tabEmoji = getRandomEmojis(4);
    setTabSolution(tabEmoji);
    let initialTiles = [];
    do {
      initialTiles = getRandomEmojis(15).concat(null);
    } while (checkIfSolved(initialTiles, tabEmoji))



    //setTiles(initialTiles);

    setTiles(shuffleArray(initialTiles));
    setIsSolved(false);
  };

  const nouveauJeu = () => {
    let nouveuJeu = jeu+1;
    if (nouveuJeu < 3) {
      setJeu(nouveuJeu);
      resetGame();
      setScore(score+40);
    }
    else
    {
      setScore(score+70);
      setAfficheResultat(true);
    }
   
  }

  const handleTileClick = (index) => {
    if (isSolved) return;

    const newTiles = [...tiles];
    const emptyIndex = newTiles.indexOf(null);

    const canMoveHorizontally =
      Math.floor(index / 4) === Math.floor(emptyIndex / 4) &&
      (index % 4 === emptyIndex % 4 - 1 || index % 4 === emptyIndex % 4 + 1 ||
        index % 4 === emptyIndex % 4 - 2 || index % 4 === emptyIndex % 4 + 2 ||
        index % 4 === emptyIndex % 4 - 3 || index % 4 === emptyIndex % 4 + 3);

    const canMoveVertically =
      index % 4 === emptyIndex % 4 &&
      (index - 4 === emptyIndex || index + 4 === emptyIndex ||
        index - 8 === emptyIndex || index + 8 === emptyIndex ||
        index - 12 === emptyIndex || index + 12 === emptyIndex);

    if (canMoveHorizontally || canMoveVertically) {
      const direction = emptyIndex - index;
      if (Math.abs(direction) === 1 || Math.abs(direction) === 4) {
        [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];

      } else {
        const step = Math.abs(direction) === 2 || Math.abs(direction) === 8 ? direction / 2 : direction / 3;

        // newTiles[emptyIndex] = newTiles[index + step];
        // newTiles[index + step] = newTiles[index + 2 * step];
        // newTiles[index + 2 * step] = newTiles[index];
        // newTiles[index] = null;
        if (Math.abs(direction) === 12 || Math.abs(direction) === 3) {

          newTiles[emptyIndex] = newTiles[index + 2 * step];
          //    newTiles[emptyIndex] = newTiles[index + step];

          newTiles[index + 2 * step] = newTiles[index + step]
          newTiles[index + step] = newTiles[index];
        }
        else {
          newTiles[emptyIndex] = newTiles[index + step];
          newTiles[index + step] = newTiles[index];
        }


        newTiles[index] = null;

      }
      setTiles(newTiles);
      if (checkIfSolved(newTiles, tabSolution)) {
        
        message.success('Bravo ! Tu as réussi.', nouveauJeu);
        setIsSolved(true);
      
      }
    }
  };

  const finTimer = () =>
    {
        setAfficheResultat(true);
    }


  const checkIfSolved = (newTiles, newTabSolution) => {
   
    if (jeu === 1) {


      for (let index = 0; index < newTiles.length; index += 4) {


        if (newTabSolution[0] === newTiles[index] && newTabSolution[1] === newTiles[index + 1] &&
          newTabSolution[2] === newTiles[index + 2] && newTabSolution[3] === newTiles[index + 3]
        ) {


          return true;
        }
      }
    }
    else {

      for (let index = 0; index < newTabSolution.length; index++) {

     
        if (newTabSolution[0] === newTiles[index] && newTabSolution[1] === newTiles[index + 4] &&
          newTabSolution[2] === newTiles[index + 8] && newTabSolution[3] === newTiles[index + 12]
        ) {


          return true;
        }
      }
    }
    return false;
  };

  return (<React.Fragment>
    <Helmet>
                <title>Le jeu du taquin 4x4</title>
                <meta name="description" content="Découvrez notre jeu de taquin en ligne ! Améliorez vos compétences en résolution de puzzles tout en vous amusant avec ce classique jeu de casse-tête." />

            </Helmet>
       {afficheResultat ?  <Resultat score={score} typeExo='vitessetaquin'></Resultat>  :
    <div className="taquin">
 
      <div className="gridTaq">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tileTaq ${tile === null ? "empty" : ""}`}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      {jeu === 1 ? <div>Tu dois créer <b>une ligne</b> avec les symboles ci-dessous dans l'ordre de gauche à droite.</div> :
        <div>Tu dois créer <b>une colonne</b> avec les symboles ci-dessous dans l'ordre de bas en haut.</div>}
      <div> {tabSolution.map((emoji, index) => (<span className="emojiTaq" key={index + 500}>{emoji}</span>
      ))}</div>
      <div>Score : {score}</div>
      {isSolved && <p>Félicitations, tu as résolu le challenge {jeu} / 2 ! </p>}
      <div className="marge20"> <CompteRebours temps={90} finTimer={finTimer}></CompteRebours></div>
      {/* <button onClick={resetGame}>Réinitialiser</button> */}
      <h1>Le taquin</h1>
    </div>}
  </React.Fragment>);
};

export default JeuTaquin;
