
var tableauCleValeur = [["erreur", 'COMPTE_IMPOSSIBLE'],
 ["division", "COMPTE_VIRGULE"],
 ["soustraction", "COMPTE_NEGATIF"],
 ["grand", "COMPTE_GRAND"],
 ["perdu", "COMPTE_PERDU"],
 ["gagne", "COMPTE_GAGNE"]];

let dictionnaireMessage = new Map(tableauCleValeur);

export default dictionnaireMessage;