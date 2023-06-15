import React, { Component } from 'react';
import { Button} from 'antd';



export default class Bouton extends Component
{
    clickBouton = () =>
    {
        this.props.click();
    }

    render()
    {
return (<Button  type="primary" onClick={this.clickBouton}>Supprimer dernier élément</Button>)
    }
}