import AccesDonnees from '../../data/AccesDonnees';



export default class Logique extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxFubuki',id)
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

    static verificationVictoire = (tabValeurs, taille) =>
    { 
         let perdu = false;
    
            let i = 0;           
            while (!perdu && i < taille -1)
            {
                let j=0;
                 let sommeY  = 0;
                 let sommeX = 0;
                while(j < taille-1)
                {
                  sommeY += tabValeurs[i+(taille*(j+1)) ];
                  sommeX += tabValeurs[((i+1) * taille)+j] ;
                  j++; 
                }
        
                if (sommeY !== tabValeurs[i] || sommeX !== tabValeurs[(((i+1) * taille)+ taille-1)])
                {
                    perdu = true;
                }
                i++;

            }    
         return perdu;
    }
}