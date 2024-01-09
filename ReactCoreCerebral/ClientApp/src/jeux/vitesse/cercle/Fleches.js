import flecheheure from '../../../images/rotation1.png';
import flecheAntiHeure from '../../../images/rotation2.png';

export default function Fleches(props)
{
    function clic(event)
    {
        const id = parseInt(event.target.id);
        props.clicFleche(id);
  
    }

    return <div className="flechesCercle">
    <img src={flecheheure} alt="fleche gauche" id={props.no+1} onClick={clic} className="flecheCercle" ></img>
    <img src={flecheAntiHeure} alt="fleche droite" id={props.no+2}  onClick={clic} className="flecheCercle" ></img>
    </div>
  

}