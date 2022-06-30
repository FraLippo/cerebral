import React, { Component } from 'react';


export default class ElementSolution extends Component {

    constructor() {
        super();
        this.state = {
            classeCSS: ""
        }
        this.dejaClique = false;
    }
    componentDidMount() {
        this.obtenirStyleCarte();
    }
    constructionEmplacement(position) {

        let y = (Math.floor(position / 5)) + 1;
        let x = (position % 5) + 1;

        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y
        }

    }
    obtenirStyleCarte = () => {
        let classeCSS = ""
        if (this.props.carteResultat.type === "carte") {
            classeCSS = "disabled carteCompte curseur";
        }
        else if (this.props.carteResultat.type === "operation") {
            classeCSS = "disabled operation curseur";
        }
        else if (this.props.carteResultat.type === "resultat") {
            classeCSS = "carteCompte pointeur";
        }

        this.setState({
            classeCSS: classeCSS
        })
    }

    clickResultat = (e) => {
        if (this.props.carteResultat.type === "resultat" && !this.dejaClique) {
            let retour = this.props.clickResultat(this.props.carteResultat);
            if (retour) {
                this.dejaClique = true;
                const classeCSS = "disabled carteCompte curseur"
                this.setState({
                    classeCSS: classeCSS
                });
            }
        }
    }

    render() {
        return <div className={this.state.classeCSS} onClick={this.clickResultat} style={this.constructionEmplacement(this.props.carteResultat.position)}>{this.props.carteResultat.valeur}</div>
    }
}