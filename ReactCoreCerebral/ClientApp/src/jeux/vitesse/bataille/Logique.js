import { GRID_SIZE, SHIPS } from "./data";

export default class Logique {
   
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static generateGrid() {
        const grid = Array(GRID_SIZE).fill().map(() => 
            Array(GRID_SIZE).fill().map(() => ({
                ship: 0,
                state: 0,
                shipSize: 0,
                isHorizontal: false,
                isStart: false,
                isEnd: false
            }))
        );

        const shipList = SHIPS.flatMap(([size, count]) => 
            Array(count).fill(size)
        ).sort((a, b) => b - a);

        const placeShips = (index) => {
            if (index >= shipList.length) return true;
            
            const shipSize = shipList[index];
            const positions = [];
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {
                    positions.push([row, col]);
                }
            }
            this.shuffleArray(positions);

            for (const [row, col] of positions) {
                const orientations = [true, false];
                this.shuffleArray(orientations);
                
                for (const horizontal of orientations) {
                    if (this.canPlaceShip(grid, row, col, shipSize, horizontal)) {
                        this.placeShip(grid, row, col, shipSize, horizontal);
                        if (placeShips(index + 1)) return true;
                        this.removeShip(grid, row, col, shipSize, horizontal);
                    }
                }
            }
            return false;
        };

        if (!placeShips(0)) {
            throw new Error("No solution found");
        }
        return grid;
    }

    static canPlaceShip(grid, row, col, size, horizontal) {
        if (horizontal && col + size > GRID_SIZE) return false;
        if (!horizontal && row + size > GRID_SIZE) return false;

        for (let r = row - 1; r <= row + (horizontal ? 1 : size); r++) {
            for (let c = col - 1; c <= col + (horizontal ? size : 1); c++) {
                if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                    if (grid[r][c].ship !== 0) return false;
                }
            }
        }
        return true;
    }

    static placeShip(grid, row, col, size, horizontal) {
        for (let i = 0; i < size; i++) {
            const cell = horizontal ? grid[row][col + i] : grid[row + i][col];
            cell.ship = 1;
            cell.shipSize = size;
            cell.isHorizontal = horizontal;
            cell.isStart = (i === 0);
            cell.isEnd = (i === size - 1);
        }
    }

    static removeShip(grid, row, col, size, horizontal) {
        for (let i = 0; i < size; i++) {
            const cell = horizontal ? grid[row][col + i] : grid[row + i][col];
            cell.ship = 0;
            cell.shipSize = 0;
            cell.isHorizontal = false;
            cell.isStart = false;
            cell.isEnd = false;
        }
    }

    static generateGridWithHelp() {
        const grid = Logique.generateGrid();
        const gridHelp = Array(GRID_SIZE + 1).fill().map(() => 
            Array(GRID_SIZE + 1).fill().map(() => ({
                ship: 0,
                state: 0
            }))
        );

        // Copy grid
        for(let i = 0; i < GRID_SIZE; i++) {
            for(let j = 0; j < GRID_SIZE; j++) {
                gridHelp[i][j] = {...grid[i][j]};
            }
        }

        // Count ships in rows
        for(let i = 0; i < GRID_SIZE; i++) {
            gridHelp[i][GRID_SIZE].ship = grid[i].reduce((sum, cell) => sum + cell.ship, 0);
        }

        // Count ships in columns
        for(let j = 0; j < GRID_SIZE; j++) {
            gridHelp[GRID_SIZE][j].ship = grid.reduce((sum, row) => sum + row[j].ship, 0);
        }

        return gridHelp;
    }

    static findSunkBoat(grid) {
        let flatGrid = grid
            .slice(0, GRID_SIZE)
            .flatMap((row, rowIndex) => 
                row.slice(0, GRID_SIZE)
                    .map((cell, colIndex) => ({cell, row: rowIndex, col: colIndex}))
            );
      
        // Find all ship start positions
        const shipStarts = flatGrid.filter(({cell}) => cell.isStart);
        
        // Group hit cells by ship
        const sunkShips = shipStarts.filter(({cell, row, col}) => {
            const shipCells = [];
            for(let i = 0; i < cell.shipSize; i++) {
                const checkPos = cell.isHorizontal 
                    ? {row: row, col: col + i}
                    : {row: row + i, col: col};
                
                const cellAtPos = flatGrid.find(pos => 
                    pos.row === checkPos.row && pos.col === checkPos.col
                );
                
                shipCells.push(cellAtPos);
            }
    
            // Check if all cells of this ship are hit

            return shipCells.every(pos => pos.cell.state === 1);
        });

        return sunkShips;
    }
}
