import React, { Component } from 'react';
import { Button } from "antd"


export default class Nombre extends Component 
{

    constructor(props)
    {
        super(props);
  
  
    
        this.timer = 0;
        this.state =
        {
            nombreAffiche : [props.nombre[0]]
        }
    }

   

    componentDidMount()
    { window.addEventListener('keydown', this.handleKeyPress);
        let i = 0;
        this.timer = window.setInterval(() => {
            
          
            i++; 
        
            if (i === this.props.niveau)
            {
                clearInterval(this.timer);
            }
            else
            {
                let nouveauNombreAffiche = [...this.state.nombreAffiche]
                nouveauNombreAffiche.push(this.props.nombre[i]);
                this.setState({nombreAffiche : nouveauNombreAffiche})
            }
        
        }, 300)
    }

    componentWillUnmount()
    {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
          this.props.clicNombre();
       
        }
      };

    clicNombre = () =>
    {
        this.props.clicNombre();
    }

 
    
    render()
    {
          return <div className='grandeTaille' >{this.state.nombreAffiche.map((nombre,i) => <span key={i} className='caseNombreMe'>{nombre}</span>)}
          <div></div>{this.state.nombreAffiche.join('').replace(/\s/g, '').length === this.props.niveau && <Button className='espaceHaut'
        
          
          onClick={this.clicNombre}>J'ai mémorisé</Button>}</div>
    }
  
}