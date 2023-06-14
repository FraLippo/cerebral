
export const Ingredients = ({ tabListe}) => {
    return <ul>{tabListe.map((ingredient, i) => <li key={i+500}>{ingredient}</li>) }</ul>
}