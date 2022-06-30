import React, { Component } from 'react';
import { Progress } from 'antd';
import '../../style/jeux.css';


export default class ProgressBar extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            temps : 0
        }
        
        this.timer = 0;
        
    }
    componentDidMount()
    {
        this.timer = setInterval(this.updateTimer, this.props.temps);
    }
    updateTimer = () =>
    {
        this.setState({
            temps : this.state.temps+1
        },
       this.finTimer)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    finTimer = () =>
    {
        if (this.state.temps === 100)
        {
        this.props.finTimer(); 
        clearInterval(this.timer);
        }
       
    }
    render()
    {
        return  <div className="centre espaceHaut">  <Progress   strokeColor={{
            from: '#87d068',
            to: '#df2d4e',
          }} percent={this.state.temps} showInfo={false} /></div>
    }
}