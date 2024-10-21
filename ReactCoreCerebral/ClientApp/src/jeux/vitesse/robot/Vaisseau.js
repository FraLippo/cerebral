import React, { Component } from 'react';
import vaisseauD from '../../../images/vaisseauD.png';
import vaisseauG from '../../../images/vaisseauG.png';
import vaisseauB from '../../../images/vaisseauB.png';
import vaisseauH from '../../../images/vaisseauH.png';

import { constructionEmplacement } from './utilitaire';

export default class Vaisseau extends Component
{

    constructor()
    {
        super();
       
    }
   
    rotationVaisseau()
    {
        switch (this.props.rotationVaisseau)
        {
            case 0 :
                return vaisseauH;
            case 1:
                return vaisseauD;
                case 2 :
                return vaisseauB;
            case 3:
                return vaisseauG;
            
        }
    }
    
    render()
    {
        return <div className='caseRobot' style={constructionEmplacement(this.props.position.y, this.props.position.x)}><img src={this.rotationVaisseau()} alt="vaisseau"></img></div>
      
    }
}