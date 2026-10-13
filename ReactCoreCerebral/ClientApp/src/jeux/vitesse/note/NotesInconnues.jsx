import React, { Component } from 'react';



export default class NotesInconnues extends Component {
   
    render() {
        return <div className="centreGrilleNote"><div id={1000} className="clavierNote" onClick={this.props.clicBouton} >🎵</div></div>
    }
}