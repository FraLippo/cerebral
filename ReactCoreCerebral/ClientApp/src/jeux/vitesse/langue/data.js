import l40 from '../../../sons/langue40.mp3';
import l41 from '../../../sons/langue41.mp3';
import l42 from '../../../sons/langue42.mp3';
import l43 from '../../../sons/langue43.mp3';
import l44 from '../../../sons/langue44.mp3';
import l50 from '../../../sons/langue50.mp3';
import l51 from '../../../sons/langue51.mp3';
import l52 from '../../../sons/langue52.mp3';
import l53 from '../../../sons/langue53.mp3';
import l54 from '../../../sons/langue54.mp3';
import l60 from '../../../sons/langue60.mp3';
import l61 from '../../../sons/langue61.mp3';
import l62 from '../../../sons/langue62.mp3';
import l63 from '../../../sons/langue63.mp3';
import l64 from '../../../sons/langue64.mp3';
import l70 from '../../../sons/langue70.mp3';
import l71 from '../../../sons/langue71.mp3';
import l72 from '../../../sons/langue72.mp3';
import l73 from '../../../sons/langue73.mp3';
import l74 from '../../../sons/langue74.mp3';
import l80 from '../../../sons/langue80.mp3';
import l81 from '../../../sons/langue81.mp3';
import l82 from '../../../sons/langue82.mp3';
import l83 from '../../../sons/langue83.mp3';
import l84 from '../../../sons/langue84.mp3';


let formulePolitesse = [
    // Anglais (pas d'audio)
    { langue: "anglais", reponse: "bonjour", formule: "hello", audio: null },
    { langue: "anglais", reponse: "merci", formule: "thank you", audio: null },
    { langue: "anglais", reponse: "s'il vous plaît", formule: "please", audio: null },
    { langue: "anglais", reponse: "au revoir", formule: "goodbye", audio: null },
    { langue: "anglais", reponse: "excusez-moi", formule: "excuse me", audio: null },

    // Espagnol (pas d'audio)
    { langue: "espagnol", reponse: "bonjour", formule: "hola", audio: null },
    { langue: "espagnol", reponse: "merci", formule: "gracias", audio: null },
    { langue: "espagnol", reponse: "s'il vous plaît", formule: "por favor", audio: null },
    { langue: "espagnol", reponse: "au revoir", formule: "adiós", audio: null },
    { langue: "espagnol", reponse: "excusez-moi", formule: "lo siento", audio: null },

    // Allemand (pas d'audio)
    { langue: "allemand", reponse: "bonjour", formule: "guten tag", audio: null },
    { langue: "allemand", reponse: "merci", formule: "danke", audio: null },
    { langue: "allemand", reponse: "s'il vous plaît", formule: "bitte", audio: null },
    { langue: "allemand", reponse: "au revoir", formule: "auf wiedersehen", audio: null },
    { langue: "allemand", reponse: "excusez-moi", formule: "entschuldigung", audio: null },

    // Italien (pas d'audio)
    { langue: "italien", reponse: "bonjour", formule: "buongiorno", audio: null },
    { langue: "italien", reponse: "merci", formule: "grazie", audio: null },
    { langue: "italien", reponse: "s'il vous plaît", formule: "per favore", audio: null },
    { langue: "italien", reponse: "au revoir", formule: "arrivederci", audio: null },
    { langue: "italien", reponse: "excusez-moi", formule: "mi scusi", audio: null },

    // Portugais (l40-l44)
    { langue: "portugais", reponse: "bonjour", formule: "bom dia", audio: l40 },
    { langue: "portugais", reponse: "merci", formule: "obrigado", audio: l41 },
    { langue: "portugais", reponse: "s'il vous plaît", formule: "por favor", audio: l42 },
    { langue: "portugais", reponse: "au revoir", formule: "adeus", audio: l43 },
    { langue: "portugais", reponse: "excusez-moi", formule: "com licença", audio: l44 },

    // Russe (l50-l54)
    { langue: "russe", reponse: "bonjour", formule: "zdravstvuyte", audio: l50 },
    { langue: "russe", reponse: "merci", formule: "spasibo", audio: l51 },
    { langue: "russe", reponse: "s'il vous plaît", formule: "pozhaluysta", audio: l52 },
    { langue: "russe", reponse: "au revoir", formule: "do svidaniya", audio: l53 },
    { langue: "russe", reponse: "excusez-moi", formule: "izvinite", audio: l54 },

    // Chinois (l60-l64)
    { langue: "chinois", reponse: "bonjour", formule: "nǐ hǎo", audio: l60 },
    { langue: "chinois", reponse: "merci", formule: "xièxiè", audio: l61 },
    { langue: "chinois", reponse: "s'il vous plaît", formule: "qǐng", audio: l62 },
    { langue: "chinois", reponse: "au revoir", formule: "zàijiàn", audio: l63 },
    { langue: "chinois", reponse: "excusez-moi", formule: "duìbuqǐ", audio: l64 },

    // Japonais (l70-l74)
    { langue: "japonais", reponse: "bonjour", formule: "konnichiwa", audio: l70 },
    { langue: "japonais", reponse: "merci", formule: "arigatō", audio: l71 },
    { langue: "japonais", reponse: "s'il vous plaît", formule: "onegaishimasu", audio: l72 },
    { langue: "japonais", reponse: "au revoir", formule: "sayōnara", audio: l73 },
    { langue: "japonais", reponse: "excusez-moi", formule: "sumimasen", audio: l74 },

    // Arabe (l80-l84)
    { langue: "arabe", reponse: "bonjour", formule: "as-salāmu ʿalaykum", audio: l80 },
    { langue: "arabe", reponse: "merci", formule: "shukran", audio: l81 },
    { langue: "arabe", reponse: "s'il vous plaît", formule: "min faḍlik", audio: l82 },
    { langue: "arabe", reponse: "au revoir", formule: "maʿa as-salāma", audio: l83 },
    { langue: "arabe", reponse: "excusez-moi", formule: "ʿafwan", audio: l84 }
];

const tabLangueDepart = ["anglais", "espagnol", "allemand", "italien", "portugais", "russe", "chinois", "japonais", "arabe"];
const tabPolitesseDepart = ["bonjour", "merci", "s'il vous plaît", "au revoir", "excusez-moi"];

export { formulePolitesse, tabLangueDepart, tabPolitesseDepart };