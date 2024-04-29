
 



export default function Choix(props)
{
    const clicChoix = (event) =>
    {
        const id = parseInt(event.currentTarget.id);
        props.clicChoix(id)
    }

    const  clicOperation = (event) =>
    {
        const id = parseInt(event.currentTarget.id) - 4;
        props.clicOperateur(id)
    }

    return <div> <div className="marge20 chiffresAri">{props.tabChoix.map((choix,i)=> <div className="caseAri caseNombreAri pointeurMath" key={i}  id={i}  onClick={clicChoix}>{choix}</div>)}</div>
<div className="marge20 chiffresAri">{props.tabOperation.map((operateur,i)=> <div className="caseAri caseOpAri pointeurMath" key={i+4}  id={i+4}  onClick={clicOperation}>{operateur}</div>)}<div></div>
</div></div>
}