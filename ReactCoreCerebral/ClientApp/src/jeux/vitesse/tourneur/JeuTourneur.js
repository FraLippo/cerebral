import React, { Component } from 'react';
import { message } from 'antd';
import loup from '../../../images/loup.png';
import arbre from '../../../images/arbre.png';
import sphero from '../../../images/sphero.png';



export default class Tourneur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: 5,
      cols: 5,
      currentRow: 0,
      currentCol: 0,
      playerRow: 0,
      playerCol: 0,
      trees: [],
      visitedOrder: ['0-0'], // <-- ordre des cases visitées par le cercle rouge
      playerProgress: 0,     // <-- index du prochain mouvement à faire pour le joueur
      running: false,
      gameWon: false,
      countdown : 5
    };
    this.interval = 0;
    this.count = 0;
  }

  reset = () =>
  {
     clearInterval(this.interval);
    this.setState({
       rows: 5,
      cols: 5,
      currentRow: 0,
      currentCol: 0,
      playerRow: 0,
      playerCol: 0,
      trees: [],
      visitedOrder: ['0-0'], 
      playerProgress: 0,    
      running: false,
      gameWon: false,
      countdown : 5

    }, () => {this.addTrees(); this.startRunning();})

  }

  componentWillUnmount() {
    clearInterval(this.interval);
     clearInterval(this.count);

  }
componentDidMount()
{
   this.addTrees();

}
  startRunning = () => {
   this.startCountdown();
  
      this.interval = setInterval(this.moveRandomly, 2000);
  
    this.setState({ running: true});
  };

  addTrees = () => {
    let trees = [];
    const { rows, cols } = this.state;

 
    let newRow, newCol, key;
    let setTrees = new Set();
    setTrees.add('0-0');
    let arrayTrees = [];
    for (let index = 0; index < 5; index++) {

      do {
        newRow = Math.floor(Math.random() * rows);
        newCol = Math.floor(Math.random() * cols);
        key = `${newRow}-${newCol}`;
      } while (setTrees.has(key));
      setTrees.add(key)
      arrayTrees.push({ row: newRow, col: newCol })
    }
    console.log(arrayTrees);
    this.setState({
      trees: arrayTrees
    })



  };


  moveRandomly = () => {
    const { rows, cols, visitedOrder } = this.state;

    // choisit une case au hasard différente de la précédente
    let newRow, newCol, key;
    do {
      newRow = Math.floor(Math.random() * 5);
      newCol = Math.floor(Math.random() * 5);
      key = `${newRow}-${newCol}`;
    } while (visitedOrder.findIndex(x => x === key) !== -1);



    // ajoute la case à la séquence d'ordre
    const newVisitedOrder = [...visitedOrder, key];



    // met à jour la position du cercle et la séquence
    this.setState({
      currentRow: newRow,
      currentCol: newCol,
      visitedOrder: newVisitedOrder
    });
  };

  // Le joueur doit cliquer sur la prochaine case de la séquence
  handleCellClick = (r, c) => {
    if (this.state.countdown !== 0) return;
    const { visitedOrder, playerProgress, gameWon } = this.state;
    console.log(visitedOrder)
    if (gameWon) return;
    const key = `${r}-${c}`;
    console.log(key)
    if (key !== visitedOrder[playerProgress]) {

      message.error("Tu dois suivre exactement le chemin du cercle rouge !",2, this.reset);
      return;
    }
    // Avancer dans la séquence et déplacer le joueur (le déplacement sera visible)
    const nextProgress = playerProgress + 1;
    this.setState({
      playerRow: r,
      playerCol: c,
      playerProgress: nextProgress
    }, () => {
      console.log(visitedOrder)
      console.log(nextProgress);
      if (nextProgress === visitedOrder.length) {
        clearInterval(this.interval);
        this.setState({ running: false, gameWon: true });
        message.success("Bravo, tu as rattrapé le cercle rouge en suivant son chemin !", 2 , this.reset);
      }
    });
  };
// 🔊 Fonction pour générer un bip
playBip = (duree = 200, frequence = 800, volume = 0.1) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequence, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime); // 👈 volume plus bas

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duree / 1000);
  };

    startCountdown = () => {
   
 
        this.count = setInterval(() => {
            this.setState(prev => ({
                countdown: prev.countdown - 1
            }), () => {

                if (this.state.countdown === 0) {
                    clearInterval(this.count);
                  this.playBip(600, 500);
                }else
                {
                  this.playBip();
                }
            });
        }, 1000);
    }

  render() {
    const { rows, cols, currentRow, currentCol, playerRow, playerCol, visitedOrder, playerProgress, running, gameWon, trees } = this.state;
    const cellSize = 50;


    const loupStyle = {
      width: `${cellSize - 2 * (cellSize * 0.15)}px`,
      height: `${cellSize - 2 * cellSize * 0.15}px`,
      zIndex : '1',
           pointerEvents: 'none'
    }

    const circleStyle = {

      position: "absolute",
      top: `${currentRow * cellSize + cellSize * 0.15}px`,
      left: `${currentCol * cellSize + cellSize * 0.15}px`,
      transition: "top 0.6s ease, left 0.6s ease",
      pointerEvents: 'none'

    };

    const playerStyle = {
     
      position: "absolute",
      top: `${playerRow * cellSize + cellSize * 0.15}px`,
      left: `${playerCol * cellSize + cellSize * 0.15}px`,
     zIndex: '8'
    };

        const spheroStyle = {
      width: `${cellSize * 0.7}px`,
      height: `${cellSize * 0.7}px`,
 
    };

    return (
      <div className="grid-container">
        {!running && <button onClick={this.startRunning} className="control-btn">
         Démarrer le jeu
        </button>}
        <div className='centre'>Tu peux essayer de rattraper le loup dans</div>
      <div className='centre'>{this.state.countdown} s</div>
        {gameWon && <div style={{ color: "green", fontWeight: "bold", fontSize: "1.3em" }}>Bravo, tu as rattrapé le cercle rouge en suivant son chemin !</div>}
        <div
          className="grid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`
          }}
        >
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const key = `${r}-${c}`;
              // La case est clickable si c'est la prochaine de la séquence
             

              return (
                <div
                  key={key}
                  className='cell'
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,

                    cursor: !gameWon ? "pointer" : "default",
                    border: "1px solid #ccc"
                  }}
                  onClick={() => this.handleCellClick(r, c)}
                />
              );
            })
          )}
          <div style={circleStyle}><img style={loupStyle} src={loup} alt="loup"></img></div>
         {this.state.playerProgress !== 0 &&<div style={playerStyle}><img style={spheroStyle}  src={sphero} alt="robot"></img> </div>}
          {trees.map((info, i) => <div key={i} style={{  position: "absolute",top: `${info.row * cellSize}px`,
      left: `${info.col * cellSize}px`, zIndex : '5', pointerEvents : 'none' }}><img  alt="arbre" src={arbre}></img></div>)}
        </div>
      </div>
    );
  }
}

