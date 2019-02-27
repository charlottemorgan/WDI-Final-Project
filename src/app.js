import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      title: 'HELLO WORLD!'
    }

  }


  render(){
    return(
      <h1>{this.state.title}</h1>
    )
  }
}

ReactDOM.render(<App />,  document.getElementById('root'))
