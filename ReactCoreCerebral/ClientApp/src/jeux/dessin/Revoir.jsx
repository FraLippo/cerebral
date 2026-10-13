import React, { Component } from 'react';
import { Button } from 'antd';


export default class Revoir extends Component {
    
   
    clickBouton = () =>
    {
        this.props.changeNbRevoir();
    }

    
    render() {
        return  <span><Button className="espaceDroitMemoire" type="primary" onClick={this.clickBouton} >{"Revoir"}</Button>
        <b>{this.props.nbRevoir} {this.props.nbRevoir <= 1 ?"fois.": "fois."}</b></span>

    }
}