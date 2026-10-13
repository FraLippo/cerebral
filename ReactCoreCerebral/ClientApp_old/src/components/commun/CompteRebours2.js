import React, { Component } from 'react';
import { Progress } from 'antd';


export default class CompteRebours2 extends Component {

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
        return     <Progress  strokeColor={{
            '0%': '#108ee9',
            '100%': '#e70b0b',
          }} type="circle" width={60} showInfo={false}  percent={this.state.temps} />
    }
}