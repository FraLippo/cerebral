import React, { Component } from 'react';
import pers1 from '../../../images/pers1.png'
import piece001 from '../../../images/piece001.png'
import piece002 from '../../../images/piece002.png'
import piece005 from '../../../images/piece005.png'
import piece010 from '../../../images/piece010.png'
import piece020 from '../../../images/piece020.png'
import piece050 from '../../../images/piece050.png'
import piece1 from '../../../images/piece1.png'
import piece2 from '../../../images/piece2.png'
import billet5 from '../../../images/billet5.png'
import billet10 from '../../../images/billet10.png'
import billet20 from '../../../images/billet20.png'
import billet50 from '../../../images/billet50.png'

export default class Caisse extends Component {

    constructor(props) {
        super(props);



        this.state =
        {

        }
    }

    nomImage(no) {
        switch (no) {
            case 0.01:
                return piece001;
            case 0.02:
                return piece002;
            case 0.05:
                return piece005;
            case 0.1:
                return piece010;
            case 0.2:
                return piece020;
            case 0.5:
                return piece050;
            case 1:
                return piece1;
            case 2:
                return piece2;
            case 5:
                return billet5;
            case 10:
                return billet10;
                case 20:
                    return billet20;
                case 50:
                    return billet50;
        }
    }


    render() {
        return <React.Fragment>

            {this.props.tabPiece.map((no, i) => <img className='pieceMonnaie' key={i} src={this.nomImage(no)} alt="piece"></img>)}

        </React.Fragment>

    }

}