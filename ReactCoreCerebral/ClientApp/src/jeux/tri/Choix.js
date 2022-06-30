import React, { Component } from 'react';
import '../../style/jeux.css';

export default class JeuxTri extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            animation : ""
        };
        
    }

    chercherClassName(no)
    {
        switch (no)
        {
            case 0:
                return "bouton3";
            case 1 : 
                return "bouton4";
            case 2 :
                return "bouton1";
            case 3:
                return "bouton2";
            default:
                alert("Error, Sorry");
        }
    }

    chercherDonneeTableau(donnee)
    {   
        let tabMessage = [];
        let k = 0;
            if (Array.isArray(donnee))
            {
                for (const elements of donnee) {
                    tabMessage.push(<div key={k}>{elements}</div>); 
                    k++;
                }   
                return tabMessage; 
            }
            else
            {
            return <div>{donnee}</div>;
               
            }       
    }
    finTimer = () =>
    {
        this.props.finDisable();
      //  if (this.state.animation ==='reussi')  this.props.nouveauTirage();
        this.setState({animation : ""});
       
    }
    clicElement = (event) =>
    {
        let tempsAnimation = 2000;
        const id = parseInt(event.currentTarget.id);
        if (isNaN(id)) 
        {
            alert("Erreur");
            return;
        }
        let animation = "echec";
        if (this.props.testResultat(id))
        {
            this.props.nouveauTirage();
            tempsAnimation = 700;
            animation = "reussi";
        }
        this.setState({animation});
        window.setTimeout(this.finTimer, tempsAnimation);
        
    }

    render()
    {
        return (
           <React.Fragment> 
               <button className={this.chercherClassName(this.props.numero) + " bordure "+ this.state.animation} id={this.props.numero} onClick={this.clicElement} >{this.chercherDonneeTableau(this.props.donnee)}</button>
        </React.Fragment>
        )
    }
}