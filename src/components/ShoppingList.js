import React from 'react'

import { Link } from 'react-router-dom'


class ShoppingList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: props.location.state.ingredients
    }
  }


  render() {
    return (
      <div className="container">
        <ul id="shoppingList">
          {this.state.ingredients.map((item, i) =>
            <li key={i}>{item.text}</li>
          )}
        </ul>
        <Link to='/recipes'>
          <button className="button">Back to recipes</button>
        </Link>
      </div>



    )
  }
}

export default ShoppingList
