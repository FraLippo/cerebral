import React from 'react';
import { constructionEmplacement } from './utilitaire';
import drapeauRobot from '../../../images/drapeauRobot.png';

export default function Drapeaux(props)
{
        return props.tabDrapeaux.map((info, i) => <div key={i + 1000} style={constructionEmplacement(info.x, info.y)}><img src={drapeauRobot} alt="drapeauRobot"></img></div>)   
}