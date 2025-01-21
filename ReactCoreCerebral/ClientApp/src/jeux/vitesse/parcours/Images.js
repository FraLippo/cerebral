import React, { Component } from 'react';

export default class Image extends Component {

 
    clicImage =(e) =>
    {
        const id = parseInt(e.currentTarget.id);
        this.props.choixImage(id);       
    }

   
    render()
    {
        return <div className="afficheIcone">{this.props.tabImages.map((nom,i) => <img id={i} key={i} className="iconeMots" draggable="false" onClick={this.clicImage}  src={'/images/mots/' + nom + '.png'}  alt={'proposition ' + nom}></img>)}</div>
    }
}