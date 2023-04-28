export default class Logique {
    creerAdditionAleatoire() {
        let a = Math.floor(Math.random() * 40)+1;
        let b = Math.floor(Math.random() * 20)+1;
        let resultat = a + b;
        return { a, b, resultat };
    }

    creerSoustractionAleatoire() {
        let a = Math.floor(Math.random() * 40) + 10;
        let b = Math.floor(Math.random() * (Math.abs((a-7)))+1);
        let resultat = a - b;
        return { a, b, resultat };
    }

    creerMultiplicationAleatoire() {
        let a = Math.floor(Math.random() * 10)+ 2;
        let b = Math.floor(Math.random() * 9) + 2;
        let resultat = a * b;
        return { a, b, resultat };
    }

    creerDivisionAleatoire() {


        let a = 0;
        let diviseur = 0;
        let tabDiviseur = [];
        do {
            a = Math.floor(Math.random() * 90) + 10;
            diviseur = 12;
            while (diviseur > 1) {
                if (a % diviseur === 0) {
                    tabDiviseur.push(diviseur);
                }
                diviseur--;
            }
        } while (tabDiviseur.length === 0);
        let index = Math.floor(Math.random() * tabDiviseur.length);
        let b = tabDiviseur[index];
        let resultat = a / b;
        return { a, b, resultat };
    }
}