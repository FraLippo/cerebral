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
<p>Vous devez essayer de retrouver le mot le plus long à partir d'un tirage de lettres aléatoires. Une fois le tirage effectué vous pouvez entrer un mot comprenant les lettres du tirages. Le logiciel accepte tous les mots communs au singulier ou au pluriel et les verbes conjugués.
    Les accents ne sont pas pris en compte.
</p>
<p>Le jeu se déroule en 3 manches donc 3 tirages. Si vous trouvez un mot plus long que l'ordinateur vous gagnez 3 points plus le nombre de lettres du mot (6 points lors de la dernière manche).</p>
                <p>Il y a 5 niveaux de difficultés, pour le niveau 1 (facile) l'ordinateur trouve des mots de 3 lettres, pour le niveau 2 (intermédiaire) l'ordinateur trouve des mots de 4-5 lettres, niveau 3 (difficile) l'ordinateur trouve des mots de 5-6  lettres,  niveau 4 (très difficile) l'ordinateur trouve des mots de 5-8 lettres, niveau 5 (impossible) l'ordinateur trouve des mots de 6-9 lettres.</p>

        </Modal>
      </>
    );
  }
}