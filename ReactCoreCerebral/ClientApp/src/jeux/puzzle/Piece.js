import React, { Component } from 'react';
import '../../style/jeux.css';


export default class Piece extends Component {


    clickPiece = (e) =>
    {
        const id = parseInt(e.currentTarget.id);
        this.props.clickPiece(id - 100);
    }

 render()
 {
 return <div  className={"place" + this.props.placePiece + this.props.bordure} id={this.props.placePiece + 100} onClick={this.clickPiece}>{this.props.nom !== "" &&<img className="image" src={"/images/puzzle/" + this.props.nom}  alt={"piece" + this.props.placePiece}></img>}</div>
 }
}