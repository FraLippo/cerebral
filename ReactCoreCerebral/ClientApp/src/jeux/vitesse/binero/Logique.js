export default class Logique {
    constructor() {
        this.taille = 6;
        this.maxTentatives = 50; // Limite le nombre de tentatives
    }

    genererGrille(nbCasesVides) {
        let tentative = 0;
        let grille;

        // Essayer de générer une grille valide
        do {
            grille = this.creerGrilleValide();
            tentative++;
            console.log(tentative);
        } while (!grille && tentative < this.maxTentatives);

        if (!grille) {
            alert("Impossible de générer une grille valide");
        }

        // Créer une copie de la solution
        const solution = grille.map(row => [...row]);

        // Retirer des cases aléatoirement
        const positions = this.shuffleArray(
            Array.from({ length: this.taille * this.taille }, (_, i) => i)
        );

        for (let i = 0; i < nbCasesVides && i < positions.length; i++) {
            const row = Math.floor(positions[i] / this.taille);
            const col = positions[i] % this.taille;
            grille[row][col] = 9;
        }

        return { grille, solution };
    }

    creerGrilleValide() {
        // Partir d'une grille vide
        let grille = Array(this.taille).fill().map(() => Array(this.taille).fill(null));

        // Remplir ligne par ligne
        for (let row = 0; row < this.taille; row++) {
            let tentativesLigne = 0;
            let ligneTrouvee = false;

            while (!ligneTrouvee && tentativesLigne < 50) {
                // Réinitialiser la ligne
                grille[row].fill(null);

                // Essayer de remplir la ligne
                if (this.remplirLigne(grille, row)) {
                    ligneTrouvee = true;
                } else {
                    tentativesLigne++;
                }
            }

            if (!ligneTrouvee) return null;
        }

        return grille;
    }

    remplirLigne(grille, row) {
        let positions = this.shuffleArray([0, 1, 2, 3, 4, 5]);
        let valeursPossibles = new Set(positions);

        // Remplir d'abord les positions obligatoires
        for (let col = 0; col < this.taille; col++) {
            if (!this.estValide(grille, row, col, 0) && !this.estValide(grille, row, col, 1)) {
                return false;
            }
            if (!this.estValide(grille, row, col, 0)) {
                grille[row][col] = 1;
                valeursPossibles.delete(col);
            } else if (!this.estValide(grille, row, col, 1)) {
                grille[row][col] = 0;
                valeursPossibles.delete(col);
            }
        }

        // Remplir les positions restantes
        for (let col of valeursPossibles) {
            if (grille[row][col] === null) {
                let valeur = Math.random() < 0.5 ? 0 : 1;
                if (this.estValide(grille, row, col, valeur)) {
                    grille[row][col] = valeur;
                } else if (this.estValide(grille, row, col, 1 - valeur)) {
                    grille[row][col] = 1 - valeur;
                } else {
                    return false;
                }
            }
        }

        return true;
    }

    estValide(grille, row, col, valeur) {
        // Vérifier la ligne
        let countRow = grille[row].filter(x => x === valeur).length;
        if (countRow >= this.taille / 2) return false;

        // Vérifier la colonne
        let countCol = 0;
        for (let i = 0; i < this.taille; i++) {
            if (grille[i][col] === valeur) countCol++;
        }
        if (countCol >= this.taille / 2) return false;

        // Vérifier les séquences horizontales
        // Vérifier à gauche
        if (col >= 2 && grille[row][col - 1] === valeur && grille[row][col - 2] === valeur) return false;
        // Vérifier à droite
        if (col <= this.taille - 3 && grille[row][col + 1] === valeur && grille[row][col + 2] === valeur) return false;
        // Vérifier le milieu
        if (col >= 1 && col <= this.taille - 2 && grille[row][col - 1] === valeur && grille[row][col + 1] === valeur) return false;

        // Vérifier les séquences verticales
        // Vérifier en haut
        if (row >= 2 && grille[row - 1][col] === valeur && grille[row - 2][col] === valeur) return false;
        // Vérifier en bas
        if (row <= this.taille - 3 && grille[row + 1][col] === valeur && grille[row + 2][col] === valeur) return false;
        // Vérifier le milieu
        if (row >= 1 && row <= this.taille - 2 && grille[row - 1][col] === valeur && grille[row + 1][col] === valeur) return false;

        return true;
    }

    shuffleArray(array) {
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    verifierGrille(grille, solution) {
        let result = true;
        let tabErreurs =[];
        // Vérifier que toutes les cases remplies correspondent à la solution
        for (let row = 0; row < this.taille; row++) {
            for (let col = 0; col < this.taille; col++) {
                // Si la case est remplie (9 = case vide)
                
                if (grille[row][col] >= 10) {
                    let c = grille[row][col];
                 
                    if (c >= 10) {
                        c -= 10;
                    }
            
                    // Vérifier si la valeur correspond à la solution
                    if (c !== solution[row][col]) {  
                            result = false;
                            tabErreurs.push({row, col});
                        };
                    
                }
            }
        }

        return {
            estValide: result,
            erreurs: tabErreurs
        };
    }

    // Vérifie si la grille est complètement remplie
    estComplete(grille) {
        for (let row = 0; row < this.taille; row++) {
            for (let col = 0; col < this.taille; col++) {
                if (grille[row][col] === 9) {
                    return false;
                }
            }
        }
        return true;
    }
}