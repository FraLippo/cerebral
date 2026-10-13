import React, { Component } from 'react';

export default class Cases extends Component {

    clic = (event) => {
        const id = parseInt(event.currentTarget.id);
        this.props.clic(id)
}


    render()
    {
        return <div className='casesBoo'>
            {this.props.contenu.map((info, i) =>  <svg id={i} onClick={this.clic} key={i} style={{position: 'absolute', top: info.y + 'px', left: info.x + 'px'}}  width="120" height="120" >
          <polygon points="120,60 90,112 30,112 0,60 30,8 90,8" fill={ i===3 ? "yellow" :"orange"}></polygon>
          <text className={"celluleLettre " + this.props.animation} x="45%" y="50%" fill="purple" dy="0.35em" >{info.lettre}</text>       
      </svg>)}

        </div>
    }
}