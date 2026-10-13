function addGame(name, value)
{
    if (localStorage.getItem(name) === null)
    {
        let tab = [value];
        localStorage.setItem(name,JSON.stringify(tab));
    }
    else
    {
        let tab = JSON.parse(localStorage.getItem(name));
        if (!tab.includes(value))
        {
            tab.push(value);
            localStorage.setItem(name, JSON.stringify(tab));
        }
    }
}

function addFirstName(value)
{   
    localStorage.setItem("prenom",value);   
}

function readFirstName()
{
    return localStorage.getItem("prenom");
}

function readLocalStorage(name)
{
    if (localStorage.getItem(name) != null)
    {
        return JSON.parse(localStorage.getItem(name));
    }
    return [];
}



function readGameNumber()
{
    if (localStorage.getItem("gameNumber") == null)
    {
        localStorage.setItem("gameNumber",Math.floor(Math.random() * 10000000));
    }  
    
    return localStorage.getItem("gameNumber");
}

function addGameContest(contest, level)
{
    let tab = [];
    const attempt = 1;
    if (localStorage.getItem('contest') == null)
    {
        tab.push({contest, level, attempt});
    }
    else{
        tab = JSON.parse(localStorage.getItem('contest'));
        let newValue = tab.find(x => x.contest === contest);
        if (newValue === undefined)
        {
            tab.push({contest, level, attempt});
        }
        else
        {
            newValue.level = level;
            if (level === 0) newValue.attempt = 1;
        }
    }
    localStorage.setItem('contest',JSON.stringify(tab));
}

function addAttemptGameContest(contest)
{
    let tab = [];

    if (localStorage.getItem('contest') != null)
    {
        tab = JSON.parse(localStorage.getItem('contest'));
        let newValue = tab.find(x => x.contest === contest);
        if (newValue !== undefined)
        {
            newValue.attempt++; 
        }
        localStorage.setItem('contest',JSON.stringify(tab));
    }
}

function readGameContest(contest)
{

    if (localStorage.getItem('contest') !== null)
    {
        let tab = JSON.parse(localStorage.getItem('contest'));
        let tabContest = tab.find(x => x.contest === contest);
        if (tabContest !== undefined) return tabContest.level;

    }
    return -1;
}


function readAttemptContest(contest)
{

    if (localStorage.getItem('contest') !== null)
    {
        let tab = JSON.parse(localStorage.getItem('contest'));
        let tabContest = tab.find(x => x.contest === contest);
        if (tabContest !== undefined) return tabContest.attempt;

    }
    return -1;
}

function readInfoContest(contest)
{

    if (localStorage.getItem('contest') !== null)
    {
        let tab = JSON.parse(localStorage.getItem('contest'));
        let tabContest = tab.find(x => x.contest === contest);
        if (tabContest !== undefined) return tabContest;

    }
    return -1;
}



export {addGame, addFirstName, readLocalStorage, readFirstName, readGameNumber, addGameContest, readGameContest, addAttemptGameContest, readAttemptContest, readInfoContest};