import AccesDonnees from '../../data/AccesDonnees';



export default class LogiquePyramide extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxpyramide',id)
    }

    static constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }
}