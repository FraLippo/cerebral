import React, { Component } from 'react';
import flecheHeure from '../../../images/rotation1.png';
import flecheAntiHeure from '../../../images/rotation2.png';
import flecheHaut from '../../../images/flecheRobotHaut.png'
import { Button } from 'antd';

export default class Directions extends Component
{

    constructor()
    {
        super();
    }

    clic = (no) =>
    {
   
        this.props.ajoutDirection(no);
    }

    choixImage(no,key, etat)
    {
        let couleur = 'bordRobot bordRobotVide';
        console.log(etat);
        if (etat === 'actif')
        {
            couleur = 'bordRobot bordRobotActif';
        }
        if (no === 1) return <div key={key} className={couleur}><img src={flecheHaut} alt='fleche haut'></img></div>
        if (no === 2) return <div key={key} className={couleur}><img src={flecheHeure} alt='fleche rotation horaire'></img></div>       
        if (no === 3) return <div key={key} className={couleur}><img src={flecheAntiHeure} alt='fleche rotation antihoraire'></img></div>
    }

    reset = () =>
    {
        this.props.reset();
    }

    render()
    {
    return <div className="jeuCouleur">
    <div className="directionsRobots">
        {this.props.tabDirections.map((info, i) => this.choixImage(info.no,i+500, info.etat)) }
    </div>
    <div className="jeuVitesse"> 
        <div onClick={() => this.clic(1)} className='bordRobot bordRobotPlein'><img src={flecheHaut} alt='fleche haut'></img></div>
        <div onClick={() => this.clic(2)} className='bordRobot bordRobotPlein'><img src={flecheHeure} alt='fleche rotation horaire'></img></div>
        <div onClick={() => this.clic(3)} className='bordRobot bordRobotPlein'><img src={flecheAntiHeure} alt='fleche rotation antihoraire'></img></div>
    </div>
    <Button type="primary"  onClick={this.reset}>Reset</Button>
    </div> 

    }
}