import { ImageBurger } from "./ImageBurger";
import { BoardSquare } from "./BoardSquare";
import meat from '../../../images/meat.jpg';
import { message } from "antd";
import { useState } from "react";
/** Styling properties applied to the board element */
const boardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  columnGap : '20px',
  rowGap: '2px'
}
/** Styling properties applied to each square element */
const squareStyle = { width: '100px', height: '44px'}
/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }) => {
    const [fin, setFin] = useState(null)

   
    function finJeu() {  
      setFin('finBurger');
        message.success("Bravo",1, () => { setFin(null);  game.reset(); });
        
      
    }
  function renderSquare(i) {
    const x = i % 3
    const y = Math.floor(i / 3)
    return (
      <div key={i} style={squareStyle} className={fin} >
        <BoardSquare x={x} y={y} game={game} i={i} finJeu={finJeu}>

        </BoardSquare> 
      </div>
    )
  }
  const squares = []
  for (let i = 0; i < 15; i += 1) {
    squares.push(renderSquare(i))
  }
  return <div style={boardStyle}>{squares}</div>
}
