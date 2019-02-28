import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import axios from 'axios'

const rp = require('request-promise')

import Register from './components/auth/Register'
import DietLabels from './components/common/DietLabels'
import HealthLabels from './components/common/HealthLabels'




class Home extends React.Component{
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSubmit(e) {
    e.preventDefault()
    axios('/api/recipes', (req) => {
      rp({
        method: 'POST',
        url: '/api/recipes',
        qs: {
          diet: req.query.value,
          health: req.query.value
        },
        json: true
      })
    })
  }




  render() {
    return(
      <div className="hero">
        <div className="container">

          <div className="field has-addons">
            <div className="control is-expanded drop_down">
              <Select
                isMulti
                clearValue
                options={DietLabels}
                components={makeAnimated()}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Dietary Requirements"
              />
              <Select
                isMulti
                clearValue
                options={HealthLabels}
                components={makeAnimated()}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Health Requirements"
              />
              <button className="button" onClick={this.handleSubmit}>Show recipes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
