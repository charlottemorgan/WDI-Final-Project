import React from 'react'
import axios from 'axios'
import qs from 'qs'

import { Link } from 'react-router-dom'

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
    console.log('STATE',this.state)
    if(!this.state.recipes.hits.length) return <h1 className="title">Loading...</h1>

    return(
      <section className="section">
        <h2 className="title is-1">Recipes</h2>
        <div className="container">
          <div className="columns is-multiline">

            {this.state.recipes.hits.map((hit, i) =>{
              return <Link to ={{
                pathname: `/recipes/${hit.recipe.label.split(' ').join('')}`,
                state: { recipe: hit.recipe }

              }}
              key={i}>
                <div className="column is-three-fifths is-offset-one-fifth front"
                  style={{ backgroundImage: `url(${hit.recipe.image})`}}>
                  <div className="text-overlay">{hit.recipe.label}</div>
                </div>

              </Link>
            }
            )}
          </div>
        </div>
      </section>
    )
  }




}

export default RecipesIndex
