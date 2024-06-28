import React, { useState} from 'react';
import { Modal } from 'antd';


export default function Info({niveau, tabAnimaux, callbackModal, msg}) {

   const [visible, setVisible] = useState(true);

  let handleOk = () => {
    callbackModal();

    
 };

 let handleCancel = (e) => {
    callbackModal();

  setVisible(false);
};

    
   
   return  <Modal closable={false}  cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}  open={visible} onOk={handleOk}>

   <p className="centre espaceHaut">Niveau : <b>{niveau}</b> / 3</p>
   <div>{msg}</div>
   <p>Clique sur</p>
   <ul className='fontMoyenne'>{tabAnimaux.map((nom,i) => <li key={i+500}>{nom}</li>)}</ul>
 </Modal> 


}