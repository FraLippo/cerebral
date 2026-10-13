import React, { useState} from 'react';
import { Modal,  Input  } from 'antd';
import '../../style/jeux.css';

export default function Prenom({callbackPrenom}) {

   const [visible, setVisible] = useState(true);
   const [prenom, setPrenom] = useState("");
   const [erreur, setErreur] = useState("");
  
  let handleOk = () => {
 
    if (prenom === "" || prenom.length <3) 
    {
        setErreur("Le prénom ne doit pas être vide et doit contenir plus de 2 lettres. Ajoute des chiffres si tu veux un prénom unique. ");
    }
    else
    {
        callbackPrenom(prenom + '@' + Math.floor(Math.random()*100000));
        setVisible(false);
    }
 };

 let handleCancel = (e) => {
  callbackPrenom("Inconnu" + Math.floor(Math.random()*1000));
  setVisible(false);
};

    
   
   return  <Modal closable={false}  cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} title={"Votre prénom"} visible={visible} onOk={handleOk}>
   <Input placeholder={"Votre prénom"} onChange={(event) => setPrenom(event.target.value)} value={prenom}></Input>
   <p className="centre espaceHaut">{erreur}</p>
 </Modal> 


}