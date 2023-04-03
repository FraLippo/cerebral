export default class Logique {
    choixCouleur = (couleur) => {
        switch (couleur) {
            case 0:
                return 'rougeV';
            case 1:
                return 'bleuV';
            case 2:
                return 'jauneV';
            case 3:
                return 'vertV';
            case 4:
                return 'roseV';
            case 5:
                return 'violetV';
            default:
                return 'rougeV';
        }
    }
    tiragecouleur = () => {
        let tirage = Math.floor(Math.random() * 6);
        return tirage;
    }
    choixMot = (motCouleur) => {

        switch (motCouleur) {
            case 0:
                return 'Rouge';
            case 1:
                return 'Bleu';
            case 2:
                return 'Jaune';
            case 3:
                return 'Vert';
            case 4:
                return 'Rose';
            case 5:
                return 'Violet';
            default:
                return 'Rouge';
        }
    }

    tirageAusort = () => {
        let tirage = Math.floor(Math.random() * 2);

        let tirage1 = this.tiragecouleur();
        let motHaut = this.choixMot(tirage1);
        let tirage2 = -1;
        if (tirage === 0) {

            do {
                tirage2 = this.tiragecouleur();

            } while (tirage2 === tirage)
        } else {
            tirage2 = tirage1;
        }
        let couleurBas = this.choixCouleur(tirage2);
        let tirage3 = Math.floor(Math.random() * 6);
        let motBas = this.choixMot(tirage3);
        return { resultat : !!tirage, motHaut, couleurBas, motBas };
    }
}