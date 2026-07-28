import React, { Component } from "react";

export default class Symbole extends Component {

    render() {

        const couleur = this.props.couleur;

        switch (this.props.type) {

            case "circle":

                return (

                    <svg width="24" height="24" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill={couleur}
                        />
                    </svg>

                );

            case "triangle":

                return (

                    <svg width="24" height="24" viewBox="0 0 100 100">
                        <polygon
                            points="50,12 90,88 10,88"
                            fill={couleur}
                        />
                    </svg>

                );

            case "cross":

                return (

                    <svg width="24" height="24" viewBox="0 0 100 100">

                        <rect
                            x="42"
                            y="10"
                            width="16"
                            height="80"
                            fill={couleur}
                        />

                        <rect
                            x="10"
                            y="42"
                            width="80"
                            height="16"
                            fill={couleur}
                        />

                    </svg>

                );

            case "star":

                return (

                    <svg width="24" height="24" viewBox="0 0 100 100">

                        <polygon
                            fill={couleur}
                            points="
                            50,8
                            61,37
                            92,37
                            67,56
                            77,88
                            50,69
                            23,88
                            33,56
                            8,37
                            39,37
                            "
                        />

                    </svg>

                );

            default:
                return null;
        }

    }

}