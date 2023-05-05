

export default class Logique {

    static constuireParcours(etape) {

        let tabNbCases = [3,3,4,4,5,5,6,4,7,4,7]
        if (etape >= tabNbCases.length) {
            etape = tabNbCases.length-1;
        }
        let nbEnCours = 0;
        let pos = Math.floor(Math.random() * 24);
        let tabParcours = [pos];
        let tabDep =[];
        do {
            let tabPossibilite = [];
            if (pos > 7 && tabParcours.indexOf(pos - 7) === -1) {
                tabPossibilite.push(-7);
            }
            if (pos < 21 && tabParcours.indexOf(pos + 7) === -1) {
                tabPossibilite.push(7);
            }
            if (pos % 7 !== 0 && tabParcours.indexOf(pos - 1) === -1) {
                tabPossibilite.push(-1);
            }
            if ((pos + 1) % 7 !== 0 && tabParcours.indexOf(pos + 1) === -1) {
                tabPossibilite.push(1);
            }
            let dep = 0;
            if (tabPossibilite.length !== 0) {
                if (tabPossibilite.length === 1) {
                    dep = tabPossibilite[0];
                }
                else {
                    dep = tabPossibilite[Math.floor(Math.random() * tabPossibilite.length)];
                }
                nbEnCours++;
                tabParcours.push(pos + dep);
                tabDep.push(dep);
                pos = pos + dep
            }
            else {
                nbEnCours = 0;
                pos = Math.floor(Math.random() * 24);
                tabParcours = [pos];
                tabDep=[];
            }
         
        } while (nbEnCours < tabNbCases[etape])

      
            return {
                taille: 6,
                tabCase: tabParcours,
                tabDep: tabDep
        }
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