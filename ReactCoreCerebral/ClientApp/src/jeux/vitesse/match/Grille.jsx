import React, { Component } from 'react';

export default class Grille extends Component {

   
    clic =(e) =>
    {
        const id = parseInt(e.currentTarget.id);
        this.props.clic(id);
      
    }
    

    render()
    {
        return <React.Fragment>
            {this.props.tabGrille.map((info, i) => <div className={info.selection ? 'centreMatch selectionMatch' : 'centreMatch'}  id={i} onClick={this.clic}   key={i+100} 
            style={{gridColumn: info.x, gridRow: info.y,backgroundColor : info.fond}}>{info.contenu} </div>)}
            </React.Fragment>
    }
}

