import React, { Component } from 'react';
import '../../style/jeux.css';

export default class Operations extends Component {



    clickOperation =(e) =>
    { 
        const type = e.currentTarget.id;
        this.props.clickOperation(type);
    }
render()
{
    return <div className="grilleOperation">
        <div className="operation pointeur addition" id="addition" onClick={this.clickOperation}>+</div>
        <div className="operation pointeur soustraction" id="soustraction" onClick={this.clickOperation}>-</div>
        <div className="operation pointeur multiplication" id="multiplication" onClick={this.clickOperation}>x</div>
        <div className="operation pointeur division" id="division" onClick={this.clickOperation}>/</div>
    </div>
}

}