import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import '../../style/jeux.css';

export default function Prenom({ callbackPrenom }) {

    const [visible, setVisible] = useState(true);
    const [prenom, setPrenom] = useState("");
    const [erreur, setErreur] = useState("");

    const handleOk = () => {

        if (prenom.trim().length < 3) {
            setErreur("Le prénom doit contenir au moins 3 lettres. Ajoute des chiffres si tu veux un prénom unique.");
        }
        else {
            callbackPrenom(prenom + '@' + Math.floor(Math.random() * 100000));
            setVisible(false);
        }
    };

    const handleCancel = () => {
        callbackPrenom("Inconnu" + Math.floor(Math.random() * 1000));
        setVisible(false);
    };

    return (
        <Modal
            closable={false}
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={handleCancel}
            title="Quel est ton prénom ?"
            open={visible}
            onOk={handleOk}
        >
            <Input
                placeholder="Ton prénom"
                onChange={(event) => setPrenom(event.target.value)}
                value={prenom}
            />
            <p className="centre espaceHaut">{erreur}</p>
        </Modal>
    );
}