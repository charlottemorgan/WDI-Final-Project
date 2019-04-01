import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Auth from '../lib/Auth'




class RecipeShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      recipe: props.location.state.recipe,
      user: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
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
    if (!this.state) return <h3 className="title loading">Loading . . .</h3>
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
              <ul>
                {this.state.recipe.ingredients.map((ingredient, i) =>
                  <li className="ingredients" key={i}>{ingredient.text}</li>
                )}
              </ul>
            </div>
            <div className="column is-full show-columns">
              <h5 className="title">Cooking Time:</h5><p>{this.state.recipe.totalTime} minutes</p>
            </div>
            <div className="column is-full show-columns">
              <h5 className="title">Nutrition: </h5>
              <ul><li className="ingredients">Calories: {Math.round(this.state.recipe.calories)} kcal</li></ul>
              <ul id="nutritionList">
                {this.state.recipe.digest.slice(0,6).map((nutrient, i) =>
                  <li className="ingredients" key={i}>{nutrient.label}: {Math.round(nutrient.total)} {nutrient.unit}</li>
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
