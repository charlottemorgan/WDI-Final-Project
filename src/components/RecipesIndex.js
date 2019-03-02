import React from 'react'
import axios from 'axios'
import qs from 'qs'

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
    const { health, diet } = this.props.location.state
    axios.get('/api/recipes', {
      params: { health, diet },
      paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'})
    })
      .then(res => this.setState({ recipes: res.data }))
  }


  render() {
    console.log(this.state)
    if(!this.state.recipes.hits.length) return <h1 className="title">Loading...</h1>
    return(
      <section className="section">
        <h2 className="title is-1">Recipes</h2>
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {this.state.recipes.hits.map((hit, i) =>
              <div className="column is-four-fifths front" key={i}>
                <figure className="image" style={{ backgroundImage: `url(${hit.recipe.image})`}} />
                <div className="text-overlay">{hit.recipe.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }




}

export default RecipesIndex
