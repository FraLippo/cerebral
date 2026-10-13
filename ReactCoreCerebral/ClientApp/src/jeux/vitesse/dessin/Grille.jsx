import { getCoord } from "./utilitaire";
import { GRID_SIZE, SIZE, STEP } from "./utilitaire";
export default function Grille({lines} ) {

    return  <svg
        width={SIZE}
        height={SIZE}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {lines.map((line, i) => {
          const from = getCoord(line.from.row, line.from.col);
          const to = getCoord(line.to.row, line.to.col);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="purple"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
}
