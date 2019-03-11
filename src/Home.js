import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import { Link } from 'react-router-dom'

import DietLabels from './components/common/DietLabels'
import HealthLabels from './components/common/HealthLabels'

const customStyles = {
  control: (styles, { isFocused }) => ({ ...styles, backgroundColor: 'white', border: isFocused ? 'none' : 'none', boxShadow: isFocused ? 'none' : 'none' }),
  option: (styles, { isFocused }) => {

    return {
      ...styles,
      backgroundColor: isFocused ? 'grey' : 'black',
      color: 'white',
      fontSize: '20px'
    }
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'white',
      color: 'black',
      fontSize: '20px'
    }
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'black'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'black',
    ':hover': {
      backgroundColor: 'white',
      color: 'black'
    }
  })
}

class Home extends React.Component{
  constructor() {
    super()

    this.state = {
      health: [],
      diet: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.savePreferences = this.savePreferences.bind(this)
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

  savePreferences() {
    const {health, diet} = this.state
    // save to local storage
    window.localStorage.setItem('health', health)
    window.localStorage.setItem('diet', diet)
    console.log('preferences set to localStorage')
  }

  render() {
    return(
      <div className="hero is-large">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
                DINE.
            </h1>
            <div className="field has-addons">
              <div className="control is-expanded drop_down">
                <div className="select-div">
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
                    styles={customStyles}
                  />
                </div>
                <div className="select-div">
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
                    styles={customStyles}
                  />
                </div>
                <Link
                  to ={{
                    pathname: '/recipes'
                  }}
                  onClick={() => this.savePreferences()}
                >
                  <h2 className="button">Show recipes</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Home
