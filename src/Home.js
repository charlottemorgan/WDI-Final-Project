import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import { Link } from 'react-router-dom'

// import axios from 'axios'
//
// import qs from 'qs'

import Register from './components/auth/Register'
import DietLabels from './components/common/DietLabels'
import HealthLabels from './components/common/HealthLabels'


// axios.defaults.headers.common = {'Authorization': `bearer ${'hello'}`}

class Home extends React.Component{
  constructor() {
    super()

    this.state = {
      health: [],
      diet: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value, input) {
    const pureValues = value.map(selection => selection.value)
    this.setState({[input.name]: pureValues })
  }


  handleSubmit(e) {
    e.preventDefault()
    // // const token = 'hello' //get this from local storage
    // const { health, diet } = this.state
    // axios.post('/api/users/setpreferences', {
    //   // headers: {'Authorization': `bearer + ${token}`},
    //   params: { health, diet },
    //   paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'})
    // })
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
                label="diet"
                name="diet"
                options={DietLabels}
                components={makeAnimated()}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Dietary Requirements"
                onChange={(value,input) => this.handleChange(value,input)}

              />
              <Select
                isMulti
                clearValue
                label="health"
                name="health"
                options={HealthLabels}
                components={makeAnimated()}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Health Requirements"
                onChange={(value,input) => this.handleChange(value,input)}
              />
              <Link to ={{
                pathname: '/recipes',
                state: { health: this.state.health, diet: this.state.diet }
              }}>
                <h2>Show recipes</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Home
