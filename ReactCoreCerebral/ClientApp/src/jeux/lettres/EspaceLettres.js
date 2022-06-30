import React, { Component } from 'react';
import Logique from './LogiqueLettre';


export default class EspaceLettres extends Component {




    clickCarte = (event) => {
            const id = parseInt(event.target.id);
            if (isNaN(id)) {
                alert("Error");
                return;
            }
            this.props.clickCarte(id)

    }


    render() {
        return <div className={"grilleLettres"} key={this.props.lettres.join('')}>
            {this.props.lettres.map((lettre, i) => <div key={i} className={'carteCompte' + (this.props.disabled ? ' disabledLettre' : ' pointeur') + (lettre === '0' ? ' cacheLettre' : '')} id={i} onClick={this.clickCarte} style={Logique.constructionEmplacement(i)}>{lettre}</div>)}
        </div>
    }
}