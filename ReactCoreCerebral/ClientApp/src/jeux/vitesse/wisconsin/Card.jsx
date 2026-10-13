import React, { Component } from "react";
import Symbole from "./Symbole";

export default class Card extends Component {

    getPositions(nombre) {

        switch (nombre) {

            case 1:
                return [50];

            case 2:
                return [35, 65];

            case 3:
                return [25, 50, 75];

            case 4:
                return [17, 39, 61, 83];

            default:
                return [];
        }
    }

    render() {

        const positions = this.getPositions(this.props.nombre);

        return (

            <div
                style={{
                    width: 70,
                    height: 100,
                    background: "white",
                    border: "2px solid #777",
                    borderRadius: 10,
                    position: "relative",
                    boxShadow: "2px 2px 8px rgba(0,0,0,.15)"
                }}
                onClick={() => this.props.clicCarte({couleur : this.props.couleur, forme : this.props.forme, nombre : this.props.nombre})}
            >

                {positions.map((y, index) => (

                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: y + "%",
                            transform: "translate(-50%,-50%)"
                        }}
                    >

                        <Symbole
                            type={this.props.forme}
                            couleur={this.props.couleur}
                        />

                    </div>

                ))}

            </div>

        );
    }

}