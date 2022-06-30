import React, { Component } from 'react';
import {Button, Input} from 'antd';


export default class EspaceConversation extends Component {

    constructor() {
        super();
        this.state = {mot: ''};
    }
    handleChange = (event) => {
       
        this.setState({mot: event.target.value}); 
      }

      clickBouton = () =>
      {
         this.setState({mot: ""});
         this.props.envoyerMessage(this.state.mot);
         
      }
 
    render()
    {
    return<div className="EspaceHaut"><div className="reception">{
        this.props.messages.map((message) => <div className="message animationSuite" key={message.id}><div className="deMessage">De : {message.de}</div><div>{message.contenu}</div></div>)
    }</div>
          <p className="espaceHaut">Saisir votre message</p>
        <Input className="EspaceHaut" type="text"  autoComplete="off" autoCorrect="off" autoCapitalize="off" 
        spellCheck="false" value={this.state.mot} onPressEnter={this.clickBouton} onChange={this.handleChange}></Input>
      
        <Button className="espaceHaut" type="primary" onClick={this.clickBouton}>Envoyer</Button></div>
   
   }
}