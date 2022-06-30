import React, { Component } from 'react';

export default class PuzzleRotationJeu extends Component {

    constructor(props)
    {
        super(props);
        
        let degre = 0;
        switch(this.props.rotation)
        {
            case 1 : degre = 1; break;
            case 2 : degre = 2; break;
            case 3: degre = 3; break
            default : degre = 0; break;

        }

        this.state = {
            classe :  'rotationDepart' + degre 
        }
    }

  

    constructionEmplacement(position)
    {
       
        let y = (Math.floor(position / this.props.taille)) + 1;
        let x = position % this.props.taille + 1;

        return {
            gridColumnStart : x, 
            gridColumnEnd : x,
            gridRowStart : y,
            gridRowEnd : y
        }
    }
    clicImage =(e) =>
    {
        const id = parseInt(e.currentTarget.id);
        const noRotation = this.props.augmenterRotation(id);
       this.setState({
           classe : 'rotation' + noRotation
       });
    }

    finAnimation = () =>
    {
       
        this.props.verifierFin();
    }

    render()
    {
        return <div style={this.constructionEmplacement(this.props.position)}><img id={this.props.position} onAnimationEnd={this.finAnimation} onClick={this.clicImage} style={{maxWidth: '100%'}} className={this.state.classe} src={'/images/puzzleRotation/' + this.props.nomImage}  alt={'puzzle ' + this.props.position}></img></div>
    }
}