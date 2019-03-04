import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

const SecureRoute = ({component: Component , ...otherProps }) => {
  if(Auth.isAuthenticated()) return <Route {...otherProps} component={Component}/>

  Flash.setMessage('danger', 'You are not logged in')
  return <Redirect to="/login"/>
}

export default SecureRoute
