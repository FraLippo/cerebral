import React, { Component } from 'react';


export default class Case extends Component
{
    clic = (event) => {
        const no = parseInt(event.target.id);
        this.props.clic(no);
    }
   

    render()
    {
        return <div>
            <h2>La formule de politesse</h2>
           <div className='plateauCategorie'> {this.props.tabPolitesse.map((politesse) => 
        <div className={politesse.etat === 'selection' ? 'caseLangue caseLangueSelection' : 'caseLangue'} onClick={this.clic} key={politesse.id} id={politesse.id}>{politesse.formule}
        </div>)}</div>
        <div><h2>La langue</h2>
        <div className='plateauCategorie'> {this.props.tabLangue.map((info) => 
        <div className={info.etat === 'selection' ? 'casePays casePaysSelection' : 'casePays'} onClick={this.clic} key={info.id} id={info.id}>{info.langue}
        </div>)}</div>
        </div>
        
        </div>
    }
}