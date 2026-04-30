import React from "react";
import { useState, useEffect, useRef } from "react";
import Grille from "./Grille";
import { getCoord, GRID_SIZE, SIZE, STEP } from "./utilitaire";
import { message, Button } from "antd";
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

export default function JeuDessin() {

  let gameNumber = useRef(0);
  const [finJeu, setFinJeu] = useState(false);
    const [score, setScore] = useState(0);
  const buildPoints = () => {
    const targetLength = 6 + gameNumber.current;
    const maxAttempts = 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      let drawPoints = [{ id: `0-0`, col: 0, row: 0 }];
      while (drawPoints.length < targetLength) {
        const lastPoint = drawPoints[drawPoints.length - 1];
        const possibleMoves = [
          { row: lastPoint.row + 1, col: lastPoint.col },
          { row: lastPoint.row - 1, col: lastPoint.col },
          { row: lastPoint.row, col: lastPoint.col + 1 },
          { row: lastPoint.row, col: lastPoint.col - 1 },
          { row: lastPoint.row + 1, col: lastPoint.col + 1 },
          { row: lastPoint.row + 1, col: lastPoint.col - 1 },
          { row: lastPoint.row - 1, col: lastPoint.col + 1 },
          { row: lastPoint.row - 1, col: lastPoint.col - 1 }
        ].filter(p => p.row >= 0 && p.row < GRID_SIZE && p.col >= 0 && p.col < GRID_SIZE)
          .filter(p => drawPoints.findIndex(x => x.id === `${p.col}-${p.row}`) === -1);

        if (possibleMoves.length === 0) {
          break;
        }

        const nextPoint = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        drawPoints.push({ id: `${nextPoint.col}-${nextPoint.row}`, col: nextPoint.col, row: nextPoint.row });
      }

      if (drawPoints.length === targetLength) {
        return drawPoints;
      }
    }

    // Si malgré tout on ne trouve pas de chemin, on retourne un chemin minimal
    return [{ id: `0-0`, col: 0, row: 0 }];
  }

  const buildFigure = () => {


    let drawLines = [];

    for (let index = 0; index < points.length - 1; index++) {
      drawLines.push({ from: points[index], to: points[index + 1] });

    }

    return drawLines;

  }
  const [etat, setEtat] = useState('memorisation');
  const [selectedPoint, setSelectedPoint] = useState({ id: `${0}-${0}`, col: 0, row: 0 });
  const [points, setpoints] = useState([]);
  const [lines, setLines] = useState([]);
  let drawLines = useRef([]);


  // const points = [];
  // for (let row = 0; row < GRID_SIZE; row++) {
  //   for (let col = 0; col < GRID_SIZE; col++) {
  //     points.push({ id: `${row}-${col}`, row, col });
  //   }
  // }
  useEffect(() => {
    setpoints(buildPoints());


  }, []);
  useEffect(() => {
    if (points.length > 0 && etat === 'memorisation') {
      drawLines.current = buildFigure(points);


      setLines(drawLines.current);
    }
  }, [points]);

  useEffect(() => {

    if (etat === 'jeu') {
      if (checkVictory())
      {
        message.success('Bravo', 1, newGame)
      }
    }
  }, [lines]);

  const newGame = () =>
  {
    gameNumber.current++;
    setSelectedPoint({ id: `${0}-${0}`, col: 0, row: 0 });
    setpoints(buildPoints());
    setEtat('memorisation');
  }

  const checkVictory = () => {

    for (let index = 0; index < drawLines.current.length; index++) {

      if (lines.findIndex(x => x.from.id === drawLines.current[index].from.id && x.to.id === drawLines.current[index].to.id) === -1) {
        return false;
      }

    } 
    setScore(score + 12);
    return true;



  }
  const handleClickPoint = (point) => {
    if (etat === 'memorisation')
    {
      message.error('Mémorise la figure et appuie sur le bouton');
      return;
    }
    if (!selectedPoint) {
      setSelectedPoint(point);
    }
    else if (Math.abs(selectedPoint.col - point.col) > 1 || Math.abs(selectedPoint.row - point.row) > 1) {
      message.error("Sélection impossible. Choisir un point à côté du dernier point");
    }

    else if (selectedPoint.id !== point.id) {
      setLines((prev) => [
        ...prev,
        { from: selectedPoint, to: point }
      ]);
      setSelectedPoint(point);
    }
  };

  const memorised = () => {
    setEtat('jeu');
    setLines([]);
  }

  const back = () => {
    if (lines.length > 0 && etat === 'jeu') {
      let lastLines = lines[lines.length - 1];
      setSelectedPoint(lastLines.from);
      setLines(prev => prev.slice(0, -1));
    }
  }

  const giveUp = () => {
    setSelectedPoint({ id: `${0}-${0}`, col: 0, row: 0 });
    setpoints(buildPoints());
    setEtat('memorisation');
  }

  const timerEnd = () =>
  {
    setFinJeu(true);
  }

  return (<React.Fragment>
     <Helmet>
                    <title>Les lignes brisées - Jeu de mémoire visuospatiale pour entraîner votre cerveau</title>
                    <meta name="description" content="Jeu de mémoire gratuit : observez une ligne brisée, mémorisez-la et reproduisez-la. Un entraînement simple et efficace pour booster votre mémoire visuospatiale." />
      </Helmet>
            {finJeu ? <Resultat score={score} typeExo='vitessedessin'></Resultat> :
            <React.Fragment>
    <div className="container-dessin">
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        {/* SVG pour les lignes */}

        <Grille lines={lines}></Grille>
        {/* Points cliquables en HTML */}
        {points.map((p) => {
          const { x, y } = getCoord(p.row, p.col);
          return (
            <button
              key={p.id}
              onClick={() => handleClickPoint(p)}
              style={{
                position: "absolute",
                left: x - 8,
                top: y - 8,
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: "2px solid #6b0ce8",
                background:
                  selectedPoint && selectedPoint.id === p.id
                    ? "#ffcc00"
                    : "white",
                cursor: "pointer",
                padding: 0,
              }}
            />
          );
        })}
      </div>
      <Button onClick={back}>🔙</Button>
      {etat === 'memorisation' ?
        <Button className="marge20" onClick={memorised}>J'ai mémorisé</Button> :
        <Button className="marge20" onClick={giveUp}>Abandon</Button>
      }
         <div className="centre marge10"><CompteRebours temps={60} finTimer={timerEnd}></CompteRebours></div>
      </div>
  <div className="titre couleurTitre">Les lignes brisées</div>
     <div>Mémorise le dessin puis appuie sur le bouton "J'ai mémorisé". Reconstitue ensuite la ligne. Le premier point est toujours en haut à gauche (en jaune). Tu n'as pas besoin de l'indiquer. Tu ne peux cliquer que sur des points adjacents. Si tu as terminé et que tu n'as pas le message de félicitations, c'est qu'il y a une erreur. Tu peux revenir en arrière pour la corriger.</div> 
    </React.Fragment>
    }
    </React.Fragment>
  );
}

