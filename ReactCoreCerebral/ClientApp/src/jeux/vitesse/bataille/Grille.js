import React, { Component } from 'react';
import { GRID_SIZE } from "./data";
import { navHaut } from '../../../images/navhaut.png'
export default class Grille extends Component {


    choixNavire(info) {
        let css = 'caseNav ';
        if (info.state !== 0) {
            if (info.shipSize > 1) {
                if (info.isStart && info.isHorizontal) {
                    css += 'gaucheNav'
                }
                if (info.isEnd && info.isHorizontal) {
                    css += 'droiteNav'
                }
                if (info.isStart && !info.isHorizontal) {
                    css += 'hautNav'
                }
                if (info.isEnd && !info.isHorizontal) {
                    css += 'basNav'
                }
                if (css === 'caseNav ') {
                    css += 'milieuNav'
                }

            }
            else {
                css += 'seulNav';
            }
        }
        return css;
    }
    clic = (event) => {

        const id = parseInt(event.currentTarget.id);
     
        this.props.clicGrille({ y: (Math.floor(id / (GRID_SIZE + 1))), x: id - (Math.floor(id / (GRID_SIZE + 1)) * 10) });

    }


    render() {
        return <div className='grilleNav'>{this.props.tabBataille.map((ligne, i) => ligne.map((info, j) =>
            <div onClick={this.clic} key={(i * 10) + j} id={(i * 10) + j} className={(j === GRID_SIZE || i === GRID_SIZE) ? 'caseIndiceNav' : info.ship === 1 ? this.choixNavire(info) : 'caseNav'} >{j === GRID_SIZE ^ i === GRID_SIZE ? info.ship :  info.state === 2 ? '❌' : ''}</div>))}
        </div>
    }
}