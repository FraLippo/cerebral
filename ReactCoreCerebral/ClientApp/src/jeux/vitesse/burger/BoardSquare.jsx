
import { ImageBurger } from './ImageBurger';
import '../../../style/vitesse.css';
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemType';
import { useState } from 'react'

export const BoardSquare = ({ x, y, game,i, finJeu}) => {
    const [[elementX, elementY, type], setElementPos] = useState(game.elementPositions[i]);
    game.observe(setElementPos);

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
          accept: ItemTypes.BOX,
          canDrop: () => game.canMoveElement(x, y),
          drop: (item, monitor) => {game.moveElement(x, y, parseInt(monitor.getItem().type), finJeu); },
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
          }),
        }),
        [game],
      )
  return (
    <div
    ref={drop}
      role="Space"
      data-testid={`(${x},${y})) `}
     className={(i-1) % 3 === 0 ? 'caseVideBurger caseBordureBurger' :'caseVideBurger'  }
    >
    { elementX === x && elementY === y && <ImageBurger type={type}></ImageBurger>}
    </div>
  )
}
