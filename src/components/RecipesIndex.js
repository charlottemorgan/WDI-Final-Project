import React, {Fragment} from 'react'
import axios from 'axios'
import qs from 'qs'

import { Link } from 'react-router-dom'

class RecipesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      recipes: {
        hits: []
      },
      loading: true
    }
  }

  componentDidMount() {
    const health = window.localStorage.getItem('health').split(',')
    const diet = window.localStorage.getItem('diet').split(',')
    console.log('HHEALTH  AND DIET', health, diet)
    axios.get('/api/recipes', {
      params: { health, diet },
      paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'})
    })
      .then(res => {
        if (res) this.setState({ recipes: res.data, loading: false })
      }).catch(e => {
        console.log('error',e)
        this.setState({noRecipesFound: true, loading: false})
      })
  }


  render() {
    console.log('STATE',this.state)
    if(this.state.loading) return <h3 className="title loading">Loading . . .</h3>
    if(this.state.noRecipesFound) {
      return (
        <Fragment>
          <h3 className='title no-combo'>No recipes found for this combination</h3>
          <Link className='button' to={{pathname: '/'}}>Choose new preferences</Link>
        </Fragment>
      )
    }

    return(
      <section className="section">
        <h2 className="title is-1">Recipes</h2>
        <div className="container">
          <div className="columns is-multiline">

            {this.state.recipes.hits.map((hit, i) =>{
              return <Link
                to={{
                  pathname: `/recipes/${hit.recipe.label.split(' ').join('')}`,
                  state: { recipe: hit.recipe }
                }}
                className="column is-three-fifths is-offset-one-fifth front"
                style={{ backgroundImage: `url(${hit.recipe.image})`}}
                key={i}
              >
                <div className="text-overlay">{hit.recipe.label}</div>
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
