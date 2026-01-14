// Default arpeggio data file
// Format: { note: 'c'|'e'|'g' (or do/mi/sol), place: 1..16 }
// This initial arp contains 16 entries (one per step). Edit or add more arps as needed.

const defaultArp = {
    facile:
        [{
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 3 },
                { note: 'c', place: 5 },
                { note: 'g', place: 7 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },

            ]
        },
        {
            bpm: 100,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 3 },
                { note: 'c', place: 5 },
                { note: 'g', place: 7 },
                { note: 'g', place: 8 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },

            ]
        },
        {
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 3 },
                { note: 'c', place: 5 },
                { note: 'g', place: 7 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },
                { note: 'g', place: 16 },

            ]
        },

        ],


    moyen:
        [{
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 3 },
                { note: 'c', place: 5 },
                { note: 'g', place: 7 },
                { note: 'e', place: 8 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },
                { note: 'e', place: 16 },

            ]
        },
        {
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 3 },
                { note: 'c', place: 5 },
                { note: 'g', place: 7 },
                { note: 'e', place: 8 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'e', place: 12 },
                { note: 'c', place: 13 },
     
                { note: 'g', place: 16 },

            ]
        },
        {
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 3 },
                { note: 'c', place: 5 },
                { note: 'g', place: 7 },
                { note: 'c', place: 8 },
                { note: 'c', place: 9 },
                { note: 'e', place: 10 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },
                { note: 'g', place: 16 },

            ]
        },
        ],
    difficile:
        [{
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'e', place: 2 },
                { note: 'e', place: 3 },
                { note: 'e', place: 4 },
                { note: 'e', place: 5 },
                { note: 'e', place: 6 },
                { note: 'e', place: 7 },
                { note: 'c', place: 8 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },
                { note: 'e', place: 16 },

            ]
        },
        {
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'c', place: 3 },
                { note: 'e', place: 5 },
                { note: 'c', place: 7 },
                { note: 'e', place: 8 },
                { note: 'c', place: 9 },
                { note: 'g', place: 11 },
                { note: 'c', place: 13 },
                { note: 'g', place: 15 },
                { note: 'g', place: 16 },

            ]
        },
        {
            bpm: 100,
            notes: [
                { note: 'c', place: 1 },
                { note: 'e', place: 2 },
                { note: 'e', place: 3 },
                { note: 'g', place: 4 },
                { note: 'c', place: 5 },
                { note: 'e', place: 6 },
                { note: 'e', place: 7 },
                { note: 'g', place: 9 },
                { note: 'c', place: 13 },
                { note: 'e', place: 15 },
                { note: 'g', place: 16 },

            ]
        },
        ],
    hard:
        [{
            bpm: 100,
            notes: [
                { note: 'c', place: 1 },
                { note: 'e', place: 2 },
                { note: 'g', place: 3 },
                { note: 'g', place: 4 },
                { note: 'e', place: 5 },
                { note: 'e', place: 6 },
                { note: 'e', place: 7 },
                { note: 'c', place: 8 },
                { note: 'c', place: 9 },
                { note: 'e', place: 11 },
                { note: 'e', place: 13 },
                { note: 'e', place: 14 },
                { note: 'g', place: 15 },
                { note: 'e', place: 16 },

            ]
        },
        {
            bpm: 120,
            notes: [
                { note: 'c', place: 1 },
                { note: 'g', place: 2 },
                { note: 'g', place: 3 },
                { note: 'c', place: 4 },
                { note: 'g', place: 5 },
                { note: 'g', place: 6 },
                { note: 'c', place: 7 },
                { note: 'g', place: 8 },
                { note: 'g', place: 9 },
                { note: 'c', place: 11 },
                { note: 'e', place: 13 },
                { note: 'e', place: 14 },
                { note: 'e', place: 15 },
                { note: 'e', place: 16 },

            ]
        },
        {
            bpm: 90,
            notes: [
                { note: 'c', place: 1 },
                { note: 'e', place: 2 },
                { note: 'e', place: 3 },
                { note: 'g', place: 4 },
                { note: 'c', place: 5 },
                { note: 'e', place: 6 },
                { note: 'e', place: 7 },
                { note: 'e', place: 8 },
                { note: 'g', place: 9 },
                { note: 'e', place: 10 },
                { note: 'e', place: 11 },
                { note: 'c', place: 12 },
                { note: 'c', place: 13 },
                { note: 'e', place: 15 },
                { note: 'g', place: 16 },

            ]
        },
        ],
}

// [
//  { note: 'c', place: 1 },
//   { note: 'e', place: 2 },
//   { note: 'g', place: 3 },
//   { note: 'c', place: 4 },
//   { note: 'c', place: 5 },
//   { note: 'c', place: 6 },
//   { note: 'c', place: 7 },
//   { note: 'c', place: 8 },
//   { note: 'e', place: 9 },
//   { note: 'e', place: 10 },
//   { note: 'c', place: 11 },
//   { note: 'e', place: 12 },
//   { note: 'g', place: 13 },
//   { note: 'g', place: 14 },
//   { note: 'c', place: 15 },
//   { note: 'g', place: 16 }
// ]


export default defaultArp;
