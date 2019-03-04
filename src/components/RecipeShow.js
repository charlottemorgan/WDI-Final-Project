import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'




class RecipeShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      recipe: props.location.state.recipe,
      amazonFreshHtml: {__html: ''}
    }
  }

  extractIngredientJsonFromRecipe(recipe) {
    console.log('this recipe', recipe)

    const result = JSON.stringify({
      ingredients: recipe.ingredients.map(ingredient => {
        console.log(ingredient)
        const text = ingredient.text
        const weight = ingredient.weight
        return {
          name: text,
          quantityList: [
            {
              unit: 'KILOGRAMS',
              amount: weight / 1000
            }
          ]

        }
      })
    })
    return result
  }

  testRequest(recipe) {
    const ingredientJson = this.extractIngredientJsonFromRecipe((recipe))
    // Make a request with json
    const url = 'https://cors-anywhere.herokuapp.com/https://www.amazon.co.uk/afx/ingredients/landing'
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    console.log('ingredientJSON',ingredientJson)
    axios({
      method: 'post',
      url,
      data: ingredientJson,
      headers
    }).then(res => {
      console.log('RESULT',res.data)

      this.setState({amazonFreshHtml: {__html: res.data}}, () => console.log('STATE NOW', this.state))
    })


    // https://www.amazon.com/afx/ingredients/landingencoded?encodedIngredients=H4sIAAAAAAAAAJWOvQrCQBCEX2XZ-pT4B8ZOLEQ0CFpKiiW35A7Mnu5dCgl5d08Le7uZ4WNmBvTSKlvPkiJubgMKdYwbXELopeEIrVJiCw_SjiOJgYqkcdwGAzvH1pIaCAohOVZwpPbjInd-8jUZ5cho8NmTJJ9eJx_Td6gXnwUeD6fz_rKtrpmhLo_msJjOZotFuS7K-WqsR_N7tYYmqEAKmvz9TvH_3nKeC-vxDXC4jgr4AAAA
  }




  render() {
    console.log(this.state)
    return(
      <div>
        <header>
        </header>
        <section className="hero is-medium" style={
          { backgroundImage: `url(${this.state.recipe.image})`}
        }>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{this.state.recipe.label}</h1>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h4 className="title">Ingredients</h4>
              <ul id="ingredientList">
                {this.state.recipe.ingredients.map((ingredient, i) =>
                  <li key={i}>{ingredient.text}</li>
                )}
              </ul>
            </div>
            <div className="column is-half">
              <h5 className="title">Cooking Time:</h5><p>{this.state.recipe.totalTime} minutes</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h5 className="title">Nutrition:</h5>
              <ul><li>Calories:{Math.round(this.state.recipe.calories)}</li></ul>
              <ul id="nutritionList">
                {this.state.recipe.digest.slice(0,6).map((nutrient, i) =>
                  <li key={i}>{nutrient.label}: {Math.round(nutrient.total)} {nutrient.unit}</li>
                )}
              </ul>
            </div>
            <div className="column is-half">
              <h5 className="title">Source:</h5><p>{this.state.recipe.source}</p>
              <a href={this.state.recipe.url}>
                <button className="button">See full method</button>
              </a>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default RecipeShow

// <button className="button" onClick={() => this.extractIngredientJsonFromRecipe(recipe)}>TEST JSON EXTRACTOR</button>
// <button className="button" onClick={() => this.testRequest(recipe)}>TEST FRESH REQUEST</button>
// <div dangerouslySetInnerHTML={this.state.amazonFreshHtml}></div>

// <section className="section">
//   <div className="container">
//     <h2 className="title">Artist Bio</h2>
//     <div className="content">{this.killATag()}</div>
//     <h2 className="title">Top Albums</h2>
//     <div className="columns is-multiline">
//       {this.state.albums.map((album, index) =>
//         <Link key={index} to={`/${this.title}/${album.mbid}`} className="column is-one-third album">
//           <h2 className="subtitle is-3">{album.name}</h2>
//           <div className="albumDiv">
//             <img src={album.image[3]['#text']} alt={album.name} />
//           </div>
//         </Link>
//       )}
//     </div>
//   </div>
// </section>
// <div className="container">
//   <h2 className="title is-1">Similar Artists</h2>
// </div>
// <ul id="searchResultList">
//   {this.state.artistInfo.artist.similar.artist.map((artist, i) =>
//     <Link key={i} to={`/${artist.name}`} onClick={this.getData}>
//       <li id={`a${i}`}>{artist.name}</li>
//     </Link>
//   )}
// </ul>
// </div>
