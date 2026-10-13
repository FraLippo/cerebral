import React, { Component } from 'react';



export default class Info extends Component {

    render()
    {
        return <div>      
        <div>Votre liste de mots déjà trouvée: 
            {this.props.listeMots.map((mot, i) => <div key={i+500}><b>{mot}</b></div>)}
        </div>
        </div>
    }
}