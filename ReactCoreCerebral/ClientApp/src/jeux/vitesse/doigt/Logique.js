import {mots} from '../lettres/data'
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUV'.split('');
const actions = [contient, neContientPas, commencePar, neCommencePasPar, finitPar, neFinitPasPar];
function creerListeMessage()
{  
    let tabQuestions = [];
    for (let index = 0; index < 10; index++) {
    const resultat = !!Math.floor(Math.random()*2);
    const mot = mots[Math.floor(Math.random()*mots.length)];
    const noAction = Math.floor(Math.random()*actions.length);

    tabQuestions.push(actions[noAction](mot, resultat))
        
    }
    console.log(tabQuestions);
    return tabQuestions;
}

function contient(mot, resultat)
{

   let lettre = '';
    if (resultat)
    {
        let noLettre = Math.floor(Math.random()*mot.length);
        lettre = mot[noLettre];
    }
    else
    {
        let depart = Math.floor(Math.random()*alphabet.length);
        while(mot.includes(alphabet[depart]))
        {
            if (depart < alphabet.length-1)
            {
                depart++;
            }
            else
            {
                depart = 0;
            }
        }
        lettre = alphabet[depart];
    }
    return {msg : `Le mot ${mot} contient la lettre ${lettre}`, resultat, lettre};
}

function neContientPas(mot,resultat)
{
    let r = contient(mot, resultat);
    return {msg : `Le mot ${mot} ne contient pas la lettre ${r.lettre}` , resultat : !r.resultat};
}

function commencePar(mot,resultat)
{
     let lettre = '';
    if (resultat)
    {;
        lettre = mot[0];
    }
    else
    {
        let depart = Math.floor(Math.random()*alphabet.length);
        while(alphabet[depart] === mot[0])
        {
            if (depart < alphabet.length-1)
            {
                depart++;
            }
            else
            {
                depart = 0;
            }
        }
        lettre = alphabet[depart];
    }
    return {msg : `Le mot ${mot} commence par la lettre ${lettre}`, resultat, lettre};
}

function neCommencePasPar(mot, resultat)
{
     let r = commencePar(mot, resultat);
    return {msg : `Le mot ${mot} ne commence pas par la lettre ${r.lettre}` , resultat : !r.resultat};
}

function finitPar(mot, resultat)
{
    let lettre = '';
    if (resultat)
    {
        
        lettre = mot[mot.length-1];
    }
    else
    {
        let depart = Math.floor(Math.random()*alphabet.length);
        while(mot[mot.length-1] === alphabet[depart])
        {
            if (depart < alphabet.length-1)
            {
                depart++;
            }
            else
            {
                depart = 0;
            }
        }
        lettre = alphabet[depart];
    }
    return {msg : `La dernière lettre de ${mot} est un ${lettre}`, resultat, lettre};
}

function neFinitPasPar(mot, resultat)
{
       let r = finitPar(mot, resultat);
    return {msg : `La dernière lettre de ${mot} n'est pas un ${r.lettre}` , resultat : !r.resultat};
}

export {creerListeMessage}