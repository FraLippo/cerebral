import { useState } from 'react';
import { Modal, Input } from 'antd';

import '../../style/jeux.css';

export default function Regles({ jeu, open, onClose }) {

  

    return (
        <Modal
            closable={false}
            cancelButtonProps={{ style: { display: 'none' } }}
            title="Règles du jeu"
            open={open}
            onCancel={onClose}
            onOk={onClose}
        >
           <div>{jeu}</div>
     
        </Modal>
    );
}