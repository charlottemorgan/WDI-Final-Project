import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Auth from '../lib/Auth'




class RecipeShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      recipe: props.location.state.recipe,
      amazonFreshHtml: {__html: ''},
      user: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
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

  }

  componentDidMount() {
    axios('/api/me', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }))
  }

  handleSubmit(e){
    e.preventDefault()
    const { user, recipe } = this.state
    const ingredients = recipe.ingredients.map(ingredient => ({ name: ingredient.text }))
    const dataToSend = {
      ...user,
      list: user.list.concat(ingredients)
    }
    axios
      .put('/api/me', dataToSend, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/profile'))
  }



  render() {
    if (!this.state) return <h3 className="title loading">Loading...</h3>
    if (!Auth.isAuthenticated()) return <Redirect to={{pathname: '/login'}}/>
    console.log(this.state)
    return(
      <div>
        <header>
        </header>
        <section className="hero is-large" style={
          { backgroundImage: `url(${this.state.recipe.image})`}
        }>
          <div className="hero-body show">
            <div className="container">
              <h1 className="recipe-title">{this.state.recipe.label}</h1>
            </div>
          </div>
        </section>
        <div className="container">
          <button className="button" onClick={this.handleSubmit}> Add to shopping list</button>
          <div className="columns is-multiline">
            <div className="column is-full show-columns">
              <h4 className="title">Ingredients</h4>
              <ul id="ingredientList">
                {this.state.recipe.ingredients.map((ingredient, i) =>
                  <li key={i}>{ingredient.text}</li>
                )}
              </ul>
            </div>
            <div className="column is-full show-columns">
              <h5 className="title">Cooking Time:</h5><p>{this.state.recipe.totalTime} minutes</p>
            </div>
            <div className="column is-full show-columns">
              <h5 className="title">Nutrition: </h5>
              <ul><li>Calories: {Math.round(this.state.recipe.calories)} kcal</li></ul>
              <ul id="nutritionList">
                {this.state.recipe.digest.slice(0,6).map((nutrient, i) =>
                  <li key={i}>{nutrient.label}: {Math.round(nutrient.total)} {nutrient.unit}</li>
                )}
              </ul>
            </div>
            <div className="column is-full show-columns">
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
