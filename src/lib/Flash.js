class Flash{
  static setMessage(type, message){
    this._message = this._message || {}
    this._message[type] = message
  }
  static getMessages(){
    return this._message
  }
  static clearMessages(){
    this._message = null
  }
}

export default Flash
