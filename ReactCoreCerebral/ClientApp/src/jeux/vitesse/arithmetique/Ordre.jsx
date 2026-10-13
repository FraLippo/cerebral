export default function Ordre(props)
{
   
    return  <div className="marge20 chiffresAri">{props.tabOrdre.map((ordre,i)=>
         <div className={(i === 0 || i ===2 || i==4 ? 'caseNombreAri ' : i == 1 ? 'caseOpAri ' :'caseOrdreAri ') + 'caseAri'} key={i+100}   id={i}  >{ordre}</div>)}</div>

}