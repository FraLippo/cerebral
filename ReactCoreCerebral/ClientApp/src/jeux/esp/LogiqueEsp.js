import esp1 from '../../images/ESP1.png';
import esp2 from '../../images/ESP2.png';
import esp3 from '../../images/ESP3.png';
import esp4 from '../../images/ESP4.png';
import esp5 from '../../images/ESP5.png';
import AccesDonnees from '../../data/AccesDonnees';


export default class LogiqueEsp extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxEsp',id)  
    }


    static construireCarte(carte) {
        switch (carte) {
            case 1:
                return esp1;
            case 2:
                return esp2;
            case 3:
                return esp3;
            case 4:
                return esp4;
            case 5:
                return esp5;
            default :
                alert("Erreur");
        }
    }

    get cartes()
    {
        return this.donnees.info.map(el => el.carte);
    }

    get temps()
    {
        return this.donnees.temps;
    }
}