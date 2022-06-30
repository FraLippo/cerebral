import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import intl from 'react-intl-universal';

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
        {intl.get('BINGO_REGLETITRE')}
        </Button>
        <Modal
          title={intl.get('BINGO_REGLETITRE')}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <p>{intl.get('BINGO_REGLE1')}</p>
<p>{intl.get('BINGO_REGLE2')}</p>
<p>{intl.get('BINGO_REGLE3')}</p>
<p>{intl.get('BINGO_REGLE4')}</p>
        </Modal>
      </>
    );
  }
}