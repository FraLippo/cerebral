export default class Logique {

    constructor() {
    

        // cartes disponibles avec pondération
        this.poolSmall = [1,2,3,4,5,6,7,8,9];
        this.poolSmallWeight = 6; // plus de chances d'avoir des petits

        this.poolUnique = [10,25,50,75,100]; // max 1 tiré parmi ceux-là

        this.patterns = [
            (a,b,c) => a + b * c,
            (a,b,c) => (a + b) * c,
            (a,b,c) => a * b - c,
            (a,b,c) => a * (b + c),
            (a,b,c,d) => (a + b) * (c - d)
        ];
    }

    tirerCartes(nb = 6) {
        let cartes = [];

        // ajouter 4 petits avec pondération
        for(let i = 0; i < nb - 2; i++){
            for(let j = 0; j < this.poolSmallWeight; j++){
                const n = this.poolSmall[Math.floor(Math.random()*this.poolSmall.length)];
                cartes.push(n);
            }
        }
        // échantillonner 4 parmi ce tas pour éviter répétitions extrêmes
        cartes = cartes.sort(() => 0.5 - Math.random()).slice(0, nb - 2);

        // ajouter 0 ou 1 carte spéciale
        if(Math.random() < 0.7){ // 70% de chances d'en ajouter une
            const rare = this.poolUnique[Math.floor(Math.random()*this.poolUnique.length)];
            cartes.push(rare);
        }

        // compléter si besoin avec petits
        while(cartes.length < nb){
            cartes.push(this.poolSmall[Math.floor(Math.random()*this.poolSmall.length)]);
        }

        return cartes;
    }

    generer(maxResult) {
        
        let cartes, result;

        do {
            cartes = this.tirerCartes();

            const nums = [...cartes].sort(() => 0.5 - Math.random());
            const pattern = this.patterns[Math.floor(Math.random()*this.patterns.length)];

            const args = nums.slice(0, pattern.length);

            result = pattern(...args);

        } while(
            !Number.isInteger(result) ||
            result <= 0 ||
            result > maxResult ||
            cartes.includes(result) // résultat ≠ une carte
        );

        return {
            cartes,
            resultat: result,
            solution : ''
        };
    }
}
