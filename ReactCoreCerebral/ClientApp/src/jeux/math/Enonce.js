import React, { Component } from 'react';

export default class Enonce extends Component {

   
    render() {
        return <div className="centre">{this.props.tabEnonce.map((reponse,i)=> reponse.contenu)}</div>
          
    }
}
