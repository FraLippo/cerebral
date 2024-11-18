function generateLetterArray(result, nbLettres, type) {
    // Définir les lettres les plus communes
    const vowels = ['A', 'I', 'O', 'U'];
    const consonants = ['N', 'R', 'T', 'L', 'S', 'C', 'D', 'M', 'P', 'G', 'B', 'V', 'F'];
    let pool = [];
    if (type === 'voyelle') {
        pool = vowels;
    }
    else {
        pool = consonants;
    }
    // Créer les tableaux pour les voyelles et les consonnes (8 de chaque)

    const counts = {}; // Pour limiter chaque lettre à 2 occurrences

    // Fonction pour ajouter une lettre de manière contrôlée
    for (let index = 0; index < nbLettres; index++) {

        let letter;
        do {
            letter = pool[Math.floor(Math.random() * pool.length)];
        } while (counts[letter] >= 2); // Vérifie que la lettre n'est pas déjà présente 2 fois
        result.push(letter);
        counts[letter] = (counts[letter] || 0) + 1;


    }
    return result;
}

function create16LettersArray() {
    let result = [];
    result = generateLetterArray(result, 5, 'voyelle');
    result.push('E');
    result.push('E');
    result.push('E');
    result = [...generateLetterArray(result, 8, 'consonne')];
    console.log(result)
    return result.sort(() => Math.random() - 0.5);
}

function create6LettersArray() {
    let result = [];
    result = generateLetterArray(result, 2, 'voyelle');
    result.push('E');
    result = [...generateLetterArray(result, 3, 'consonne')];
    return result.sort(() => Math.random() - 0.5);
}

export { create16LettersArray, create6LettersArray }