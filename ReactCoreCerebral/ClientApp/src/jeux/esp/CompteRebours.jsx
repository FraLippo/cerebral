import React, { Component } from 'react';

export default class CompteRebours extends Component {


    constructor(props) {
        super(props);
        this.state = {
            temps: this.props.temps
        }

        this.intervalId = window.setInterval(this.chrono, 1000);
    }
    componentWillUnmount()
    {
        window.clearInterval(this.intervalId);
    }
    chrono = () => {
        this.setState({
            temps: this.state.temps - 1
        })
        if (this.state.temps === 0) {
            window.clearInterval(this.intervalId);
            this.props.affichageCarte();
        }
    }

    render() {

        return <div className="centre grandeLettre"><div>{"Mémorisez les éléments"}</div><div>{this.state.temps}</div></div>
    }

}