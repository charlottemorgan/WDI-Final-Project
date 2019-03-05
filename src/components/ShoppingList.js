import React from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'

import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


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
        this.setState({ user: {...res.data, listChecked: [], listUnchecked: res.data.list} })
      })
  }

  itemChecked(item) {
    const { list } = this.state.user
    const index = this.state.user.list.indexOf(item)
    const toggleItem = { ...item, checked: !item.checked }

    const newList = [
      ...list.slice(0, index),
      toggleItem,
      ...list.slice(index+1)
    ]

    const listUnchecked = newList.filter(item => !item.checked)
    const listChecked = newList.filter(item => item.checked)
    const user = { ...this.state.user, list: newList, listChecked, listUnchecked }
    toast.success(`${!item.checked ? 'Got It!' : 'Need It!'}`)
    this.setState({ user })
  }


  render() {
    const { user } = this.state
    if(!user) return false
    return (
      <div className="container list">
        <h2 className="title is-1">List</h2>
        <ul id="shoppingList">
          <h3 className="need-it">Need It</h3>
          {user.listUnchecked.map((item, i) =>
            <li
              className={'list'}
              key={i}>{item.name}
              <div
                onClick ={() => this.itemChecked(item)}
                key={i}
                className={'box'}></div>
            </li>
          )}
        </ul>
        <ul id="shoppingList">
          <h3 className="got-it">Got It</h3>
          {user.listChecked.map((item, i) =>
            <li
              className={'checked list'}
              key={i}>{item.name}
              <div
                onClick ={() => this.itemChecked(item)}
                key={i}
                className={'checked box'}></div>
            </li>
          )}
        </ul>
        <Link to='/recipes'>
          <button className="button">Back to recipes</button>
        </Link>
        <ToastContainer position='bottom-right' hideProgressBar={true} autoClose={2000}
          toastClassName="dark-toast"/>
      </div>




    )
  }
}

export default ShoppingList
