import React, { useState} from 'react';
import { Modal,  Input  } from 'antd';
import '../../style/jeux.css';
import intl from 'react-intl-universal';

export default function Prenom({callbackPrenom}) {

   const [visible, setVisible] = useState(true);
   const [prenom, setPrenom] = useState("");
   const [erreur, setErreur] = useState("");
  
  let handleOk = () => {
 
    if (prenom === "" || prenom.length <3) 
    {
        setErreur(intl.get('PRENOM_MSG'));
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

    
   
   return  <Modal cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} title={intl.get('PRENOM')} visible={visible} onOk={handleOk}>
   <Input placeholder={intl.get('PRENOM')} onChange={(event) => setPrenom(event.target.value)} value={prenom}></Input>
   <p className="centre espaceHaut">{erreur}</p>
 </Modal> 


}