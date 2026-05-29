
import React, { Component } from 'react';
import { Button } from 'antd';



export default class Saisie extends Component {

    constructor() {
        super();
        this.tabNombre = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        this.state = {
            nombre: ''
        }
    }

    clickNombre = (event) => {
        const id = event.currentTarget.id;
        let nombre = this.state.nombre.includes(' ') ? id : this.state.nombre + id;
           
            event.preventDefault();
            let result = this.props.clickNombre(nombre);

            if (result === 'gagne' || result === 'perdu'){
                if (result === "gagne") {
                    nombre += ' ✅';
                  }else if (result === "perdu") {
                      nombre += ' 🔴';
                  }
                  window.setTimeout(() => {
                    this.setState({ nombre : ''});
                    this.props.nouveauNombre();
                  }, 500);
            }
           
       this.setState({ nombre});

    }


    clickReset = () => {
        this.setState({ nombre: '' });
    }

   

    render() {

        return <div>
            <h3 className='centre'>Entrez votre réponse</h3>
            <div className="zoneSaisieOp" dangerouslySetInnerHTML={{ __html: this.state.nombre }}></div>
            <ul className="calculatriceOp">
                {this.tabNombre.map(nombre=> <li key={nombre} id={nombre} onClick={this.clickNombre} className="nombreOp">{nombre}</li>)}
            </ul>
            <div className="centre marge20"><Button size="large"  onClick={this.clickReset}>Reset</Button></div>
        </div>

    }
}