export default class Logique {
    static construireGrille(tab, nb) {
        let i = 0;
        while (i < nb) {
            let hazard = Math.floor(Math.random() * tab.length);
            if (tab[hazard] != 1)
            {
                tab[hazard]=1;
                i++;
            }
         

        }
           return tab;
    }

}