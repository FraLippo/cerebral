let infoJeuCarte = [{
    nbCarte: 4,
    typeQuestion: 'couleur' },
{
    nbCarte: 4,
    typeQuestion: 'couleur'
},
{
    nbCarte: 4,
    typeQuestion: 'formecouleur'
}

]

function creationJeu(niveau) {
    let infojeu = infoJeuCarte[niveau];  
    let tabCarte;
    let question;
    let i =0;
    do {
        i++;
     
        tabCarte = [];
        question = {};
        for (let index = 0; index < infojeu.nbCarte; index++) {
            let f = choixForme();
            let c = choixcouleur();
            tabCarte.push({ forme: f, couleur: c, etat: 'cardForme' })
        }
        question.type = infojeu.typeQuestion;
        question.forme = choixForme();
        question.couleur = choixcouleur();
    } while (verification(question, tabCarte))
    console.log("nb : " + i);
    return { question, tabCarte }

}

function choixForme() {
    let forme = Math.floor(Math.random() * 3);
    switch (forme) {
        case 0: return 'triangle';
        case 1: return 'cercle';
        case 2: return 'carre';
    }
    return forme;
}

function choixcouleur() {
    let couleur = Math.floor(Math.random() * 3);
    switch (couleur) {
        case 0: return 'rouge';
        case 1: return 'bleu';
        case 2: return 'blanc';
    }
}

function verification(question, tabCarte) {
    let i = 0;
    
    while (i < tabCarte.length && !(question.forme === tabCarte[i].forme && question.couleur === tabCarte[i].couleur)) {
     
      i++;
       
    }
    console.log(i);
    return i === tabCarte.length
}

function compterElement(question, tabCarte)
{
    let compteur = 0;
 
    for (let index = 0; index < tabCarte.length; index++) {
        if (verifierElement(question, tabCarte[index]))
        {
            compteur++;
        }
        
    }
    return compteur;
}

function verifierElement(question, carte)
{
    if (question.type === 'formecouleur' && question.forme === carte.forme && question.couleur === carte.couleur)
    {
        return true;
    }
    if (question.type === 'couleur' && question.couleur === carte.couleur)
    {
        return true;
    }
    if (question.type === 'forme' && question.forme === carte.forme)
    {
        return true;
    }
}

export { creationJeu, compterElement, verifierElement }