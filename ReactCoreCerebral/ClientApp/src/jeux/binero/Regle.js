import { Modal, Button } from 'antd';
import React, { Component } from 'react';

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
        <p>2 règles à respecter pour jouer. </p>
        <p>+ Chaque ligne et chaque colonne contiennent autant de 0 que de 1. Pour une grille de 4x4 vous avez donc obligatoirement deux 0 et deux 1 pour chaque ligne et chaque colonne. Trois 0 et trois 1 pour une grille de 6x6.</p>
       <p>+ Pas plus de deux 0 ou deux 1 consécutifs. Pour une grille de 4x4 la ligne 0110 est correcte mais vous n'avez pas le droit d'avoir la ligne 0111 car il y a trois 1 qui se suivent.</p>
       <p>À partir de ces 2 règles vous pouvez compléter la grille en cliquant sur les cases vides.</p>
              <p>Bon jeu !</p>
        
        </Modal>
      </>
    );
  }
}