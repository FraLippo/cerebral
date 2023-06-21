import React, { Component } from 'react';



export default class NotesInconnues extends Component {
   
    render() {
        return <div className="centreGrilleNote">{this.props.tabNotesInconnues.map((note, i) => <div id={i} className="clavierNote" key={i}>?</div>)}</div>
    }
}