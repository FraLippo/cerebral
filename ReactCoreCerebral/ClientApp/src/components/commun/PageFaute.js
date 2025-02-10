

import { useRouteError } from "react-router-dom";

function pageFaute() {
  const error = useRouteError();

  return (
    <div>
      <h1>Désolé, nous avons rencontré un problème.</h1>
      <p>{error.status ? `Erreur ${error.status} : ${error.statusText}` : "Une erreur inconnue est survenue."}</p>
      <pre>{error.message || JSON.stringify(error, null, 2)}</pre> {/* Affiche les détails */}
      <div><a href="https://cerebral.evalquiz.com">Retour à l'accueil</a></div>
    </div>
  );
}

export default {pageFaute}