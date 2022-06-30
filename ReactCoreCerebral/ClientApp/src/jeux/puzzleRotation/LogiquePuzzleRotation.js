import AccesDonnees from '../../data/AccesDonnees';

export default class LogiquePuzzleRotation extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxPuzzleRotation',id)
    }

    obtenirInfo()
    {
        return this.donnees.info;    
    }

    obtenirExplication()
    {
        return this.donnees.explication;
    }
    obtenirTaille()
    {
        return this.donnees.taille;
    }
    obtenirTemps()
    {
        return this.donnees.temps;
    }

}