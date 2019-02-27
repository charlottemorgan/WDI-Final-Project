import React from 'react'

import { Link } from 'react-router-dom'

class Home extends React.Component{
  constructor() {
    super()

  }

  render() {
    return(
      <div className="hero">
        <div className="container">
          <Link to="/login">
            <h1 className="title is-1">
              Welcome, click to login
            </h1>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
