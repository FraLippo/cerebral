let listeJeuxMemoire = [
    {
        nom: 'vitessedessin',
        emoji: '🖼️',
        titre: 'Lignes brisées',
        sousTitre: 'Teste ta mémoire visuelle en mémorisant un tracé.',
        regles: 'Mémorise une ligne brisée puis reconstitue la ligne en cliquant sur les points présents. Le départ se fait toujours en haut à gauche. Tu ne peux sélectionner que des points adjacents. Chaque dessin reconstitué rapporte 12 points.'
    },
    {
        nom: 'vitesseloup',
        emoji: '🐺',
        titre: 'Attrape le loup',
        sousTitre: 'Évalue ta mémoire spatiale en suivant les déplacements du loup.',
        regles: "Mémorise le déplacement d'un loup sur une grille pour pouvoir le reproduire. Le but est de rejoindre le loup. Le loup démarre avec 4 secondes d'avance. +20 points si tu rattrapes le loup. 30 points de bonus si tu arrives au bout des 6 parties en moins de 90 s."
    },
    {
        nom: 'vitessealz',
        emoji: '🎗️',
        titre: 'La mémoire longue',
        sousTitre: 'As-tu une bonne mémoire de long terme ?',
        regles: "Mémorise les mots affichés. Contrairement aux autres tests, tu ne dois pas restituer la liste tout de suite : tu joues d'abord à un petit jeu. Ce jeu de mémoire s'inspire du test des 5 mots, utilisé notamment dans le dépistage de la maladie d'Alzheimer, mais dans une version ludique. Chaque mot trouvé rapporte 7 points. Un bonus de 50 points est accordé si tu retrouves les 12 mots."
    },
    {
        nom: 'vitessememory',
        emoji: '🎩',
        titre: 'Le jeu du memory',
        sousTitre: 'Retrouve toutes les paires du jeu classique du Memory.',
        regles: "Trouve toutes les paires comme dans le jeu classique du Memory. Une différence : tu découvres les paires à ton rythme. Elles ne disparaissent pas au bout d'un certain temps. Tu disposes de 60 secondes pour tenter de trouver toutes les paires. Un bonus de 30 points est accordé si tu termines le jeu."
    },
    {
        nom: 'vitessenombre',
        emoji: '✅',
        titre: 'Mémoire des nombres',
        sousTitre: 'As-tu la mémoire des chiffres ?',
        regles: "Mémorise une série de chiffres pour pouvoir la restituer plus tard. La série augmente d'un chiffre à chaque fois jusqu'à atteindre 8 chiffres, puis redescend jusqu'à 1 chiffre.Chaque série correctement restituée rapporte 5 points.Si tu réussis à revenir à 1 chiffre en moins de 75 secondes, tu obtiens un bonus de 50 points."
    },
    {
        nom: 'vitesseforme',
        emoji: '🔺',
        titre: 'Mémoire des formes',
        sousTitre: 'Teste ta mémoire visuelle en retenant les formes et les couleurs.',
        regles: 'Mémorise les formes et les couleurs des éléments présentés sur des cartes. Une fois les cartes retournées, c’est à toi de les retrouver. Chaque bonne réponse rapporte 2 points, puis 4 points. Une mauvaise réponse te fait perdre 3 points. Tu disposes de 60 secondes.'
    },
    {
        nom: 'vitessememoire',
        emoji: '🔵',
        titre: 'Se souvenir des cercles',
        sousTitre: 'Évalue ta mémoire spatiale.',
        regles: 'On te montre un certain nombre de cercles dans une grille. Tu dois mémoriser leurs emplacements et reproduire ce que tu viens de voir dans une nouvelle grille. Tu disposes de 90 secondes. Chaque cercle trouvé rapporte 1 point. Il n’y a pas de pénalité en cas d’erreur.'
    },
    {
        nom: 'vitessepaire',
        emoji: '🐈‍⬛',
        titre: "L'animal précédent",
        sousTitre: "Mets à l'épreuve ta mémoire immédiate.",
        regles: 'On te montre une suite d’images d’animaux. Tu dois indiquer si l’animal que tu as vu juste avant est le même que l’animal affiché. Tu as 30 secondes pour obtenir le meilleur score : +2 points par bonne réponse et -3 points par mauvaise réponse.'
    }
];

const listeJeuxConcentration = [
    {
        nom: 'vitessewisconsin',
        emoji: '🙇',
        titre: 'Test du Wisconsin',
        sousTitre: 'Teste ta flexibilité mentale et ta capacité d’adaptation.',
        description: "Associe chaque carte à l'une des quatre cartes de référence en découvrant la règle de classement (couleur, forme ou nombre). La règle change régulièrement sans être annoncée : adapte-toi le plus vite possible pour obtenir le meilleur score."
    },
    {
        nom: 'vitessemulti',
        emoji: '💻',
        titre: 'Multitâche',
        sousTitre: "Peux-tu faire deux actions en même temps ?",
        description: "Tu dois effectuer deux actions en même temps : suivre le déplacement d'un cercle avec le doigt ou la souris et répondre à des questions. Tu as besoin de tes deux mains. Utilise la barre d'espace (sur PC) ou appuie sur le bandeau/bouton bleu (sur smartphone) pour indiquer si l'affirmation est fausse. Chaque bonne réponse rapporte 10 points. Le score revient à 0 en cas d'erreur. Le score maximal est de 110 points."
    },
    {
        nom: 'vitessemah',
        emoji: '🀄',
        titre: 'Le mahjong solitaire',
        sousTitre: "Es-tu quelqu'un d'observateur ?",
        description: "Retrouve toutes les paires de tuiles du mahjong. Tu peux sélectionner une tuile si un espace est disponible à gauche ou à droite. Si le jeu est bloqué (plus aucune paire n'est possible), tu peux changer de grille sans pénalité, sauf s'il reste des paires que tu n'as pas trouvées."
    },
    {
        nom: 'vitessebinero',
        emoji: '0️⃣',
        titre: 'Le binero',
        sousTitre: 'Combien de grilles pourras-tu compléter ?',
        description: 'Complète une grille de Binero. Le jeu est aussi connu sous le nom Takuzu ou Binoxxo. Il faut valider une grille pour obtenir des points, -10 points par grille non validée. Peut-on réussir plus de 72 points ?',
        lienComplementaire: {
            avant: 'Si tu ne connais pas le jeu, tu peux retrouver ',
            texte: "l'ensemble des règles",
            apres: ' pour compléter les grilles.',
            url: '/regles-binero',
            interne: true
        }
    },
    {
        nom: 'vitessebonneteau',
        emoji: '🎩',
        titre: 'Le bonneteau',
        sousTitre: 'Peux-tu suivre les permutations ?',
        description: 'Retrouve la carte cachée après plusieurs permutations de 4 cartes. Tu as 90 secondes pour découvrir le maximum de cartes. Le score augmente en fonction du niveau.'
    },
    {
        nom: 'vitessecomplet',
        emoji: '🧩',
        titre: 'Pièce du puzzle',
        sousTitre: 'Es-tu doué pour les puzzles ?',
        description: "Retrouve la bonne pièce du puzzle, celle qui s'encastre parfaitement dans l'emplacement proposé. Un bonus peut t'être accordé si tu réussis à trouver 10 pièces."
    },
    {
        nom: 'vitesserecensement',
        emoji: '🔍',
        titre: 'Le recensement',
        sousTitre: 'Es-tu assez concentré pour répondre aux questions ?',
        description: "Une grille est affichée avec des symboles, il suffit de répondre aux questions concernant l'emplacement de certains symboles ou le nombre de symboles. Attention aux négations dans les questions. Le jeu dure 90 secondes. Une bonne réponse rapporte 5 points et une mauvaise te fait perdre 6 points."
    },
    {
        nom: 'vitessematch',
        emoji: '🐒',
        titre: 'Former des paires',
        sousTitre: "Associe les paires d'éléments dans une grille",
        description: 'Le principe est simple : reconstitue les paires à partir des éléments présents sur la page. Tu disposes de 60 secondes. Chaque paire trouvée rapporte 1 point. Des bonus de 5, 10 et 15 points te sont accordés à la fin de chaque tableau.'
    },
    {
        nom: 'vitesseaddition',
        emoji: '⊕',
        titre: "L'addition XOR",
        sousTitre: "Sauras-tu additionner les cases de deux grilles sans faire de fautes ?",
        description: "Additionne deux grilles dans une troisième. L'addition se fait case par case, comme une addition normale, sauf que si tu additionnes deux cases bleues, le résultat est une case blanche. Le terme XOR (ou exclusif) désigne un opérateur logique en informatique. Si tu termines une grille tu gagnes 2 points par bonne réponse. Le temps alloué est de 90 secondes."
    },
    {
        nom: 'vitesseburger',
        emoji: '🍔',
        titre: 'Préparer des burgers',
        sousTitre: 'Prépare des burgers en suivant la recette',
        description: "Crée des burgers en plaçant les ingrédients de la recette dans l'ordre. Chaque burger créé rapporte 8 points. Le temps alloué pour obtenir le meilleur score est de 40 secondes."
    },
    {
        nom: 'vitessecouleur',
        emoji: '🎨',
        titre: 'Reconnaître les couleurs',
        sousTitre: 'Ton cerveau saura-t-il faire la différence ?',
        description: 'Reconnaître la couleur dans laquelle est écrit un mot. La difficulté provient du fait que le mot affiché est une couleur. Par exemple si l’on écrit le mot "rouge" en vert, le but est de reconnaître la couleur verte et pas le mot rouge. Rassure-toi, on comprend très vite en jouant. Tu as 40 s pour réaliser le meilleur score, tu gagnes un point par bonne réponse, chaque faute retranche 2 points à ton score.'
    },
    {
        nom: 'vitessesolitaire',
        emoji: '🈂',
        titre: 'La tuile solitaire',
        sousTitre: 'Sois attentif et retrouve la tuile solitaire au milieu des autres',
        description: 'Retrouve la tuile solitaire parmi un ensemble de tuiles. Tu as 60 secondes pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée te donne 2 points, la seconde 4 points, etc.'
    },
    {
        nom: 'vitesseintrus',
        emoji: '👯',
        titre: 'Repérer les différences',
        sousTitre: 'Utilise ton cerveau pour repérer les différences',
        description: "Repérer tous les intrus dans une grille de 3x3, c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Tu as 60 secondes pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse."
    },
    {
        nom: 'vitesseordre',
        emoji: '🔢',
        titre: 'Remettre dans l’ordre',
        sousTitre: "Arriveras-tu à remettre les nombres dans l'ordre ?",
        description: "Remets dans l'ordre les nombres de 1 à 100. Tu as 60 secondes pour réaliser le meilleur score, tu gagnes un point si tu places un nombre dans le bon ordre."
    }
];

const listeJeuxCulture = [
    {
        nom: 'vitesseintervalle',
        emoji: '👂',
        titre: "L'oreille absolue",
        sousTitre: "As-tu une bonne oreille musicale ?",
        description: "Tu dois retrouver la hauteur d'une note de musique jouée au hasard par l'ordinateur. Pour cela, tu dois déplacer un curseur pour ajuster la hauteur de ta note et retrouver la note de référence. Tu dois comparer en permanence ta note à celle de l'ordinateur afin de trouver la bonne hauteur. Si tu y parviens, tu remportes 80 points (ce qui est quasiment impossible, même pour un spécialiste)."
    },
    {
        nom: 'vitessetetris',
        emoji: '🏛️',
        titre: 'Tetris Musée',
        sousTitre: 'Pourras-tu reconstituer les tableaux ?',
        description: "Dans ce jeu, tu dois reconstituer une image à partir des fragments d'image qui tombent du haut de l'écran. Le principe est le même que le jeu Tetris. Sur PC, il faut utiliser les touches directionnelles pour déplacer les pièces. Sur smartphone, on déplace les pièces en glissant le doigt vers la gauche ou la droite sur l'espace de jeu, un appui sur l'écran (tap) fait tomber l'image plus vite. Le score maximum est de 100 (2 x 25 + 50)."
    },
    {
        nom: 'vitesseculture',
        emoji: '🖼️',
        titre: 'QCM culture générale',
        sousTitre: "As-tu une bonne culture générale ?",
        description: 'Un QCM de culture générale avec plus de 3000 questions dans tous les domaines. 10 questions, 12 points par bonne réponse. Score maximum : 120 points.'
    },
    {
        nom: 'vitessepanneauroutier',
        emoji: '🚦',
        titre: 'Le code de la route',
        sousTitre: "Connais-tu les panneaux routiers ?",
        description: 'Une grille est affichée avec des panneaux routiers, il suffit de retrouver le panneau routier indiqué par la question. Tu as 120 secondes pour essayer de trouver tous les panneaux. Tu gagnes 2 points par panneau trouvé, -4 points en cas d’erreur. Si tu termines la grille, bonus de 20 points ! Le maximum est de (36 x 2) + 20 = 92 points.'
    },
    {
        nom: 'vitesselangue',
        emoji: '👋',
        titre: 'La politesse',
        sousTitre: 'Es-tu poli dans toutes les langues ?',
        description: "Identifier 5 mots de politesse dans différentes langues. Clique sur le lecteur (le triangle) pour démarrer l'audio s'il ne commence pas automatiquement. Tu as 80 secondes pour essayer de trouver 10 mots. Tu gagnes 9 points par mot trouvé, -3 points en cas d'erreur.",
        lienComplementaire: {
            avant: 'Tu peux consulter tous les mots de politesse du jeu sur cette ',
            texte: 'page',
            url: '/politesse-langues',
            interne: true
        }
    },
    {
        nom: 'vitesseecrire',
        emoji: '📠',
        titre: 'La dactylographie',
        sousTitre: 'Es-tu un champion du clavier ?',
        description: 'Taper une série de mots le plus vite possible au clavier. Le temps alloué est de 30 secondes pour 19 mots. Chaque mot correctement saisi augmente votre score de 3 points, il n’y a pas de pénalité si tu ne tapes pas la bonne lettre. Si tu réussis à écrire les 19 mots tu obtiens un bonus de 50 points !',
        lienComplementaire: {
            avant: 'Tu peux consulter ce ',
            texte: 'wiki',
            apres: ' si tu désires améliorer ta cadence de frappe.',
            url: 'https://fr.wikihow.com/apprendre-la-dactylographie',
            externe: true
        }
    },
    {
        nom: 'vitessenotes',
        emoji: '♬',
        titre: "L'oreille musicale",
        sousTitre: "Peux-tu retrouver les notes jouées ?",
        description: "Retrouver des notes inconnues. L'ordinateur joue une note. Tu dois trouver à quelle note elle correspond sur le clavier d'un piano, uniquement avec ton oreille. Tu peux réécouter les notes autant de fois que tu le souhaites. À chaque bonne réponse, l'ordinateur ajoute une note à la séquence. Tu dois donc retrouver 2 notes, puis 3 notes, etc."
    }
];

const listeJeuxPlanification = [
    {
        nom: 'vitessebataille',
        emoji: '🚢',
        titre: 'La bataille navale',
        sousTitre: 'Pourras-tu trouver tous les bateaux ?',
        description: 'Retrouver tous les bateaux dans une grille. 2 indices pour vous aider : le nombre de cases où se trouvent les bateaux sur une ligne ou une colonne est indiqué sur les côtés, et les bateaux ne peuvent pas se toucher (même en diagonale). Vous pouvez tirer 3 coups dans l’eau. Le temps alloué est de 3 min. 50 points de bonus si vous finissez une grille. Il y a une part de chance dans ce jeu.'
    },
    {
        nom: 'vitessefusee',
        emoji: '🚀',
        titre: 'La fusée',
        sousTitre: 'Parviendras-tu à diriger la fusée ?',
        description: "Donner des instructions à une fusée pour qu'elle ramasse tous les drapeaux sur le plateau de jeu. Tu peux donner des instructions à la fusée avant son départ. La flèche ⬆️ permet de faire avancer la fusée dans la direction du nez de la fusée. Les autres flèches permettent de tourner la fusée d'un quart de tour. À chaque fois que la fusée rencontre un obstacle, elle s'arrête et tu peux la faire tourner. 70 points de bonus si tu réussis les 4 niveaux en 90 s."
    },
    {
        nom: 'vitessetaquin',
        emoji: '🔄',
        titre: 'Le taquin',
        sousTitre: 'Fais preuve de logique pour terminer ce jeu.',
        description: 'Dans ce classique du jeu de réflexion, tu dois déplacer des tuiles pour créer une ligne puis une colonne. Tu as 90 secondes pour construire la ligne et la colonne. 40 points te sont donnés après la ligne et 70 points après la colonne.'
    },
    {
        nom: 'vitessetresor',
        emoji: '🪙',
        titre: 'La chasse au trésor',
        sousTitre: 'Donne les bonnes instructions pour ramasser les pièces.',
        description: 'Ramasser le plus rapidement possible les pièces disséminées dans une grille en indiquant la direction des pièces à votre personnage. Chaque pièce récoltée te fait gagner 2 points. Ramasser toutes les pièces ajoute un bonus de 2 points. Il y a un malus de 5 points si tu n’arrives pas à ramasser toutes les pièces sur la grille. Le temps alloué est de 60 secondes.'
    },
    {
        nom: 'vitessetresse',
        emoji: '🎨',
        titre: 'Le jeu du peintre',
        sousTitre: 'Pourras-tu reconstruire le dessin ?',
        description: 'Tu dois refaire le dessin qui est affiché en cliquant sur les pinceaux de couleur. Les pinceaux colorient une ligne ou une colonne entière. Une nouvelle couleur efface les autres. Il suffit de trouver le bon ordre dans lequel le dessin a été colorié. Tu as 50 secondes pour terminer les 10 figures (+50 points).'
    },
    {
        nom: 'vitessechemin',
        emoji: '⬆️',
        titre: 'Retrouver son chemin',
        sousTitre: 'Es-tu assez attentif pour indiquer la bonne case ?',
        description: 'Trouver la sortie en suivant les flèches. On t’indique le point de départ et tu dois trouver le point d’arrivée, le chemin est indiqué par une suite de flèches (haut, bas, droite, gauche). Tu as 60 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.'
    }
];

const listeJeuxLettre = [
    {
        nom: 'vitessebrique',
        emoji: '🧱',
        titre: 'Mur de lettres',
        sousTitre: 'Pourras-tu détruire le mur de lettres ?',
        description: 'Créer des mots à partir des lettres disponibles dans le mur, seules les dernières lettres du mur peuvent être utilisées. Le but est d’atteindre le haut du mur. 12 points gagnés par ligne et 150 points si vous atteignez le haut du mur.'
    },
    {
        nom: 'vitessemotus',
        emoji: 'Ⓜ️',
        titre: 'Motus',
        sousTitre: 'Sauras-tu retrouver les mots façon Tusmo ou Motus ?',
        description: "Retrouve le mot caché en remettant les lettres dans l'ordre. Ce jeu s'inspire de Motus, Wordle et Tusmo. Les lettres bleues sont bien placées, les lettres dans les cercles rouges sont mal placées. Il suffit de cliquer sur les lettres pour les remettre dans l’ordre. Le niveau de difficulté est très variable suivant les mots, la difficulté n’augmente pas."
    },
    {
        nom: 'vitessecoupe',
        emoji: '✂️',
        titre: 'Les mots coupés',
        sousTitre: 'Pourras-tu reconstituer les mots coupés ?',
        description: 'Le classique jeu des mots coupés où il faut reconstituer les mots qui sont coupés en plusieurs syllabes. Vous avez 100 s pour reconstituer le plus grand nombre de mots. +4 points par bonne réponse, -2 par mauvaise réponse. Attention, nous ne validons pas tous les mots, même ceux qui sont corrects grammaticalement, il faut trouver le mot attendu.'
    },
    {
        nom: 'vitessechasse',
        emoji: '📯',
        titre: 'La chasse aux mots',
        sousTitre: 'Arriveras-tu à supprimer toutes les lettres de la grille ?',
        description: 'Trouver des mots à partir des lettres disséminées dans une grille. Terminer une grille rapporte un bonus de 30 points. Plus le mot est long, plus tu gagnes de points. Le temps alloué est de 90 secondes.'
    },
    {
        nom: 'vitesselettres',
        emoji: '✍',
        titre: 'Les lettres manquantes',
        sousTitre: 'As-tu un bon niveau de vocabulaire ?',
        description: "Retrouver les lettres manquantes dans les mots. Les lettres sont cachées sous des carrés de couleur. L'ordre pour retrouver les lettres associées aux couleurs est toujours le même : bleu, rouge et jaune. Chaque bonne réponse rapporte 3 points, ou 4 points lorsqu'il y a 2 lettres à retrouver. Chaque mauvaise réponse te fait perdre 1 point, le fait de passer te coûte 2 points. Le temps alloué est de 80 secondes."
    },
    {
        nom: 'vitessecercle',
        emoji: '⭕',
        titre: 'Cercles de mots',
        sousTitre: 'Es-tu assez concentré pour retrouver tous les mots ?',
        description: 'Retrouver des mots de 8 lettres à partir de lettres mélangées. Les lettres du mot sont placées autour d’un cercle. Tu dois indiquer la première lettre du mot puis un sens de rotation pour retrouver le mot caché. Chaque mot trouvé rapporte 10 points, -10 en cas d’erreur. Si tu trouves les 6 mots en moins de 55 secondes, tu obtiens un bonus de 50 points. Le score maximal est donc de (6 x 10) + 50 = 110.'
    },
    {
        nom: 'vitesseboogle',
        emoji: '🖋️',
        titre: 'Le Boogle',
        sousTitre: 'Es-tu capable de trouver des mots avec des lettres imposées ?',
        description: 'Créer des mots à partir de lettres. La lettre centrale est obligatoire dans les mots. Les mots acceptés sont ceux du Scrabble. Il faut créer des mots de plus de 3 lettres. Les points sont doublés pour les mots les plus longs. Si tu trouves 9 mots en moins de 90 s, tu obtiens un bonus de 40 points.'
    }
];

const listeJeuxCalcul = [
    {
        nom: 'vitessecompte',
        emoji: '🎯',
        titre: 'Le compte est bon',
        sousTitre: 'Sauras-tu retrouver le bon compte ?',
        description: 'Réussir à trouver un résultat à partir de 6 nombres et des 4 opérations. Il y a toujours une solution, les solutions sont de type (a + b) x c, mais peu importe le moyen d’arriver aux résultats. Tu peux reprendre le résultat d’une opération pour construire un nouveau calcul. Tu as 80 s et tu marques 15 points par calcul correct.'
    },
    {
        nom: 'vitessefraction',
        emoji: '➗',
        titre: 'Les fractions',
        sousTitre: 'Maîtrises-tu les fractions ?',
        description: 'Colorier un certain nombre de cases dans une figure. Exemple : si la figure contient 15 carrés et que l’objectif est de colorier les 2/3 des carrés, tu dois colorier (15 / 3) x 2 = 5 x 2 = 10 carrés en orange. Tu dois réussir 9 calculs pour obtenir un bonus de 60 points.'
    },
    {
        nom: 'vitesseoperation',
        emoji: '➕',
        titre: 'Les 4 opérations',
        sousTitre: 'Es-tu doué en calcul mental ?',
        description: "Le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Tu as 60 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point."
    },
    {
        nom: 'vitessecalcul',
        emoji: '🟰',
        titre: 'La grille de calcul',
        sousTitre: "Supérieur ou inférieur ?",
        description: 'On te donne 9 petits calculs (des additions et des soustractions) dans une grille, tu dois pointer les cases qui sont supérieures ou inférieures à un résultat donné. Tu as 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.'
    },
    {
        nom: 'vitessearithmetique',
        emoji: '🔀',
        titre: 'Nombres en désordre',
        sousTitre: 'Sauras-tu reconstituer les opérations ?',
        description: 'Retrouve la bonne opération. Des nombres sont affichés dans le désordre, tu dois les remettre en ordre pour reconstituer une opération. Tu as 60 secondes, chaque bonne réponse rapporte 6 points.'
    },
    {
        nom: 'vitessemonnaie',
        emoji: '💵',
        titre: 'La monnaie',
        sousTitre: 'Peux-tu rendre la monnaie sans faire de faute ?',
        description: "Tu dois rendre la monnaie au client en cliquant sur les pièces pour faire l'appoint. Tu dois gérer le maximum de clients en 60 secondes. Tu gagnes des points à chaque client content."
    }
];

export {
    listeJeuxMemoire,
    listeJeuxConcentration,
    listeJeuxCulture,
    listeJeuxPlanification,
    listeJeuxLettre,
    listeJeuxCalcul
};