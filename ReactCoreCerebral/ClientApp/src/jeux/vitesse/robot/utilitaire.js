
function constructionEmplacement(x, y) {

       
    return {   
        gridRowStart: x+1,
        gridRowEnd: x+1,
        gridColumnStart: y+1,
        gridColumnEnd: y+2,
    
    }
}

export {constructionEmplacement};