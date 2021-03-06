import React from 'react'
import axios from 'axios'
import { withRouter  } from 'react-router-dom'
class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }


  handleChange({target: {name, value }}) {
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => alert(err.message))

  }

  render() {
    return (
      <div className="container">
        <form className="register" onSubmit={this.handleSubmit}>
          <h2 className="title form">Register</h2>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.data.username}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.data.email}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.data.password}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                value={this.state.data.password_confirmation}
              />
            </div>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>

    )
  }
}

export default withRouter(Register)
