import React, { Component } from 'react';

import '../../style/jeux.css';


export default class CompteRebours extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            temps : this.props.temps
        }
        this.timer = 0;
        
    }
    componentDidMount()
    {
        this.timer = setInterval(this.updateTimer, 1000);
    }
    updateTimer = () =>
    {
        this.setState({
            temps : this.state.temps-1
        },
       this.finTimer)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    finTimer = () =>
    {
        if (this.state.temps === 0)
        {
        this.props.finTimer(); 
        clearInterval(this.timer);
        }
       
    }
    render()
    {
        return <div className="compteARebours">{this.state.temps}</div>
    }
}