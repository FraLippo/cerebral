export default class Logique {
    static constructionBriques() {
        const voyelles = ["E", "A", "E", "I", "O", "U"];
        const consonnesFrequentes = ["S", "N", "R", "T", "L", "C", "D", "M"];
        const consonnesMoinsFrequentes = ["P", "V", "F", "B", "G", "H", "J", "Q"];


        let tabConstruction = [{ type: voyelles, nb: 4 }, { type: consonnesFrequentes, nb: 4 }, { type: consonnesMoinsFrequentes, nb: 2 }];
        let tabBriques = [];
        for (let k = 0; k < 10; k++) {
            let tabLignes = [];
            for (let j = 0; j < tabConstruction.length; j++) {
                let map = new Map();
                let i = 0;
                while (i < tabConstruction[j].nb) {
                    let v = tabConstruction[j].type[Math.floor(Math.random() * voyelles.length)];
                    if (!map.has(v)) {
                        map.set(v, 1);
                        tabLignes.push({lettre : v, etat : "init", selection : k===9 });
                        i++;
                    }
                    else {
                        let r = map.get(v);
                        if (r < 2 && tabConstruction[j].nb !== 2) {
                            map.set(v, r + 1);
                            i++;
                            tabLignes.push({lettre : v, etat : "init", selection : k===9 });
                        }
                    }


                }
            }
            tabLignes = this.shuffleArray(tabLignes);
            for (let index = 0; index < tabLignes.length; index++) {
                tabLignes[index] = {...tabLignes[index], no : (k *10) +index};            
            }
            tabBriques = [...tabBriques, ...tabLignes];
        }

        return tabBriques;

    }

    static creationSaisie()
    {
        let tabSaisie = [];
        for (let index = 0; index < 10; index++) {
           tabSaisie.push({lettre : '', etat : "init", selection : false})      
        }
        return tabSaisie;
    }


       static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}