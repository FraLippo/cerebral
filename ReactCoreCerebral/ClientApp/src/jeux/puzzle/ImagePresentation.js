import React, { Component } from 'react';

import '../../style/jeux.css';
import CompteRebours from '../../components/commun/CompteRebours';


export default class ImagePresentation extends Component {

    finTimer = () =>
    {
        this.props.finTimer();
    }

    render()
    {
        return <div className='gridImagePresentation'><CompteRebours temps={5} finTimer={this.finTimer} className="compteARebours"></CompteRebours><img className="image imagePresentation" src={'/images/puzzle/' + this.props.grandeImage} alt='grandeImage'></img></div>
    }
}