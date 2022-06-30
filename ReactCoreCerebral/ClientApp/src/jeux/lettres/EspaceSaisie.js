import React, { Component } from 'react';
import {Button} from 'antd';
import Logique from './LogiqueLettre';


export default class EspaceSaisie extends Component {

  
    
      clickBouton = () =>
      {
         this.props.verifierReponse(); 
      }
      reset = () =>
      {
          this.props.reset(true);
      }

    render()
    {
        return <React.Fragment><div className="grilleSaisieMot" >
              {this.props.tabLettresSaisies.map((lettre, i) => <div className="lettreSaisie"  key={i}  id={i} onClick={this.clickCarte} style={Logique.constructionEmplacement(i)}>{lettre}</div>)}
        </div>
        <Button disabled={this.props.disabled} className="espaceHaut" type="primary" onClick={this.clickBouton}>OK</Button>
        <Button disabled={this.props.disabled} className="espaceHaut autresJeux" type="primary" onClick={this.reset}>Reset</Button>
        <p className="espaceErreur messageErreur" >{this.props.messageErreur}</p></React.Fragment>
    }
}