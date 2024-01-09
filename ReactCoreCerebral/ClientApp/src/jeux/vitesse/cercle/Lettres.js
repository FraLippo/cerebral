export default function Lettres(props)
{
    return props.tabLettres.map((infoLettre, i) => <div id={i+ (props.no * 10)}  key={i+ (props.no * 10)} 
    
    className={'lettreCercle' +(i+1) }>{infoLettre.lettre}</div>)
}