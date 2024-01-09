export default function Camembert(props)
{
    function clic(event)
    {
        const id = parseInt(event.target.id);
         props.clicCamembert(id);
    
    }

    function choixClasse(no)
    {

        if (props.tabLettres[no].etat === 'selection')
        {
            return 'selectionCercle'
        }
        else
        {
            return 'type0';
        }
    }

    return <svg className="svgCercle" width="100" height="100"  xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 0 A 50 50 0 0 1  85 15 L 50 50 L 50 0 Z" id={props.no} onClick={clic} className={choixClasse(0)}/>
    <path d="M 85 15 A 50 50 0 0 1 100 50 L 50 50 L 85 15 Z" id={props.no + 1}   onClick={clic} className={choixClasse(1)}/>
    <path d="M 100 50 A 50 50 0 0 1  85 85 L 50 50 L 100 50 Z" id={props.no + 2}   onClick={clic}className={choixClasse(2)}/>
    <path d="M 85 85 A 50 50 0 0 1  50 100 L 50 50 L 85 85 Z" id={props.no + 3}  onClick={clic} className={choixClasse(3)}/>
    <path d="M 50 100 A 50 50 0 0 1 15 85 L 50 50 L 50 100 Z" id={props.no + 4}  onClick={clic} className={choixClasse(4)}/>
    <path d="M 15 85 A 50 50 0 0 1 0 50 L 50 50 L 15 85 Z" id={props.no + 5}  onClick={clic} className={choixClasse(5)}/>
    <path d="M 0 50 A 50 50 0 0 1 15 15 L 50 50 L 0 50 Z" id={props.no + 6 }  onClick={clic} className={choixClasse(6)}/>
    <path d="M 15 15 A 50 50 0 0 1 50 0 L 50 50 L 15 15 Z" id={props.no+ 7}  onClick={clic} className={choixClasse(7)}/>

  
</svg> 
}