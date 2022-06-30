import React, { Component } from 'react';
import { Button} from 'antd';
import intl from 'react-intl-universal';

import '../../style/jeux.css';


export default class Bouton extends Component
{
    clickBouton = () =>
    {
        this.props.click();
    }

    render()
    {
return (<Button className="espaceHaut" type="primary" onClick={this.clickBouton}>{intl.get('ORDRE_SUPPRIMER')} </Button>)
    }
}