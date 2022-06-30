import React, { Component } from 'react';
import { Button } from 'antd';
import intl from 'react-intl-universal';


export default class Revoir extends Component {
    
   
    clickBouton = () =>
    {
        this.props.changeNbRevoir();
    }

    
    render() {
        return  <span><Button className="espaceDroitMemoire" type="primary" onClick={this.clickBouton} >{intl.get('DESSIN_REVOIR')}</Button>
        <b>{this.props.nbRevoir} {this.props.nbRevoir <= 1 ?intl.get('DESSIN_FOIS_SING'): intl.get('DESSIN_FOIS_PLUR')}</b></span>

    }
}