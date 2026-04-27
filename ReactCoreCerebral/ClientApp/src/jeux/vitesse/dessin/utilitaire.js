  const getCoord = (row, col) => ({
    x: (col + 1) * STEP,
    y: (row + 1) * STEP,
  });

  const GRID_SIZE = 6;
const SIZE = 350;
const STEP = SIZE / (GRID_SIZE + 1);


  export {getCoord, GRID_SIZE, SIZE, STEP};