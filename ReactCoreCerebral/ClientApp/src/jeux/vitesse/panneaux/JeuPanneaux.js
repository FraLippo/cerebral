import React, { Component } from 'react';
import listePanneaux from './Panneaux';



import { Helmet } from 'react-helmet';



export default class JeuPanneaux extends Component {

    constructor(props) {
        super();
        let tabPanneaux = listePanneaux();
        this.state= 
        {
            tabPanneaux
        }
        

    }
  
    


    render() {


        return <React.Fragment>
            <Helmet>
                <title>Retrouver les panneaux routiers</title>
                <meta name="description" content="Un jeu accessible à tous où vous devez être concentré pour trouver la tuile de mah-jong solitaire parmi une série de tuiles." />

            </Helmet>
            <div className='jeuMatch'>
            <div className='grilleRece'>{this.state.tabPanneaux.map((info, i) =><div className='panneauRoute'><img  src={info} alt="panneaux"></img></div>)}</div>
     </div>   </React.Fragment>


    }
}
