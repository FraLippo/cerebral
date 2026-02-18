import React, { Component } from 'react';
import imageJeu from './images/image1.jpg';
import './tetris.css';

export default class JeuTetris extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.image = new Image();
    this.cellSize = 80;
    this.cols = 4;
    this.rows = 6;
    this.hiddenRows = 2; // extra invisible rows at top to give player time
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
    this.state = { message: null, messageType: null };
    this.messageTimeoutId = null;
  }

  componentDidMount() {
    this.image.onload = () => {
      this.initCanvas();
      this.initGame();
    };
    this.image.src = imageJeu;
  }

  componentWillUnmount() {
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
      // clear message timeout if any
      if (this.messageTimeoutId) {
        clearTimeout(this.messageTimeoutId);
        this.messageTimeoutId = null;
      }
  }

  initCanvas() {
    // compute responsive cell size based on available viewport
    const internalRows = this.rows + this.hiddenRows;
    const canvas = this.canvasRef.current;
    const wrapper = canvas.parentElement && canvas.parentElement.parentElement ? canvas.parentElement.parentElement : canvas.parentElement;
    const padding = 20; // leave some space
    // compute available height as viewport minus bottom reserved percent
    // enforce minimum reserved percent using `minBottomSpacePercent`
    const reserved = Math.max(this.minBottomSpacePercent, Math.min(0.9, this.bottomSpacePercent));
    const availableHeight = Math.max(100, Math.floor(window.innerHeight * (1 - reserved)) - padding);
    // prefer parent width when available to better fit layouts
    const parentWidth = wrapper ? wrapper.clientWidth : window.innerWidth;
    const availableWidth = Math.max(100, parentWidth - padding);

    // choose cell size to fit both directions
    let cellSizeByHeight = Math.floor(availableHeight / internalRows);
    let cellSizeByWidth = Math.floor(availableWidth / this.cols);
    let newCellSize = Math.max(16, Math.min(cellSizeByHeight, cellSizeByWidth));
    // cap the cell size to 320px (allow larger play area on big phones)
    newCellSize = Math.min(newCellSize, 320);

    this.cellSize = newCellSize;
    canvas.width = this.cols * this.cellSize;
    canvas.height = internalRows * this.cellSize; // include hidden rows so empty cells appear at top

    // size wrapper and background to match canvas
    if (wrapper) {
      wrapper.style.width = `${canvas.width}px`;
      wrapper.style.height = `${canvas.height}px`;
      const bg = wrapper.querySelector('.background-image');
      if (bg) {
        bg.style.width = `${canvas.width}px`;
        bg.style.height = `${this.rows * this.cellSize}px`; // only visible rows
        bg.style.top = `${this.hiddenRows * this.cellSize}px`;
      }
    }

    const ctx = canvas.getContext('2d');
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
    // recompute sizes and redraw
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
    const row = -this.hiddenRows; // start above visible area (in hidden rows)
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
            console.log('Game over');
            this.currentPiece = null;
            cancelAnimationFrame(this.animationId);
            return;
          }
          this.lockPiece(lockRow, this.currentPiece.col, this.currentPiece.srcRow, this.currentPiece.srcCol);
          // reset down key so next piece doesn't inherit speed
          this.keyState.down = false;
          this.spawnPiece();
          break; // stop processing further drops this frame
        }
      }
    }

    this.renderGame();
    this.animationId = requestAnimationFrame(this.loop);
  }

  lockPiece(row, col, srcRow, srcCol) {
    // srcRow is image-row (0..rows-1); convert placed row to image-row by subtracting hiddenRows
    const placedImageRow = row - this.hiddenRows;
    const correct = srcRow === placedImageRow && srcCol === col;
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

    // show error message if placement incorrect
    if (!correct) {
      this.showMessage('Mauvaise position', 'error', 1200);
    }

    // check victory: every visible cell must be filled and correct
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
      this.showMessage('Bravo — image reconstituée !', 'success', 3000);
      // stop the game loop
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
  }

  showMessage(text, type = 'info', duration = 1500) {
    // clear previous message timeout
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
      this.messageTimeoutId = null;
    }
    this.setState({ message: text, messageType: type });
    if (duration > 0) {
      this.messageTimeoutId = setTimeout(() => {
        this.setState({ message: null, messageType: null });
        this.messageTimeoutId = null;
      }, duration);
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
          // game over
          console.log('Game over');
          this.currentPiece = null;
          cancelAnimationFrame(this.animationId);
          return;
        }
        this.lockPiece(targetRow, this.currentPiece.col, this.currentPiece.srcRow, this.currentPiece.srcCol);
        this.spawnPiece();
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
          // game over
          console.log('Game over');
          this.currentPiece = null;
          cancelAnimationFrame(this.animationId);
          return;
        }
        this.lockPiece(targetRow, this.currentPiece.col, this.currentPiece.srcRow, this.currentPiece.srcCol);
        this.spawnPiece();
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    // grid lines
    ctx.strokeStyle = '#cccccc';
    for (let x = 0; x <= this.cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * this.cellSize, 0);
      ctx.lineTo(x * this.cellSize, canvas.height);
      ctx.stroke();
    }
    // draw horizontal grid lines but skip the top border (y=0) to match Tetris style
    for (let y = 1; y <= internalRows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * this.cellSize);
      ctx.lineTo(canvas.width, y * this.cellSize);
      ctx.stroke();
    }
  }

  render() {
    return (
      <div className="game-wrapper">
        <img className="background-image" src={imageJeu} alt="target" />
        <div className="container">
          <canvas ref={this.canvasRef} className="canvas"></canvas>
        </div>
        {this.state.message ? (
          <div className={`game-message ${this.state.messageType || ''}`}>
            {this.state.message}
          </div>
        ) : null}
      </div>
    );
  }
}


