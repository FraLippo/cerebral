import flecheHaut from '../../../images/flecheHaut.png';
import flecheBas from '../../../images/flecheBas.png';
import flecheGauche from '../../../images/flecheGauche.png';
import flecheDroite from '../../../images/flecheDroite.png';


function choixImage(no)
{
    if (no === -7)
        return flecheHaut;
    else if (no === 7)
        return flecheBas;
    else if (no === -1)
        return flecheGauche;
    else if (no === 1)
        return flecheDroite;
    
}


function Direction(props)
{
    return props.tabDep.map((dep, i) => <span key={i}>{<img src={choixImage(dep)} alt="fleche" className="fleche" />}</span>)
}


export default Direction;