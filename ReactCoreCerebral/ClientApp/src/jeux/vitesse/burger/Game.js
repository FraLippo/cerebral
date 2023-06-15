export class Game {

    elementPositionsDepart = [[0, 0, 0], [-1, -1, -1], [2, 0, 0], [0, 1, 0], [-1, -1, -1], [2, 1, 0], [0, 2, 0], [-1, -1, -1], [2, 2, 0], [0, 3, 0], [-1, -1, -1], [2, 3, 0], [0, 4, 0], [-1, -1, -1], [2, 4, 0]]
    elementPositions = [];
    ordreBurger = [];
    observers = [];
    observerMsg = [];

    score=0;

    creerJeu() {
        this.construireBurger();
        this.elementPositions = [...this.elementPositionsDepart];
        this.construireGrille();

    }

    construireBurger() {
        let tabIngredient = [1, 2, 3, 4, 5, 8, 9, 10];
        this.ordreBurger.push(6);
        for (let index = 0; index < 3; index++) {
            let nombre = Math.floor(Math.random() * tabIngredient.length);
            this.ordreBurger.push(tabIngredient[nombre]);
            tabIngredient.splice(nombre, 1);

        }
        this.ordreBurger.push(7);

    }

    preparerMsg() {
        let tabListe = []
        for (let index = 0; index < this.ordreBurger.length; index++) {
            let ingredient = "";
            switch (this.ordreBurger[index]) {
                case 1: ingredient = "steack";
                    break;
                case 2: ingredient = "ketchup"
                    break;
                case 3: ingredient = "fromage";
                    break;
                case 4: ingredient = "salade";
                    break;
                case 5: ingredient = "bacon";
                    break;
                case 6: ingredient = "bun haut";
                    break;
                case 7: ingredient = "bun bas";
                    break;
                case 8: ingredient = "tomate";
                    break;
                case 9: ingredient = "cornichon";
                    break;
                case 10: ingredient = "oignon";
                    break;
            }
            tabListe.push(ingredient);

        }
        return tabListe;
    }
    construireGrille() {
        let tabIngredient = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let tabPlace = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];

        for (let index = 0; index < 10; index++) {
            let nombre = Math.floor(Math.random() * tabIngredient.length);
            this.elementPositions[tabPlace[index]][2] = tabIngredient[nombre]
            tabIngredient.splice(nombre, 1);


        }

    }

    moveElement(toX, toY, type, finJeu) {
        // this.emitChange();



        let place = -1;
        for (let index = 0; index < this.elementPositions.length; index++) {
            const element = this.elementPositions[index];

            if (element[2] === type) {
                place = index;
                break;
            }

        }
        
        this.observers[place]([-1, -1, -1]);

        this.observers[toY * 3 + toX]([toX, toY, type]);
        this.elementPositions[place] = [-1, -1, -1];
        this.elementPositions[toY * 3 + toX] = [toX, toY, type];

        if (this.verifierResultat()) {
            finJeu();
        }

    }
    canMoveElement(toX, toY) {

        for (let index = 0; index < this.elementPositions.length; index++) {
            let element = this.elementPositions[index];
            if (element[0] === toX && element[1] === toY) {
                return false;
            }
        }
        return true;
    }
    verifierResultat() {
        let place = 1;
        for (let index = 0; index < 5; index++) {
            if (this.elementPositions[place][2] !== this.ordreBurger[index]) {
                return false;
            }
            place += 3;
        }
        this.score += 5; 
        return true;
    }


    observe(o) {
        this.observers.push(o);
    }

    observeMsg(o) {
        this.observerMsg.push(o);
    }
 

    reset() {
        this.ordreBurger = [];
        this.construireBurger();
        this.elementPositions = [...this.elementPositionsDepart];
        this.construireGrille();
      
        for (let index = 0; index < 15; index++) {
            const set = this.observers[index];

            set([-1, -1, -1]);

        }
        window.setTimeout(() => {
            for (let index = 0; index < 15; index++) {
                const set = this.observers[index];

                set(this.elementPositions[index]);

            }
        }, 100);
        let tabListe = this.preparerMsg();
        this.observerMsg[0](tabListe);

    }

}
