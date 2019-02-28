import React from 'react'
import axios from 'axios'

class RecipesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      recipes: {
        hits: []
      }
    }
  }

  componentDidMount() {
    axios
      .get('/api/recipes', this.state.data)
      .then(res => this.setState({ recipes: res.data }))
  }

  render() {
    console.log(this.state)
    if(!this.state.recipes.hits.length) return <h1 className="title">Loading...</h1>
    return(
      <section className="section">
        <h2 className="title is-1">Recipes</h2>
        <div className="container">
          <div className="columns is-multiline">
            {this.state.recipes.hits.map((hit, i) =>
              <div className="column is-one-quarter" key={i}>
                <h2 className="title">{hit.recipe.label}</h2>
                <p>{hit.recipe.ingredientLines}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }




}

export default RecipesIndex
