let donneesTri =
    [
        {
            id: 200,
            temps: 15,
            titre: "TRES_FACILE_1",
            choix: ["1 2 3", "4 5 6"],
            info: [
                {
                    caractere: 2,
                    resultat: 0
                },
                {
                    caractere: 5,
                    resultat: 1
                },
                {
                    caractere: 1,
                    resultat: 0
                },
                {
                    caractere: 3,
                    resultat: 0
                },
                {
                    caractere: 6,
                    resultat: 1
                },
                {
                    caractere: 4,
                    resultat: 1
                }

            ]
        },
        {
            id: 201,
            titre: "TRES_FACILE_2",
            temps: 16,
            choix: ["8 4 2", "3 7 9"],
            info: [
                {
                    caractere: 7,
                    resultat: 1
                },
                {
                    caractere: 9,
                    resultat: 1
                },
                {
                    caractere: 3,
                    resultat: 1
                },
                {
                    caractere: 8,
                    resultat: 0
                },
                {
                    caractere: 3,
                    resultat: 1
                },
                {
                    caractere: 8,
                    resultat: 0
                }

            ]
        },
        {
            id: 202,
            titre: "FACILE_1",
            temps: 16,
            choix: ["5 3 2", "9 8 7", "1 4 6"],
            info: [
                {
                    caractere: 6,
                    resultat: 2
                },
                {
                    caractere: 1,
                    resultat: 2
                },
                {
                    caractere: 3,
                    resultat: 0
                },
                {
                    caractere: 8,
                    resultat: 1
                },
                {
                    caractere: 7,
                    resultat: 1
                },
                {
                    caractere: 4,
                    resultat: 2
                },
                {
                    caractere: 8,
                    resultat: 1
                }

            ]
        },
        {
            id: 203,
            titre: "FACILE_2",
            temps: 19,
            choix: ["8 4 11", "9 3 12", "1 5 2", "10 6 7"],
            info: [
                {
                    caractere: 9,
                    resultat: 1
                },
                {
                    caractere: 10,
                    resultat: 3
                },
                {
                    caractere: 6,
                    resultat: 3
                },
                {
                    caractere: 5,
                    resultat: 2
                },
                {
                    caractere: 4,
                    resultat: 0
                },
                {
                    caractere: 6,
                    resultat: 3
                },
                {
                    caractere: 3,
                    resultat: 1
                }

            ]
        },
        {
            id: 204,
            titre: "MOYEN_1",
            temps: 16,
            choix: [["4 B 8", "A 9 C"], ["2 5 Z", "X Y 7"]],
            info: [
                {
                    caractere: "A",
                    resultat: 0
                },
                {
                    caractere: 5,
                    resultat: 1
                },
                {
                    caractere: "X",
                    resultat: 1
                },
                {
                    caractere: 8,
                    resultat: 0
                },
                {
                    caractere: "C",
                    resultat: 0
                },
                {
                    caractere: "B",
                    resultat: 0
                },
                {
                    caractere: "Y",
                    resultat: 1
                }

            ]
        },
        {
            id: 205,
            titre: "MOYEN_2",
            temps: 16,
            choix: [["3 6 2", "K O P"], ["4 7 8", "G A T"], "1 9 5"],
            info: [
                {
                    caractere: 9,
                    resultat: 2
                },
                {
                    caractere: 5,
                    resultat: 2
                },
                {
                    caractere: "A",
                    resultat: 1
                },
                {
                    caractere: "K",
                    resultat: 0
                },
                {
                    caractere: 8,
                    resultat: 1
                },
                {
                    caractere: "O",
                    resultat: 0
                },
                {
                    caractere: 4,
                    resultat: 1
                },
                {
                    caractere: 3,
                    resultat: 0
                }

            ]
        },
        {
            id: 206,
            titre: "DIFFICILE_1",
            temps: 18,
            choix: [["10 2 3", "A B C"], ["9 18 7", "X Y Z"], ["S R T", "1 8 12"], ["M N V", "4 23 21"]],
            info: [
                {
                    caractere: "R",
                    resultat: 2
                },
                {
                    caractere: 3,
                    resultat: 0
                },
                {
                    caractere: "N",
                    resultat: 3
                },
                {
                    caractere: 23,
                    resultat: 3
                },
                {
                    caractere: 21,
                    resultat: 3
                },
                {
                    caractere: "Z",
                    resultat: 1
                },
                {
                    caractere: "S",
                    resultat: 2
                }

            ]
        },
        {
            id: 207,
            titre: "DIFFICILE_2",
            temps: 17,
            choix: [["2 Q 6", "4 Y R"], ["1 3 5", "O P I"], ["7 A 9", "Z W V"], ["8 18 44", "T 33 D"]],
            info: [
                {
                    caractere: "D",
                    resultat: 3
                },
                {
                    caractere: "V",
                    resultat: 2
                },
                {
                    caractere: 2,
                    resultat: 0
                },
                {
                    caractere: "A",
                    resultat: 2
                },
                {
                    caractere: 8,
                    resultat: 3
                },
                {
                    caractere: 33,
                    resultat: 3
                },
                {
                    caractere: 8,
                    resultat: 3
                },
                {
                    caractere: "Q",
                    resultat: 0
                }

            ]
        },
        {
            id: 208,
            titre: "DIFFICILE_3",
            temps:19,
            choix: [["33 66 16", "Y 77 H"], ["61 3 55", "O 777 S"], ["333 666 1", "I M V"], ["8 18 5", "G 7 B"]],
            info: [
                {
                    caractere: "O",
                    resultat: 1
                },
                {
                    caractere: 777,
                    resultat: 1
                },
                {
                    caractere: 7,
                    resultat: 3
                },
                {
                    caractere: 333,
                    resultat: 2
                },
                {
                    caractere: 3,
                    resultat: 1
                },
                {
                    caractere: 61,
                    resultat: 1
                },
                {
                    caractere: 66,
                    resultat: 0
                }

            ]
        }
    ]

export default donneesTri;