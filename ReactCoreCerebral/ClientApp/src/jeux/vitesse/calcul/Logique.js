
export default class Logique {

    constructor() {
        this.nombre = 0;
        this.tabNombresValides = [];
        this.tabNombresInvalides = [];
        this.tabResultatsComplet= [];
        this.tabOperation = [];
  
    }
    
    construireTableaux(max, min){
    
        this.construireNombre(max, min);
        this.construireTableauResultats();
        this.tabResultatsComplet= [...this.tabNombresValides, ...this.tabNombresInvalides];
        this.construireTableauOperations();
       this.tabOperation = this.melangerTableau(this.tabOperation);
     
    }

    verifierResultat = (no) => {
        let resultat = this.tabOperation[no].resultat;
        if (this.nombre.signe === ">") {
            return resultat > this.nombre.valeur;
        }
        else {
            return resultat < this.nombre.valeur;
        }
    }

    construireNombre(min, max) {
        this.nombre = {
            valeur: this.tirerNombre(max, min),
            signe: this.tirerSupOuInf()
        }
    }

    construireMessage() {
        return "Clique sur 2 cases dont le résultat est " + (this.nombre.signe == ">" ? "strictement supérieur" : "strictement inférieur") + " à " + this.nombre.valeur;
    }

    construireTableauResultats() {
        this.tabNombresValides = [];
        this.tabNombresInvalides = [];

        for (let index = 0; index < 3; index++) {
            if (this.nombre.signe === ">") {
                let nombre = this.tirerNombre(this.nombre.valeur + 15, this.nombre.valeur + 1);
                this.tabNombresValides.push(nombre);
            }
            else {
                let nombre = this.tirerNombre(this.nombre.valeur - 1, this.nombre.valeur - 15 < 1 ? 2 : this.nombre.valeur - 15);
                this.tabNombresValides.push(nombre);
            }
        }
        for (let index = 0; index < 6; index++) {
            if (this.nombre.signe === ">") {
                let nombre = this.tirerNombre(this.nombre.valeur - 1, this.nombre.valeur - 15 < 1 ? 2 : this.nombre.valeur - 15);
                this.tabNombresInvalides.push(nombre);
            }
            else {
                let nombre = this.tirerNombre(this.nombre.valeur + 15, this.nombre.valeur + 1);
                this.tabNombresInvalides.push(nombre);
            }
        }
    }

   

    construireTableauOperations(){
        this.tabOperation= [];
        for (let index = 0; index < this.tabResultatsComplet.length; index++) {
            
         //tire un nombre entre 1 et 2
        let nb = this.tirerNombre(2);
        if (nb === 1) {
           let nombre1 = this.tirerNombre(this.tabResultatsComplet[index] - 1,1);  
           let nombre2 = this.tabResultatsComplet[index] - nombre1;
           let signe = "+";
            this.tabOperation.push({
                nombre1, nombre2, signe, resultat: nombre1 + nombre2
            })
        }
        else
        {
            let nombre1 = this.tirerNombre(this.tabResultatsComplet[index] + 15, this.tabResultatsComplet[index] + 1);  
            let nombre2 = nombre1 - this.tabResultatsComplet[index];
            let signe = "-";
            this.tabOperation.push({
                nombre1, nombre2, signe, resultat: nombre1 - nombre2
            })
        }
    }
}

//fonction pour mélanger les élements de tabOperation
melangerTableau()
{
    let tabOperationsMelange = [];
    let tabTemporaire =[...this.tabOperation];
   //Mélange le tableau tabOperation
    while (tabTemporaire.length > 0) {
        let index =  Math.floor(Math.random() * tabTemporaire.length);
        tabOperationsMelange.push(tabTemporaire[index]);
        tabTemporaire.splice(index, 1);
    }
    return tabOperationsMelange;
}

contruireChainesOperations(){
    let tabOperationsChaine = [];
    for (let index = 0; index < this.tabOperation.length; index++) {
        tabOperationsChaine.push(this.tabOperation[index].nombre1 + " " + this.tabOperation[index].signe + " " + this.tabOperation[index].nombre2);
    }
    return tabOperationsChaine;
}


//tirer au nombre au hasard dans un intervalle
tirerNombre(max, min = 1)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


tirerSupOuInf()
{
 
    let nb = this.tirerNombre(2)
    if (nb === 1) {
        return ">";
    }
    else {
        return "<";
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