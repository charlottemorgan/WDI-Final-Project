import React from 'react'

import Flash from '../../lib/Flash'

class FlashMessages extends React.Component {
  constructor() {
    super()
    this.state = { messages: null }
  }

  componentDidUpdate() {
    const messages = Flash.getMessages()
    if(!messages) return false

    this.setState({ messages })
    Flash.clearMessages()

    setTimeout(() => this.setState({ messages: null }), 5000)
  }

  render() {
    if(!this.state.messages) return null
    return (
      <div>
        {Object.keys(this.state.messages).map(type =>
          <div key={type} className={`notification is-${type}`}>
            <div className="container">
              <strong>{this.state.messages[type]}</strong>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default FlashMessages
