import React, { Component } from 'react';
import Resultat from '../commun/Resultat';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';
import './tetris.css';
import { message } from 'antd';

export default class JeuTetris extends Component {
  constructor(props) {
    super(props);
    this.dataJeu = [
      [
        {img : 'image3.jpg',
        titre : "Danseuse créole - Henri Matisse (extrait)"
        },
         {img : 'image31.jpg',
        titre : "Le Foyer de la danse à l'Opéra de la rue Le Peletier - Edgar Degas"
        },
         {img : 'image32.jpg',
        titre : "Souvenir d'Océanie - Henri Matisse (extrait)"
        }

      ],
      [
        {img : 'image4.jpg',
        titre : "Jaune-rouge-bleu -  Vassily Kandinsky (extrait)"
        },
         {img : 'image41.jpg',
        titre : "Le Lavandou de Nicolas de Staël (extrait)"
        },
         {img : 'image42.jpg',
        titre : "Grisande - Maurice Estève"
        }
      ],
        [
        {img : 'image5.jpg',
        titre : "Les Régates - Raoul Dufy"
        },
         {img : 'image51.jpg',
        titre : "Femmes et oiseau dans la nuit - Joan Miró"
        },
         {img : 'image52.jpg',
        titre : "La Lecture - Pablo Picasso "
        }
      ]
    ]
     this.level = 0;
    this.canvasRef = React.createRef();
    this.image = new Image();
    this.cellSize = 80;
    this.cols = 4;
    this.rows = this.level+2;
    this.hiddenRows = 6 - this.level ; // extra invisible rows at top to give player time
    // configurable bottom spacing (fraction of viewport height reserved at bottom)
    this.bottomSpacePercent = (props && props.bottomSpacePercent !== undefined) ? props.bottomSpacePercent : 0.15;
    // minimum reserved bottom space (can be overridden via props.minBottomSpacePercent)
    this.minBottomSpacePercent = (props && props.minBottomSpacePercent !== undefined) ? props.minBottomSpacePercent : 0.15;

    // game state
    this.grid = Array.from({ length: this.rows + this.hiddenRows }, () => Array(this.cols).fill(null));
    this.piecesBag = [];
    this.currentPiece = null; // {col, row, x, y, srcRow, srcCol}
    this.dropSpeed = 60; // px/s (unused for stepped movement)
    this.dropInterval = 800; // ms per cell (saccadé)
    this.dropAccumulator = 0; // ms
    this.lastTime = null;
    this.animationId = null;
    this.locking = false;
    this.keyState = { left: false, right: false, down: false };
    this.lastMoveTime = 0;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.loop = this.loop.bind(this);
    // touch tracking for mobile
    this.touch = { startX: null, startY: null, startTime: 0 };
    this.downTimeoutId = null;
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.axisLock = null; // 'horizontal' when player initiated horizontal move
    this.ignoreDownUntilKeyUp = false;
 
    this.messageTimeoutId = null;
    this.restartTimeoutId = null;
    this.infoGame = [];
    this.state = {
    imageSrc: null,
    nomTableau : '',
    score : 0,
    afficheResultat : false
  };
  }

 selectImages()
 {

    for (let index = 0; index < this.dataJeu.length; index++) {
     
      const randomData =
    this.dataJeu[index][Math.floor(Math.random() * this.dataJeu[index].length)]; 
 
      this.infoGame.push(randomData);
    }
    console.log(this.infoGame);
 }

componentDidMount() {
 this.selectImages();
  this.image = new Image();

  this.image.onload = () => {
    this.initCanvas();
    this.initGame();
  };

  this.image.src = `/images/tetris/${this.infoGame[this.level].img}`;
  this.setState({ imageSrc: this.image.src, nomTableau : this.infoGame[this.level].titre });
}

endGame()
{
  window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    // remove touch listeners
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.removeEventListener('touchstart', this.handleTouchStart);
      canvas.removeEventListener('touchmove', this.handleTouchMove);
      canvas.removeEventListener('touchend', this.handleTouchEnd);
    }
    if (this.downTimeoutId) {
      clearTimeout(this.downTimeoutId);
      this.downTimeoutId = null;
    }
    this.axisLock = null;
    if (this.handleResize) window.removeEventListener('resize', this.handleResize);
      
      if (this.restartTimeoutId) {
        clearTimeout(this.restartTimeoutId);
        this.restartTimeoutId = null;
      }
      if (this.nextLevelTimeout) {
        clearTimeout(this.nextLevelTimeout);
        this.nextLevelTimeout = null;
      }
}

  componentWillUnmount() {
  this.endGame();
  }

  initCanvas() {
    this.suppressSpawn = false;
    this.restartTimeoutId = null;
    this.nextLevelTimeout = null;
    const internalRows = this.rows + this.hiddenRows;
    const canvas = this.canvasRef.current;
    const wrapper = canvas.parentElement && canvas.parentElement.parentElement ? canvas.parentElement.parentElement : canvas.parentElement;
    const padding = 20; // leave some space

    // compute device pixel ratio once so it's available to later code
    const ratio = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
    this.dpr = ratio;

    // determine display sizes; declare in outer scope so they're always available below
    let displayWidth;
    let displayHeight;

    // if we've previously locked a canvas size (to keep canvas stable across level changes), reuse it
    if (this.lockedCanvasSize) {
      this.cellSize = this.lockedCanvasSize.cellSize;
      displayWidth = this.lockedCanvasSize.displayWidth;
      displayHeight = this.lockedCanvasSize.displayHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      canvas.style.display = 'block';
      canvas.width = Math.max(1, Math.floor(displayWidth * ratio));
      canvas.height = Math.max(1, Math.floor(displayHeight * ratio));
    } else {
      // compute available height as viewport minus bottom reserved percent
      // enforce minimum reserved percent using `minBottomSpacePercent`
      const reserved = Math.max(this.minBottomSpacePercent, Math.min(0.9, this.bottomSpacePercent));
      const availableHeight = Math.max(100, Math.floor(window.innerHeight * (1 - reserved)) - padding);
      // prefer parent width when available to better fit layouts
      const parentWidth = wrapper ? wrapper.clientWidth : window.innerWidth;
      const availableWidth = Math.max(100, parentWidth - padding);

      // choose cell size tohiddenRowsnextlevel
      //  fit both directions
      let cellSizeByHeight = Math.floor(availableHeight / internalRows);
      let cellSizeByWidth = Math.floor(availableWidth / this.cols);
      let newCellSize = Math.max(16, Math.min(cellSizeByHeight, cellSizeByWidth));
      // cap the cell size to 320px (allow larger play area on big phones)
      newCellSize = Math.min(newCellSize, 320);

      this.cellSize = newCellSize;

      displayWidth = this.cols * this.cellSize;
      displayHeight = internalRows * this.cellSize; // include hidden rows so empty cells appear at top
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      // avoid inline element whitespace by making canvas a block
      canvas.style.display = 'block';
      canvas.width = Math.max(1, Math.floor(displayWidth * ratio));
      canvas.height = Math.max(1, Math.floor(displayHeight * ratio));

      // lock this canvas size so changing `rows`/`hiddenRows` on nextLevel doesn't resize it
      this.lockedCanvasSize = { cellSize: this.cellSize, displayWidth, displayHeight };
    }

    // size wrapper and background to match canvas (use CSS pixel sizes)
    if (wrapper) {
      // account for wrapper borders: compute border widths and add them
      const cs = (typeof window !== 'undefined' && window.getComputedStyle) ? window.getComputedStyle(wrapper) : null;
      const bl = cs ? parseFloat(cs.borderLeftWidth) || 0 : 0;
      const br = cs ? parseFloat(cs.borderRightWidth) || 0 : 0;
      // when box-sizing:border-box is used, setting width to displayWidth+bl+br
      // makes the inner content area equal to displayWidth
      wrapper.style.width = `${displayWidth + bl + br}px`;
      wrapper.style.height = `${displayHeight}px`;
      const bg = wrapper.querySelector('.background-image');
      if (bg) {
        bg.style.width = `${displayWidth}px`;
        bg.style.height = `${this.rows * this.cellSize}px`; // only visible rows
        bg.style.top = `${this.hiddenRows * this.cellSize}px`;
      }
    }

    const ctx = canvas.getContext('2d');
    // set transform so drawing uses CSS pixels coordinates
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }

  initGame() {
    // reset grid (including hidden rows)
    this.grid = Array.from({ length: this.rows + this.hiddenRows }, () => Array(this.cols).fill(null));

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    // responsive resize
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // touch controls on canvas
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    }

    this.spawnPiece();
    this.lastTime = performance.now();
    this.dropAccumulator = 0;
    this.animationId = requestAnimationFrame(this.loop);
  }

  handleResize() {
    // on explicit resize we want to recompute sizes (clear the locked canvas size)
    this.lockedCanvasSize = null;
    this.initCanvas();
    this.renderGame();
  }

  spawnPiece() {
    // choose a random column that is not full (this determines the target tile)
    const availableCols = [];
    for (let c = 0; c < this.cols; c++) {
      // column considered full when the top VISIBLE row (hiddenRows index) is filled
      if (!this.grid[this.hiddenRows][c]) availableCols.push(c);
    }
    if (availableCols.length === 0) {
      console.log('All columns full - game complete');
      this.currentPiece = null;
      return;
    }
    const targetCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    // find the target row (first empty from bottom) for that column, searching visible area
    const internalRows = this.rows + this.hiddenRows;
    let targetRow = -1;
    for (let r = internalRows - 1; r >= this.hiddenRows; r--) {
      if (!this.grid[r][targetCol]) {
        targetRow = r;
        break;
      }
    }
    if (targetRow === -1) {
      console.log('No empty slot found in chosen column', targetCol);
      this.spawnPiece();
      return;
    }

    // choose a random starting column for the falling piece (can be different from targetCol)
    const startCol = Math.floor(Math.random() * this.cols);
    const row = 0; // start above visible area (in hidden rows)
    const x = startCol * this.cellSize;
    const y = row * this.cellSize;
    // srcRow/srcCol chosen to be the tile that belongs at the end of the chosen column
    // convert internal row index to image row index (subtract hiddenRows)
    const srcRow = targetRow - this.hiddenRows;
    const srcCol = targetCol;
    this.currentPiece = { col: startCol, row, x, y, srcRow, srcCol };
    // ensure the new piece does not immediately inherit any accumulated drop time
    this.dropAccumulator = 0;
    // clear any axis lock so player can start new moves
    this.axisLock = null;
    // ensure down state is reset so new piece isn't accelerated if key was held
    this.keyState.down = false;
    if (this.downTimeoutId) {
      clearTimeout(this.downTimeoutId);
      this.downTimeoutId = null;
    }
    // ignore physical "down" key until it's released (prevents hold-through)
    this.ignoreDownUntilKeyUp = true;
  }

  loop(now) {
    const dtMs = now - this.lastTime;
    this.lastTime = now;

    const internalRows = this.rows + this.hiddenRows;

    if (this.currentPiece) {
      // horizontal movement is grid-based and immediate (with small cooldown)
      const moveInterval = 120; // ms between repeated lateral moves
      // lateral movement handled in handleKeyDown via tryMove, but allow holding with cooldown
      if (this.keyState.left && now - this.lastMoveTime > moveInterval) {
        this.tryMove(-1);
        this.lastMoveTime = now;
      }
      if (this.keyState.right && now - this.lastMoveTime > moveInterval) {
        this.tryMove(1);
        this.lastMoveTime = now;
      }

      // stepped drop: only accelerate when a true vertical input is active and axis not locked
      const interval = (this.keyState.down && this.axisLock !== 'horizontal') ? this.dropInterval / 8 : this.dropInterval;
      this.dropAccumulator += dtMs;
      while (this.dropAccumulator >= interval) {
        this.dropAccumulator -= interval;
        // move down one grid row
        this.currentPiece.row += 1;
        this.currentPiece.y = this.currentPiece.row * this.cellSize;

        // check collision/lock
        if (
          this.currentPiece.row >= internalRows ||
          (this.currentPiece.row >= this.hiddenRows && this.grid[this.currentPiece.row] && this.grid[this.currentPiece.row][this.currentPiece.col])
        ) {
          const lockRow = this.currentPiece.row - 1;
          if (lockRow < this.hiddenRows) {
                // avoid duplicate handling if already locking or suppressed
                if (this.locking || this.suppressSpawn) return;
                this.locking = true;
                // piece locked above visible area -> treat as incorrect placement
                const errDuration = 1200;
                message.error('Mauvaise position', .5);
                this.suppressSpawn = true;
                if (this.restartTimeoutId) {
                  clearTimeout(this.restartTimeoutId);
                  this.restartTimeoutId = null;
                }
                // stop loop until restart
                if (this.animationId) {
                  cancelAnimationFrame(this.animationId);
                  this.animationId = null;
                }
                this.currentPiece = null;
                this.restartTimeoutId = setTimeout(() => {
                  this.restartTimeoutId = null;
                  this.restartGame();
                }, errDuration);
                return;
          }
          this.lockPiece(lockRow, this.currentPiece.col, this.currentPiece.srcRow, this.currentPiece.srcCol);
          // reset down key so next piece doesn't inherit speed
          this.keyState.down = false;
          if (!this.suppressSpawn) this.spawnPiece();
          break; // stop processing further drops this frame
        }
      }
    }

    this.renderGame();
    this.animationId = requestAnimationFrame(this.loop);
  }

  lockPiece(row, col, srcRow, srcCol) {
    // prevent re-entrant locking
    if (this.locking) return;
    this.locking = true;

    // defensive: if row/col out of bounds, treat as incorrect placement
    if (!this.grid[row] || col < 0 || col >= this.cols) {
      const errDuration = 1200;
      message.error('Mauvaise position', .5); 
      this.suppressSpawn = true;
      if (this.restartTimeoutId) { clearTimeout(this.restartTimeoutId); this.restartTimeoutId = null; }
      if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; }
      this.currentPiece = null;
      this.restartTimeoutId = setTimeout(() => {
        this.restartTimeoutId = null;
        this.restartGame();
      }, errDuration);
      return;
    }
    // srcRow is image-row (0..rows-1); convert placed row to image-row by subtracting hiddenRows
    const placedImageRow = row - this.hiddenRows;
    const correct = srcRow === placedImageRow && srcCol === col;
    console.log(correct);
    this.grid[row][col] = { srcRow, srcCol, correct };
    // ensure down is not stuck for the next piece
    this.keyState.down = false;
    // clear any pending down timeout
    if (this.downTimeoutId) {
      clearTimeout(this.downTimeoutId);
      this.downTimeoutId = null;
    }
    // reset drop accumulator so next piece doesn't immediately drop
    this.dropAccumulator = 0;
    // release axis lock when a tile is placed
    this.axisLock = null;
    // ignore physical down until keyup to avoid carry-over
    this.ignoreDownUntilKeyUp = true;

    // show error message if placement incorrect and restart same level
    if (!correct) {
      const errDuration = 1000;
      message.error('Mauvaise position',.5);
      // prevent spawning next piece while error message is showing
      this.suppressSpawn = true;
      if (this.restartTimeoutId) {
        clearTimeout(this.restartTimeoutId);
        this.restartTimeoutId = null;
      }
      this.restartTimeoutId = setTimeout(() => {
        this.restartTimeoutId = null;
        this.restartGame();
      }, errDuration);
      return;
    }

    // check victory: every visible cell must be filled and correct
    // if we're suppressing spawns (error or success message active), skip victory check
    if (this.suppressSpawn) return;
    const internalRows = this.rows + this.hiddenRows;
    let allFilled = true;
    for (let r = this.hiddenRows; r < internalRows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c];
        if (!cell || !cell.correct) {
          allFilled = false;
          break;
        }
      }
      if (!allFilled) break;
    }
    if (allFilled) {
      // immediately stop the current piece and animation to prevent further descent
      this.currentPiece = null;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      const successDuration = 1500;
      // show in-game message and prevent new pieces from spawning
      message.success('Bravo — image reconstituée !');
      this.suppressSpawn = true;
      if (this.nextLevelTimeout) {
        clearTimeout(this.nextLevelTimeout);
        this.nextLevelTimeout = null;
      }
      if (this.level === 2)
      {
        this.endGame();
          this.setState({afficheResultat : true, score: this.state.score + 55});
      }
      else
      {
         this.setState({score: this.state.score + 25});
      }
              this.nextLevelTimeout = setTimeout(() => {
        this.nextLevelTimeout = null;
        this.nextLevel();
      }, successDuration);
      return;
    }
    // release locking for normal placement (no restart / no victory)
    this.locking = false;
  }

  restartGame() {
    // clear various timeouts
    if (this.downTimeoutId) {
      clearTimeout(this.downTimeoutId);
      this.downTimeoutId = null;
    }
   
    if (this.restartTimeoutId) {
      clearTimeout(this.restartTimeoutId);
      this.restartTimeoutId = null;
    }
    if (this.pendingSpawnTimeout) {
      clearTimeout(this.pendingSpawnTimeout);
      this.pendingSpawnTimeout = null;
    }
    // stop loop if running
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // reset game state
    this.grid = Array.from({ length: this.rows + this.hiddenRows }, () => Array(this.cols).fill(null));
    this.currentPiece = null;
    this.dropAccumulator = 0;
    this.lastTime = performance.now();

    // spawn first piece (visible) and restart loop
    // allow spawning again
    this.suppressSpawn = false;
    this.locking = false;
    this.spawnPiece(true);
    this.animationId = requestAnimationFrame(this.loop);
  }

  nextLevel() {
    // stop current loop and listeners
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.handleResize) window.removeEventListener('resize', this.handleResize);
    // remove touch listeners
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.removeEventListener('touchstart', this.handleTouchStart);
      canvas.removeEventListener('touchmove', this.handleTouchMove);
      canvas.removeEventListener('touchend', this.handleTouchEnd);
    }

    // clear timeouts
    if (this.downTimeoutId) { clearTimeout(this.downTimeoutId); this.downTimeoutId = null; }
    if (this.pendingSpawnTimeout) { clearTimeout(this.pendingSpawnTimeout); this.pendingSpawnTimeout = null; }

    // advance level
    this.level = (this.level + 1) % Math.max(1, this.infoGame.length);
    // update rows/hiddenRows based on level
    this.rows = this.level + 2;
    this.hiddenRows = Math.max(0, 6 - this.level);
    this.dropInterval = 800 - (200 * this.level);
    // reset grid and state
    this.grid = Array.from({ length: this.rows + this.hiddenRows }, () => Array(this.cols).fill(null));
    this.currentPiece = null;
    this.dropAccumulator = 0;

    // allow spawning for the next level
    this.suppressSpawn = false;
    this.locking = false;

    // load next image then re-init canvas and game
    this.image.onload = () => {
      this.initCanvas();
      this.initGame();
    };
    const nextImg = this.infoGame && this.infoGame[this.level] ? this.infoGame[this.level].img : null;
    if (nextImg) {
      this.image.src = `/images/tetris/${nextImg}`;
      this.setState({ imageSrc: this.image.src, nomTableau : this.infoGame[this.level].titre });
    } else {
      // fallback: just restart without changing image
      this.initCanvas();
      this.initGame();
    }
  }



  handleKeyDown(e) {
    const now = performance.now();
    if (e.key === 'ArrowLeft') {
      this.keyState.left = true;
      this.axisLock = 'horizontal';
      // immediate attempt to move left
      if (this.currentPiece && now - this.lastMoveTime > 0) {
        this.tryMove(-1);
        this.lastMoveTime = now;
      }
    }
    if (e.key === 'ArrowRight') {
      this.keyState.right = true;
      this.axisLock = 'horizontal';
      if (this.currentPiece && now - this.lastMoveTime > 0) {
        this.tryMove(1);
        this.lastMoveTime = now;
      }
    }
    if (e.key === 'ArrowDown') {
      // only accept a down press if we're not ignoring held key from previous piece
      if (!this.ignoreDownUntilKeyUp && this.axisLock !== 'horizontal') this.keyState.down = true;
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
      // hard drop
      if (this.currentPiece) {
        const internalRows = this.rows + this.hiddenRows;
        let r = this.currentPiece.row + 1;
        while (r < internalRows && !this.grid[r][this.currentPiece.col]) r++;
        const targetRow = r - 1;
        if (targetRow < this.hiddenRows) {
          // avoid duplicate handling if already locking or suppressed
          if (this.locking || this.suppressSpawn) return;
          this.locking = true;
          // piece would land above visible area -> treat as incorrect placement
          const errDuration = 1200;
          message.error('Mauvaise position', .5);
          this.suppressSpawn = true;
          if (this.restartTimeoutId) {
            clearTimeout(this.restartTimeoutId);
            this.restartTimeoutId = null;
          }
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
          this.currentPiece = null;
          this.restartTimeoutId = setTimeout(() => {
            this.restartTimeoutId = null;
            this.restartGame();
          }, errDuration);
          return;
        }
        this.lockPiece(targetRow, this.currentPiece.col, this.currentPiece.srcRow, this.currentPiece.srcCol);
        if (!this.suppressSpawn) this.spawnPiece();
      }
    }
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowLeft') {
      this.keyState.left = false;
      if (!this.keyState.right) this.axisLock = null;
    }
    if (e.key === 'ArrowRight') {
      this.keyState.right = false;
      if (!this.keyState.left) this.axisLock = null;
    }
    if (e.key === 'ArrowDown') {
      this.keyState.down = false;
      // releasing the physical key allows future downs to be registered
      this.ignoreDownUntilKeyUp = false;
    }
  }

  tryMove(dx) {
    if (!this.currentPiece) return false;
    const targetCol = this.currentPiece.col + dx;
    const row = this.currentPiece.row;
    if (targetCol < 0 || targetCol >= this.cols) return false;
    // block movement if there is a tile at the same row on that side
    // allow lateral movement while piece is in hidden rows
    if (row >= this.hiddenRows && this.grid[row] && this.grid[row][targetCol]) return false;
    // otherwise move
    this.currentPiece.col = targetCol;
    this.currentPiece.x = targetCol * this.cellSize;
    return true;
  }

  // Touch handlers for mobile
  handleTouchStart(e) {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    this.touch.startX = t.clientX;
    this.touch.startY = t.clientY;
    this.touch.startTime = Date.now();
  }

  handleTouchMove(e) {
    // prevent page scroll while interacting with game
    if (e.cancelable) e.preventDefault();
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    const curX = t.clientX;
    const curY = t.clientY;
    const dx = curX - this.touch.startX;
    const dy = curY - this.touch.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // horizontal drag: move by columns as the finger crosses column boundaries
    if (absX > absY) {
      // ensure drop acceleration is not active during horizontal drag
      this.keyState.down = false;
      // mark that player started a horizontal move
      this.axisLock = 'horizontal';
      const step = this.cellSize; // pixels per column
      // determine how many columns we've crossed since last anchor
      const crossed = Math.floor(absX / step);
      if (crossed > 0) {
        const dir = dx > 0 ? 1 : -1;
        // move one column per crossed step and advance anchor
        for (let i = 0; i < crossed; i++) {
          this.tryMove(dir);
          this.touch.startX += dir * step;
        }
      }
      return;
    }
  }

  handleTouchEnd(e) {
    if (this.touch.startX === null) return;
    const touch = (e.changedTouches && e.changedTouches[0]) || null;
    const endX = touch ? touch.clientX : this.touch.startX;
    const endY = touch ? touch.clientY : this.touch.startY;
    const dx = endX - this.touch.startX;
    const dy = endY - this.touch.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const threshold = 30; // minimum pixels to consider a swipe
    const tapThreshold = 10; // small movement = tap
    const tapTimeLimit = 300; // ms
    const duration = Date.now() - this.touch.startTime;

    if (absX > absY && absX > threshold) {
      // horizontal swipe
      if (dx > 0) this.tryMove(1);
      else this.tryMove(-1);
      // release axis lock after swipe ends
      this.axisLock = null;
    } else if (absX <= tapThreshold && absY <= tapThreshold && duration <= tapTimeLimit) {
      // tap: immediate hard drop
      if (this.currentPiece) {
        const internalRows = this.rows + this.hiddenRows;
        let r = this.currentPiece.row + 1;
        while (r < internalRows && !this.grid[r][this.currentPiece.col]) r++;
        const targetRow = r - 1;
        if (targetRow < this.hiddenRows) {
          // avoid duplicate handling if already locking or suppressed
          if (this.locking || this.suppressSpawn) return;
          this.locking = true;
          // piece would land above visible area -> treat as incorrect placement
          const errDuration = 1200;
           message.error('Mauvaise position', .5);
          this.suppressSpawn = true;
          if (this.restartTimeoutId) {
            clearTimeout(this.restartTimeoutId);
            this.restartTimeoutId = null;
          }
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
          this.currentPiece = null;
          this.restartTimeoutId = setTimeout(() => {
            this.restartTimeoutId = null;
            this.restartGame();
          }, errDuration);
          return;
        }
        this.lockPiece(targetRow, this.currentPiece.col, this.currentPiece.srcRow, this.currentPiece.srcCol);
        if (!this.suppressSpawn) this.spawnPiece();
      }
    }

    this.touch.startX = null;
    this.touch.startY = null;
    this.touch.startTime = 0;
    // release axis lock when touch ends
    this.axisLock = null;
  }

  renderGame() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ratio = this.dpr || 1;
    const displayWidth = canvas.width / ratio;
    const displayHeight = canvas.height / ratio;
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const srcCellW = this.image.width / this.cols;
    const srcCellH = this.image.height / this.rows;
    // draw placed tiles for all internal rows (hidden rows appear at top)
    const internalRows = this.rows + this.hiddenRows;
    for (let r = 0; r < internalRows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c];
        if (cell) {
          const sx = cell.srcCol * srcCellW;
          const sy = cell.srcRow * srcCellH;
          const dx = c * this.cellSize;
          const dy = r * this.cellSize;
          ctx.drawImage(this.image, sx, sy, srcCellW, srcCellH, dx, dy, this.cellSize, this.cellSize);
          if (!cell.correct) {
            ctx.fillStyle = 'rgba(255,0,0,0.25)';
            ctx.fillRect(dx, dy, this.cellSize, this.cellSize);
          }
        }
      }
    }

    // draw current piece at its internal row position (hidden rows are visible at top)
    if (this.currentPiece) {
      const srcX = this.currentPiece.srcCol * srcCellW;
      const srcY = this.currentPiece.srcRow * srcCellH;
      const drawY = this.currentPiece.row * this.cellSize;
      ctx.drawImage(this.image, srcX, srcY, srcCellW, srcCellH, this.currentPiece.x, drawY, this.cellSize, this.cellSize);
      ctx.strokeStyle = '#cccccc';
      ctx.strokeRect(this.currentPiece.x, drawY, this.cellSize, this.cellSize);
    }

    // // grid lines: draw 1px crisp lines using a 0.5px offset and clamp
    // ctx.strokeStyle = '#cccccc';
    // ctx.lineWidth = 1;
    // const maxX = displayWidth - 1;
    // const maxY = displayHeight - 1;
    // // draw vertical separators for columns, but skip the right-most border
    // for (let x = 0; x < this.cols; x++) {
    //   const px = Math.min(x * this.cellSize, maxX);
    //   ctx.beginPath();
    //   ctx.moveTo(px + 0.5, 0.5);
    //   ctx.lineTo(px + 0.5, maxY + 0.5);
    //   ctx.stroke();
    // }
    // // draw horizontal grid lines but skip the top border (y=0) to match Tetris style
    // for (let y = 1; y <= internalRows; y++) {
    //   const py = Math.min(y * this.cellSize, maxY);
    //   ctx.beginPath();
    //   ctx.moveTo(0.5, py + 0.5);
    //   ctx.lineTo(maxX + 0.5, py + 0.5);
    //   ctx.stroke();
    // }
  }
      finTimer = () =>
        {
          this.endGame();
            this.setState({afficheResultat : true});
        }


  render() {
    return (<React.Fragment>
     <Helmet>
                    <title>Le tetris de la culture</title>
                    <meta name="description" content="Un tetris culturel où le but est de reconstituer des tableaux connus." />
    
                </Helmet>
                {this.state.afficheResultat ?
                 <Resultat score={this.state.score} typeExo='vitessetetris'></Resultat> :
    <div>

      <div className="game-wrapper">
        {this.state.imageSrc && (
          <img className="background-image" src={this.state.imageSrc} alt="jeu" />
        )}
        <div className="container">
          <canvas ref={this.canvasRef} className="canvas"></canvas>
        </div>
  
      </div>    <div className='texteTitre'>{this.state.nomTableau}</div>
      <div className="marge20 centre"> <CompteRebours temps={100} finTimer={this.finTimer}></CompteRebours></div>
      
      </div>}
      </React.Fragment>
   );
  }
}


