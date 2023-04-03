function verifierStatus(status)
{
    console.log(status);
    if (status === 401)
    {
        alert("Désolé, vous devez être authentifié pour accèder à cette page.")
        window.location.href = "/";
        return false;
    }
    if (status === 403 || status === 404)
    {
        alert("Désolé, vous n'avez plus accès à cette page.")
        window.location.href = "/";
        return false;
    }
    return true;
}




export {verifierStatus};