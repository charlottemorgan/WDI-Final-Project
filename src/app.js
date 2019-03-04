import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './style.scss'

import Home from './Home'
import Login from './components/auth/Login'
import RecipesIndex from './components/RecipesIndex'
import RecipeShow from './components/RecipeShow'
import ShoppingList from './components/ShoppingList'
import Register from './components/auth/Register'

class App extends React.Component {
  constructor(){
    super()

  }


  render(){
    return(
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/list" component={ShoppingList} />
            <Route path="/recipes/:id" component={RecipeShow} />
            <Route path="/recipes" component={RecipesIndex} />
            <Route path="/login" component={Login} />
            <Route path="/preferences" component={Home} />
            <Route path="/" component={Register} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
