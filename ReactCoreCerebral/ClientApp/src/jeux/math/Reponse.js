import React, { Component } from 'react';

export default class Reponse extends Component {

    render() {
        return this.props.tabReponse.map((reponse,i)=> <span key={i} className="bordMath">{reponse}</span>)
          
    }
}
