import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'

import Home from './Home'
import Login from './components/auth/Login'
import RecipesIndex from './components/RecipesIndex'

class App extends React.Component {
  constructor(){
    super()

  }


  render(){
    return(
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/recipes" component={RecipesIndex} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
