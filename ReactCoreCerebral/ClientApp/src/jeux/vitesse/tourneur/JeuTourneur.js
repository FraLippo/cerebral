import React, { Component } from 'react';
import { message } from 'antd';
import loup from '../../../images/loup.png';
import arbre from '../../../images/arbre.png';
import sphero from '../../../images/sphero.png';
import Resultat from '../commun/Resultat.js';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';


export default class Tourneur extends Component {

  constructor(props) {
    super(props);
    this.levels = [{ col: 5, trees: 2, time: 3000 }, { col: 6, trees: 4, time: 2900 }, { col: 7, trees: 4, time: 2800 },
    { col: 7, trees: 6, time: 2600 }, { col: 7, trees: 8, time: 2400 }, { col: 7, trees: 8, time: 2200 }, { col: 8, trees: 12, time: 2000 },
    { col: 8, trees: 14, time: 1800 }, { col: 8, trees: 16, time: 1600 }, { col: 8, trees: 25, time: 1400 }
    ]
    this.nbGame = 0;
    this.nbTrees = this.levels[0].trees;
    this.time = this.levels[0].time;
    this.score = 0;
    this.state = {
      rows: this.levels[0].col,
      cols: this.levels[0].col,
      currentRow: 0,
      currentCol: 0,
      playerRow: 0,
      playerCol: 0,
      trees: [],
      visitedOrder: ['0-0'],
      playerProgress: 0,
      running: false,
      gameWon: false,
      countdown: 4,
      level: 0,
      sonActive: true,
      cellSize: this.getCellSize(),
      finJeu: false,
      nbGame : 1
    };
    this.interval = 0;
    this.count = 0;
    this.fin = false;
    this.endTimer = false;
     this.preloadImage = new Image();
  }

  reset = () => {
    
    if (this.state.gameWon) {
      this.nbGame++;
      this.nbTrees = this.levels[this.nbGame].trees;
      this.time = this.levels[this.nbGame].time;
    }
    clearInterval(this.interval);
    this.setState({
      rows: this.levels[this.nbGame].col,
      cols: this.levels[this.nbGame].col,
      currentRow: 0,
      currentCol: 0,
      playerRow: 0,
      playerCol: 0,
      trees: [],
      visitedOrder: ['0-0'],
      playerProgress: 0,
      running: false,
      gameWon: false,
      countdown: 5,
      level: 0,
      nbGame : this.state.gameWon ? this.state.nbGame+1 : this.state.nbGame

    }, () => { this.addTrees(); this.startRunning(); })
    this.fin = false;
   
  }
  handleResize = () => {
    this.setState({ cellSize: this.getCellSize() });
  };


  getCellSize = () => {
    const width = window.innerWidth;
    if (width < 480) return 35;   // smartphone
    if (width < 768) return 40;   // tablette
    return 50;                    // desktop
  };
  finTimer = () => {
    this.endTimer = true;
   clearInterval(this.interval);
    clearInterval(this.count);
       window.removeEventListener("resize", this.handleResize);
    this.setState({
      finJeu: true
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.count);
    window.removeEventListener("resize", this.handleResize);


  }
  componentDidMount() {
   
  this.preloadImage.src = sphero; 
    this.addTrees();
    window.addEventListener("resize", this.handleResize);

  }
  startRunning = () => {
    if (!this.endTimer) this.startCountdown();

    this.interval = setInterval(this.moveRandomly, this.time);

    this.setState({ running: true });
  };

  addTrees = () => {

    const { rows, cols } = this.state;


    let newRow, newCol, key;
    let setTrees = new Set();
    setTrees.add('0-0');
    let arrayTrees = [];
    for (let index = 0; index < this.nbTrees; index++) {

      do {
        newRow = Math.floor(Math.random() * rows);
        newCol = Math.floor(Math.random() * cols);
        key = `${newRow}-${newCol}`;
      } while (setTrees.has(key));
      setTrees.add(key)
      arrayTrees.push({ row: newRow, col: newCol })
    }
  
    this.setState({
      trees: arrayTrees
    })



  };


  moveRandomly = () => {
    const { rows, cols, visitedOrder } = this.state;
    if (visitedOrder.length === rows * cols) {
      clearInterval(this.interval);
      clearInterval(this.count);
      return;
    }
    // choisit une case au hasard différente de la précédente
    let newRow, newCol, key;
    do {
      newRow = Math.floor(Math.random() * rows);
      newCol = Math.floor(Math.random() * cols);
      key = `${newRow}-${newCol}`;
    } while (visitedOrder.findIndex(x => x === key) !== -1);

    const newVisitedOrder = [...visitedOrder, key];

    this.setState({
      currentRow: newRow,
      currentCol: newCol,
      visitedOrder: newVisitedOrder
    });
  };

  handleCellClick = (r, c) => {
    if (this.fin) return;
    if (this.state.countdown !== 0) return;
    const { visitedOrder, playerProgress, gameWon } = this.state;

    if (gameWon) return;
    const key = `${r}-${c}`;

    if (key !== visitedOrder[playerProgress]) {
      clearInterval(this.interval);
      this.score = this.score >= 10 ? this.score - 10 : 0;
      this.fin = true;
      message.error("Tu dois suivre exactement les mêmes cases que le loup !", 2, this.reset);
      return;
    }
    // Avancer dans la séquence et déplacer le joueur (le déplacement sera visible)
    const nextProgress = playerProgress + 1;

    this.setState({
      playerRow: r,
      playerCol: c,
      playerProgress: nextProgress
    }, () => {

      if (nextProgress === visitedOrder.length) {
        clearInterval(this.interval);
        this.setState({  gameWon: true });
        this.score += 10;
        this.fin = true;
        message.success("Bravo, tu as rattrapé le loup !", 2, () => {
       
          if (this.nbGame === this.levels.length-1) {  
             this.score += 30;
            this.setState({ finJeu: true });
         
          }
          else {
            this.reset();
          }

        });
    }
  });
    } 
      // 🔊 Fonction pour générer un bip
      playBip = (duree = 200, frequence = 800, volume = 0.1) => {
        if (!this.state.sonActive) return;
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
            } else {
              this.playBip();
            }
          });
        }, 1000);
      }

      toggleSon = () => {
        this.setState(prev => ({ sonActive: !prev.sonActive }));
      };

      render() {
        const { rows, cols, cellSize, currentRow, currentCol, playerRow, playerCol, sonActive, level, running, gameWon, trees } = this.state;
        ;


        const loupStyle = {
          width: `${cellSize - 2 * (cellSize * 0.15)}px`,
          height: `${cellSize - 2 * cellSize * 0.15}px`,
          zIndex: '1',
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
        const treeStyle = {
          width: `${cellSize * 0.9}px`,
          height: `${cellSize * 0.9}px`,

        };


        return (<React.Fragment>
          {this.state.finJeu ? <Resultat score={this.score} typeExo='vitesseloup'></Resultat> :
            <div>
              <div className="grid-tourneur">
                <div

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


                      return (
                        <div
                          key={key}
                          className='cell-tourneur'
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
                  {this.state.playerProgress !== 0 && <div style={playerStyle}><img style={spheroStyle} src={this.preloadImage.src} alt="robot"></img> </div>}
                  {trees.map((info, i) => <div key={i} style={{
                    position: "absolute", top: `${info.row * cellSize + cellSize * 0.1}px`,
                    left: `${info.col * cellSize + cellSize * 0.1}px`, zIndex: '5', pointerEvents: 'none'
                  }}><img alt="arbre" style={treeStyle} src={arbre}></img></div>)}
                </div>    </div>
              <div className="grid-tourneur">
                <div className='countdown-tourneur centre'>
                  {level === 0 && <div>Tu dois mémoriser les déplacements du loup pour ensuite passer par les mêmes cases pour le rattraper.</div>}
                  {!running ? <button onClick={this.startRunning} className="control-btn">
                    Démarrer le jeu
                  </button> : this.state.countdown !== 0 ?<div>
                    <div>Tu peux essayer de rattraper le loup dans</div>
                    <div className='fontMoyenne'>{this.state.countdown} s</div></div>
                  : <div>Jeu {this.state.nbGame} / {this.levels.length}</div>  
                  }</div>
                <button
                  onClick={this.toggleSon}
                  style={{
                    fontSize: "2rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title={sonActive ? "Couper le son" : "Activer le son"}
                >
                  {sonActive ? "🔊" : "🔇"}
                </button>
                   <div className="centre marge10"><CompteRebours temps={110} finTimer={this.finTimer}></CompteRebours></div>
              </div>
            </div>}</React.Fragment>
        );
      }
    }

