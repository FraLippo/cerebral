import React, { Component } from 'react';
import brushB from '../../../images/brushB.png';
import brushO from '../../../images/brushO.png';
import brushV from '../../../images/brushV.png';
import brushR from '../../../images/brushR.png';


export default class GrilleCouleur extends Component
{
    constructor(props)
    {
        super();
    }

    constructionEmplacementH(position)
    {
        return {
            gridColumn: (position * 2) +2 + ' / span 2',
            gridRow: 1
        }
    }

    constructionEmplacementV(position)
    {
        return {
           
            gridColumn: 1,
            gridRow: (position * 2) +2 + ' / span 2',
        }
    }

    clicV = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        this.props.clicV(id-20);
    }
    clicH = (event) =>
    {
       
        const id = parseInt(event.currentTarget.id);
    
        this.props.clicH(id-10);
    }
  
    choixImage = (nom) =>
    {
        if (nom === 'orange')
        return brushO;
    else if (nom === 'vert')
      return brushV;
    else if (nom === 'bleu')
        return brushB;
    else if (nom === 'rose')
        return brushR;

    }
    render()
    {
        return <React.Fragment>
            <React.Fragment>{this.props.tabGrilleH.map((nom, i) =>
             <div className='brushTresse' id={i+10} onClick={this.clicH}   key={i+10}  style={this.constructionEmplacementH(i)}>{nom !== '' && <img draggable="false" src={this.choixImage(nom)} alt="pinceau"></img>}</div>)}</React.Fragment>
               <React.Fragment>{this.props.tabGrilleV.map((nom, i) =>
             <div className='brushTresse' id={i+20} onClick={this.clicV}  key={i+20}  style={this.constructionEmplacementV(i)}>{nom !== '' &&<img draggable="false" src={this.choixImage(nom)} alt="pinceau"></img>}</div>)}</React.Fragment>
             
             </React.Fragment>
    }
}