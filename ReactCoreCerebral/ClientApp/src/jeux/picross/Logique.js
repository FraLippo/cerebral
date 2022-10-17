import AccesDonnees from '../../data/AccesDonnees';

export default class Logique  extends AccesDonnees
{
    constructor(id)
    {
        super('picross',id);
    
    }

        static calculLigneColonne(id, taille)
        {
            let y = Math.floor(id / taille);
            let x = (id % taille);
            return {x,y};
        }

        static ajoutIndice(tabX, tabY, tabJeu, id, taille)
        {
            if (tabJeu[id] === 1){
                tabJeu[id] = 0;
            }
            else
            {
                tabJeu[id] = 1;
            }
            let {x,y} = Logique.calculLigneColonne(id, taille);
            let ligne =0;
            let colonne = 0;
            let caseEnCoursX = 2;
            let caseEnCoursY = 2;

            for (let index = 0; index < tabX[0].length; index++) {
                tabX[x][index] = 0;
                tabY[y][index] = 0;               
            }

            for (let index = 0; index < taille; index++) {
                if (tabJeu[x + (colonne * taille)] === 0 && tabX[x][caseEnCoursX] > 0)
                {
                    caseEnCoursX--;
                }
                if (tabJeu[ligne + (y * taille)] === 0 && tabY[y][caseEnCoursY] > 0)
                {
                    caseEnCoursY--;
                }
                if (tabJeu[x + (colonne * taille)] === 1)
                {
                    tabX[x][caseEnCoursX]++;
                }
                if (tabJeu[ligne + (y * taille)] === 1)
                {
                    tabY[y][caseEnCoursY]++;
                }
                ligne++;
                colonne++;
                
            }
           
                Logique.swap( tabX[x]);   
                Logique.swap( tabY[y]);
        
            
        }
        static swap(tab)
        {
            if (tab[0] === 0 && tab[1] !== 0)
            {
                let temp = tab[2];
                tab[2] = tab[1];
                tab[1] = temp;
            }
            else if (tab[0] !== 0){
                tab.reverse();
            }
        }
}