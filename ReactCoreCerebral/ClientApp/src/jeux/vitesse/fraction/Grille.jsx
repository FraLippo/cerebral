import { Component } from 'react';




export default class Grille extends Component
{

  renderGrille() {
    const { tabGrille, nbCols } = this.props;

    const rows = Math.ceil(tabGrille.length / nbCols);

    return tabGrille.map((info, i) => {
        const row = Math.floor(i / nbCols);
        const col = i % nbCols;

        if (info === 0) {
            // Case vide
            return <div key={i} className="caseFrac"></div>;
        }

        const voisins = {
            haut: row > 0 ? tabGrille[(row - 1) * nbCols + col] : 0,
            bas: row < rows - 1 ? tabGrille[(row + 1) * nbCols + col] : 0,
            gauche: col > 0 ? tabGrille[row * nbCols + (col - 1)] : 0,
            droite: col < nbCols - 1 ? tabGrille[row * nbCols + (col + 1)] : 0,
        };

        const style = {
            borderTop: voisins.haut === 0 ? '2px solid black' : 'none',
            borderBottom: voisins.bas === 0 ? '2px solid black' : 'none',
            borderLeft: voisins.gauche === 0 ? '2px solid black' : 'none',
            borderRight: voisins.droite === 0 ? '2px solid black' : 'none',
             boxShadow: '0 0 4px rgba(0,0,0,0.5)',  // par ex.
              background: info === 1 ?'#3498db' : null,
              cursor : 'pointer'
        };
  
        return (
            <div
                key={i}
                className={`caseFrac ${ info === 2 ? 'caseFracAnim' : '' }`}
                style={style}
                onClick={() => this.props.clic(i)}
            ></div>
        );
    });
}
render() {
    return (
        <div className="grilleFrac">
            {this.renderGrille()}
        </div>
    );
}
}