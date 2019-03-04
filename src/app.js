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
import SecureRoute from './components/common/SecureRoute'
import FlashMessage from './components/common/FlashMessage'

class App extends React.Component {
  constructor(){
    super()

  }


  render(){
    return(
      <BrowserRouter>
        <main>
          <FlashMessage/>
          <Switch>
            <SecureRoute path="/profile" component={ShoppingList} />
            <Route path="/recipes/:id" component={RecipeShow} />
            <Route path="/recipes" component={RecipesIndex} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/preferences" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
