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
    this.itemChecked = this.itemChecked.bind(this)
  }

  componentDidMount() {
    axios.get('/api/me', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ user: res.data })
      })
  }

  itemChecked(item) {
    const index = this.state.user.list.indexOf(item)
    const toggleItem = { ...item, checked: !item.checked }
    const list = [
      ...this.state.user.list.slice(0, index),
      toggleItem,
      ...this.state.user.list.slice(index+1)
    ]
    const user = { ...this.state.user, list }
    this.setState({ user })
  }




  render() {
    if(!this.state.user) return false
    return (
      <div className="container">
        <ul id="shoppingList">
          {this.state.user.list.map((item, i) =>
            <li onClick ={() => this.itemChecked(item)} key={i}>{item.name}</li>
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
