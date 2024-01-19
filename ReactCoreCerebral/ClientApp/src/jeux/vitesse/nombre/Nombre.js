import React, { Component } from 'react';
import { Button } from "antd"

export default class Nombre extends Component 
{

    constructor(props)
    {
        super(props);
        this.chaineNombre = props.nombre.toString();
      
    
        this.timer = 0;
        this.state =
        {
            nombreAffiche : this.chaineNombre[0]
        }
    }

    componentDidMount()
    {
        let i = 0;
        this.timer = window.setInterval(() => {
            
          
            i++; 
        
            if (i === this.chaineNombre.length)
            {
                clearInterval(this.timer);
            }
            else
            {
                let nombreAffiche = this.state.nombreAffiche;
                nombreAffiche += this.chaineNombre[i];
                this.setState({nombreAffiche})
            }
        
        }, 1000)
    }
    
    render()
    {
          return <div><div>{this.state.nombreAffiche}</div>{this.state.nombreAffiche.length === this.chaineNombre.length && <Button>J'ai mémorisé</Button>}</div>
    }
  
}