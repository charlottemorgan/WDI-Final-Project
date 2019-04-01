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
    this.getShoppingUrl = this.getShoppingUrl.bind(this)
    this.extractIngredientJsonFromRecipe = this.extractIngredientJsonFromRecipe.bind(
      this
    )
  }

  componentDidMount() {
    axios
      .get('/api/me', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        this.setState({
          user: { ...res.data, listChecked: [], listUnchecked: res.data.list }
        })
      })
  }

  itemChecked(item) {
    const { list } = this.state.user
    const index = this.state.user.list.indexOf(item)
    const toggleItem = { ...item, checked: !item.checked }

    const newList = [
      ...list.slice(0, index),
      toggleItem,
      ...list.slice(index + 1)
    ]

    const listUnchecked = newList.filter(item => !item.checked)
    const listChecked = newList.filter(item => item.checked)
    const user = {
      ...this.state.user,
      list: newList,
      listChecked,
      listUnchecked
    }
    toast.success(`${!item.checked ? 'Got It!' : 'Need It!'}`)
    this.setState({ user })
  }

  extractIngredientJsonFromRecipe(recipe) {
    console.log('this recipe', recipe)
    const result = JSON.stringify({
      ingredients: this.state.user.list.map(ingredient => {
        console.log(ingredient)
        const text = ingredient.name
        const weight = 1000
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
    return console.log(result)
  }

  getShoppingUrl(ingredients) {
  
    console.log('ingredients', ingredients)
    // we want to use ingredients, not default data
    // We want to use the converter function we wrote ages ago to convert recipe data into data for AWS Fresh
    // this.extractIngredientJsonFromRecipe(recipe)
    axios
      .post(
        'https://cors-anywhere.herokuapp.com/www.amazon.co.uk/afx/ingredients/recipes/encode',
        {
          ingredients: [
            {
              name: 'green apples',
              quantityList: [
                { unit: 'COUNT', amount: 5 },
                { unit: 'KILOGRAMS', amount: 0.5 }
              ]
            },
            {
              name: 'strawberry non-fat greek yogurt',
              brand: '',
              asinOverride: '',
              quantityList: [{ unit: 'OUNCES', amount: 5 }]
            }
          ]
        }
      )
      .then(function(response) {
        const tinyUrl = response.data.tinyUrl
        console.log('AXIOS RESPONSE FROM FRESH', tinyUrl)
        window.open(tinyUrl, '_blank')
      })
  }

  render() {
    console.log(this.state)

    const { user } = this.state
    if (!user) return false
    return (
      <div className="container list">
        <h2 className="title is-1">List</h2>
        <ul id="shoppingList">
          <h3 className="need-it">Need It</h3>
          {user.listUnchecked.map((item, i) => (
            <li className={'list'} key={i}>
              {item.name}
              <div
                onClick={() => this.itemChecked(item)}
                key={i}
                className={'box'}
              />
            </li>
          ))}
        </ul>
        <ul id="shoppingList">
          <h3 className="got-it">Got It</h3>
          {user.listChecked.map((item, i) => (
            <li className={'checked list'} key={i}>
              {item.name}
              <div
                onClick={() => this.itemChecked(item)}
                key={i}
                className={'checked box'}
              />
            </li>
          ))}
        </ul>
        <button className="button" onClick={() => this.extractIngredientJsonFromRecipe(user)}>
          Find items on Amazon Fresh
        </button>
        <Link to="/recipes">
          <button className="button">Back to recipes</button>
        </Link>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          autoClose={2000}
          toastClassName="dark-toast"
        />
      </div>
    )
  }
}

export default ShoppingList
