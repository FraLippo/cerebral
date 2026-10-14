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
        {"Règles du jeu"}
        </Button>
        <Modal
          title={"Règles du jeu"}
          open={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <p>{"Ce jeu reprend les grands principes du Bingo qui est une variante du Loto."}</p>
<p>{"Des nombres sont tirés au sort et vous devez les cocher sur votre grille. Vous jouez contre deux autres personnes, la première qui a réussi à compléter une ligne ou une colonne a gagné."}</p>
<p>{"On peut avoir plusieurs gagnants en même temps."}</p>
<p>{"Le tirage des nombres est plus ou moins rapide en fonction du niveau de difficulté."}</p>
        </Modal>
      </>
    );
  }
}