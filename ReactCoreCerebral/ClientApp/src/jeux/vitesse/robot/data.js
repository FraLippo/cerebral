
let tabDonnees =
    [ //1
        {
            tabGrille: [[1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 3, "y": 6 }],
            positionDepart: { x: 0, y: 0 },
            rotation: 1
        },
        //2
        {
            tabGrille: [[0, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0]],
            tabDrapeaux: [{ "x": 0, "y": 2 }],
            positionDepart: { x: 6, y: 5 },
            rotation: 3
        },
        //3
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0]],
            tabDrapeaux: [{ "x": 6, "y": 5 }],
            positionDepart: { x: 2, y: 0 },
            rotation: 2
        },
        //4
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 4, "y": 1 }],
            positionDepart: { x: 1, y: 6 },
            rotation: 0
        },
        //5

        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 4, "y": 2 }],
            positionDepart: { x: 1, y: 0 },
            rotation: 2
        },
        //6
        {
            tabGrille: [[0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0]],
            tabDrapeaux: [{ "x": 6, "y": 5 }],
            positionDepart: { x: 0, y: 1 },
            rotation: 1
        },
        //7
        {
            tabGrille: [[0, 1, 1, 1, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 4, "y": 3 }],
            positionDepart: { x: 6, y: 1 },
            rotation: 3
        },
        //8
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 5, "y": 1 }],
            positionDepart: { x: 2, y: 6 },
            rotation: 0
        },
        //9
        {
            tabGrille: [[1, 0, 1, 1, 1, 1, 0], [1, 0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 0, "y": 0 }],
            positionDepart: { x: 0, y: 5 },
            rotation: 0
        },
        //10
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1], [0, 1, 0, 0, 0, 0, 1], [0, 1, 1, 0, 0, 0, 1]],
            tabDrapeaux: [{ "x": 6, "y": 2 }],
            positionDepart: { x: 6, y: 6 },
            rotation: 3
        },
        //11
        {
            tabGrille: [[1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            tabDrapeaux: [{ "x": 0, "y": 0 }],
            positionDepart: { x: 6, y: 6 },
            rotation: 3
        },



        //12
        {
            tabGrille: [[0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0]],
            tabDrapeaux: [{ "x": 0, "y": 3 }],
            positionDepart: { x: 6, y: 5 },
            rotation: 3
        },
        //13
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 5, "y": 4 }],
            positionDepart: { x: 1, y: 0 },
            rotation: 2
        },
        //14
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 1, "y": 6 }],
            positionDepart: { x: 5, y: 2 },
            rotation: 0
        },
        //15
        {
            tabGrille: [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 2, "y": 0 }],
            positionDepart: { x: 0, y: 0 },
            rotation: 2
        },
        //16
        {
            tabGrille: [[0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0]],
            tabDrapeaux: [{ "x": 0, "y": 4 }, { "x": 6, "y": 4 }],
            positionDepart: { x: 1, y: 0 },
            rotation: 2
        },
        //17
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]],
            tabDrapeaux: [{ "x": 2, "y": 0 }, { "x": 2, "y": 5 }],
            positionDepart: { x: 6, y: 3 },
            rotation: 3
        },
        //18
        {
            tabGrille: [[0, 0, 0, 1, 1, 1, 0], [0, 0, 0, 1, 0, 1, 0], [1, 1, 1, 1, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 4, "y": 2 }, { "x": 4, "y": 6 }],
            positionDepart: { x: 2, y: 0 },
            rotation: 2
        },
        //19
        {
            tabGrille: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0], [0, 0, 1, 0, 0, 1, 1], [1, 1, 1, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 2, "y": 6 }],
            positionDepart: { x: 3, y: 0 },
            rotation: 2
        },
        //20
        {
            tabGrille: [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0]],
            tabDrapeaux: [{ "x": 2, "y": 1 }, { "x": 6, "y": 1 }],
            positionDepart: { x: 0, y: 6 },
            rotation: 0
        },
        //21
        {
            tabGrille : [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,1,1,1],[0,0,0,1,1,0,0],[0,0,1,1,0,0,0],[0,1,1,0,0,0,0],[0,0,0,0,0,0,0]],
            tabDrapeaux : [{"x":5,"y":1}],
            positionDepart : {x : 2,y : 6},
            rotation : 0
            },
            //22
            {
                tabGrille : [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0],[0,0,0,1,1,0,0],[0,0,0,0,1,1,0],[0,0,0,0,0,1,1]],
                tabDrapeaux : [{"x":6,"y":6}],
                positionDepart : {"x":3,"y":0},
                rotation : 2
                },
                //23
                {
                    tabGrille : [[1,1,1,1,1,1,1],[1,0,0,0,1,1,1],[1,0,0,0,0,1,1],[1,0,0,1,1,1,1],[1,0,0,0,1,1,1],[1,0,0,0,1,1,1],[1,0,0,0,1,1,1]],
                    tabDrapeaux : [{"x":3,"y":3},{"x":6,"y":6}],
                    positionDepart : {x : 6,y : 0},
                    rotation : 3
                    },
                    //24
                    {
                        tabGrille : [[0,0,0,0,0,0,0],[1,1,1,1,1,0,0],[1,1,1,1,1,0,0],[1,0,0,0,1,0,0],[1,0,0,0,1,0,0],[1,0,0,0,1,0,0],[1,1,1,0,1,0,0]],
                        tabDrapeaux : [{"x":6,"y":0},{"x":6,"y":4}],
                        positionDepart : {x : 1,y : 2},
                        rotation : 1
                        },
                        //25
                        {
                            tabGrille : [[1,0,0,1,1,1,1],[1,1,1,1,0,0,1],[1,0,0,0,1,1,1],[1,0,0,0,1,0,0],[1,1,1,1,1,0,0],[0,0,0,1,1,0,0],[0,0,1,1,1,0,0]],
                            tabDrapeaux : [{"x":0,"y":0}],
                            positionDepart : {x : 2,y : 6},
                            rotation : 0
                            },
                            //26
                            {
                                tabGrille : [[0,1,1,1,0,0,0],[0,1,0,1,1,0,0],[0,1,0,0,1,1,1],[0,1,0,0,0,0,1],[0,1,0,1,1,1,1],[0,1,0,0,1,1,1],[0,1,1,1,1,1,0]],
                                tabDrapeaux : [{"x":4,"y":5},{"x":4,"y":3}],
                                positionDepart : {x : 0,y : 3},
                                rotation : 1
                                }



    ]

export { tabDonnees };