import React, { Component } from 'react';
import '../../style/jeux.css';


export default class JeuxPuzzle extends Component {

clickPuzzle = (e) =>
{
    const id = parseInt(e.currentTarget.id);
    this.props.clickPuzzle(id);
}

render()
{
return <div className={"puzzle" + this.props.placePuzzle+ this.props.bordure} onClick={this.clickPuzzle} id={this.props.placePuzzle}>{this.props.nom !== "" && <img className="image" src={"/images/puzzle/" + this.props.nom}  alt={"piecePuzzle" + this.props.placePuzzle}></img>}</div>
}
}