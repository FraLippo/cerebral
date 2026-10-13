import React, { Component } from 'react';



export default class MotResultat extends Component
{



    render()
    {
          return  <div className='lignemaitre margeMenu'>{ this.props.tabReponse.map((item, i) =>  

    <div key={i+1000} className={item.etat === 'encours' ? 'casenormalm grisem' : item.etat === 'erreur'? 'casenormalm erreurm' : 'casenormalm'}>{item.lettre}</div>)}</div>
        
   
    }
}