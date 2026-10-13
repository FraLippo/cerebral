
var tableauCleValeur = [["erreur", "Cette opération n'est pas possible."],
 ["division", "Nombre à virgule interdit. Tu dois recommencer."],
 ["soustraction", "Nombre négatif interdit. Tu dois recommencer."],
 ["grand", "Nombre trop grand. Tu dois recommencer."],
 ["perdu", "Tu n'as pas trouvé le bon résultat, tu dois recommencer"],
 ["gagne", "Bravo ! Tu es un champion."]];

let dictionnaireMessage = new Map(tableauCleValeur);

export default dictionnaireMessage;