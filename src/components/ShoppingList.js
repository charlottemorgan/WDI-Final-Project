import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'

import { Link } from 'react-router-dom'


class ShoppingList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    axios.get('/api/me', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ user: res.data })
      })
  }

  render() {
    if(!this.state.user) return false
    return (
      <div className="container">
        <ul id="shoppingList">
          {this.state.user.list.map((item, i) =>
            <li key={i}>{item.name}</li>
          )}
        </ul>
        <Link to='/preferences'>
          <button className="button">Back to recipes</button>
        </Link>
      </div>




    )
  }
}

export default ShoppingList
