import { Helmet } from 'react-helmet';
export default function BineroRules() {
    return (
      <div>
        <Helmet>
        <title>Règles du Binero 6x6 - Apprenez à jouer facilement</title>
<meta name="description" content="Découvrez comment jouer au Binero 6x6 avec des exemples simples. Apprenez les règles de base du Binero et devenez un expert de ce jeu de logique amusant."></meta>
     </Helmet>
        <h1 >Règles du Binero (grille 6x6)</h1>
        <p >
          Le Binero est un jeu de logique simple et amusant où il faut remplir une grille avec des <b>0</b> et des <b>1</b>.
          Voici les règles essentielles pour une grille de <b>6 lignes</b> et <b>6 colonnes</b> :
        </p>
  
        <ol>
          <li>
            Chaque ligne et chaque colonne doit contenir autant de <b>0</b> que de <b>1</b> (donc 3 de chaque).
          </li>
          <li>
            Il ne peut jamais y avoir <b>plus de deux 0 ou deux 1</b> consécutifs.
          </li>
          <li>
            Chaque ligne et chaque colonne doivent être uniques. Cette règle n'est pas importante dans les grilles de 6x6, mais elle devient cruciale dans les grilles plus grandes. On peut résoudre nos grilles sans utiliser cette règle.
          </li>
        </ol>
  
        <h2 >Exemples :</h2>
  
        <div >
          <p><b>Règle 1</b> - Équilibre :</p>
          <pre>➡️ 0 1 0 1 0 1</pre>
          <p >Dans les grilles de 6x6, chaque colonne doit toujours contenir trois 0 et trois 1. Si vous n'avez qu'un seul trou à compléter dans une ligne ou colonne, vous pouvez trouver le nombre manquant en comptant les 0 ou les 1.</p>
        </div>
  
        <div>
          <p><b>Règle 2</b> - Pas plus de deux nombres identiques côte à côte :</p>
          <pre>➡️0 0 1 1 0 1</pre>
          <p >⚠️ Jamais trois 0 ou trois 1 côte à côte.</p>
        <p>Exemple 1 avec une ligne ou colonne : 0 0 X X X X. Vous pouvez déduire que le premier X est un 1 car vous ne pouvez pas avoir trois 0 de suite. Réponse : 0 0 1 X X X</p> 
        <p>Exemple 2 avec une ligne ou colonne : 0 1 X 1 X X. Vous pouvez déduire que le premier X est un 0 car sinon vous auriez trois 1 d'alignés. Réponse : 0 1 0 1 X X</p> 
        
        </div>
  
        <div >
          <p></p>
          <p>
            Si vous voyez deux "0" ou deux "1" alignés, vous pouvez souvent déduire que la case suivante sera l'autre chiffre. Commencez par remplir les cases évidentes, puis passez aux cases plus difficiles.
          </p>
        </div>
        <p>🤞 Bonne chance</p>
      </div>
    );
  }
  