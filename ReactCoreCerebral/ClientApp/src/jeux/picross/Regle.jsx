import { Modal, Button } from 'antd';
import React, { Component } from 'react';

import cases4 from  '../../images/4cases.jpg';
import cases32 from '../../images/3cases2.jpg';
import cases31 from '../../images/3cases1.jpg';
import cases22 from '../../images/cases22.jpg';


export default class Regle extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

 

  render() {
    return (
      <>
        <Button type="default" onClick={this.showModal}>
          Règles du jeu
        </Button>
        <Modal
          title="Règles du jeu"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <p>Ce jeu suit les mêmes règles que le jeu classique du Picross ou Hanjie .</p>
       <p>Le but consiste à retrouver les cases noires dans chaque grille. Les chiffres donnés sur le côté et en haut de la grille vous donnent des indices. Ils indiquent la taille des blocs de cases noires de la ligne ou de la colonne sur laquelle ils se trouvent.</p>
       <p>Prenons comme exemple une grille de 4x4 (4 lignes et 4 colonnes).</p>
       <p>Si vous voyez un 4 dans la ligne à gauche de la grille, cela signifie que vous devez noircir 4 cases dans la ligne donc toutes les cases de la ligne.</p>
       <div><img src={cases4} alt="4 cases picross"></img></div>
        <p>Si vous voyez un 3 cela signifie que vous devez noircir 3 cases à la suite, dans une grille de 4 cases vous avez donc 2 possibilités. </p>
        <div><img src={cases31} alt="3 cases picross 1"></img></div>
            <div>ou</div>
         <div>     <img  src={cases32} alt="3 cases picross 2"></img></div>
         <p>Le principe reste le même pour les 2 et les 1 (vous devez noircir une seule case de la ligne). Le même principe s'applique pour les lignes et les colonnes.</p>
        <p>Maintenant vous pouvez voir 2 chiffres à gauche de la grille par exemple 1 2. Cela signifie que sur la même ligne vous avez 1 case noire séparée par au moins une case blanche et ensuite 2 cases noires. Vous n'avez qu'une seule possibilité pour une grille de 4x4. </p>
        <div> <img src={cases22} alt="2 cases picross "></img></div>
        <p>Vous pouvez aussi avoir 3 chiffres à gauche par exemple 1 1 2 dans des grilles plus grandes. Cela signifie 1 case noire séparée par au moins une case blanche puis une autre case noire séparée par au moins une case blanche et enfin 2 cases noires. </p>
        <p>Ce jeu est assez simple pour des petites grilles mais se complique très vite pour des grandes grilles.</p>
                  <p>Bon jeu !</p>
        
        </Modal>
      </>
    );
  }
}