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
        <p>Ce jeu reprend les grands principes du jeu télévisé "Le mot le plus long" avec des variantes.</p>
<p>Vous devez essayer de retrouver le mot le plus long à partir d'un tirage de lettres aléatoires. Une fois le tirage effectué, vous pouvez entrer un mot comprenant les lettres du tirage. Le logiciel accepte tous les mots communs au singulier ou au pluriel et <b>les verbes conjugués</b>.
    Les accents ne sont pas pris en compte. Nous utilisons le <b>dictionnaire officiel du Scrabble</b> pour valider les mots.
</p>
<p>Le jeu se déroule en 3 manches donc 3 tirages contre l'ordinateur. Si vous trouvez un mot plus long que l'ordinateur vous gagnez 2 points plus le nombre de lettres du mot.</p>
                <p>Si vous gagnez une partie difficile contre l'ordinateur, votre prénom sera inscrit sur le tableau d'honneur sur la page d'accueil du jeu.</p>

        </Modal>
      </>
    );
  }
}