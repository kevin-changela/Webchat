import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MicButton from '../MicButton/index'  // i820703

import './style.scss'

class Input extends Component {
  state = {
    value: '',
    placeholderText: "Write a reply..."  // i820703
  }

  componentDidMount() {
    this._input.focus()
  }

  sendMessage = e => {
    const content = this.state.value.trim()

    e.preventDefault()
    if (content) {
      this.props.onSubmit({ type: 'text', content })
      this.setState({ value: '' })
    }
    
    this.changePlaceHolderText("Write a reply...")  // i820703
  }

/*** i820703 ***/
  changePlaceHolderText = placeholderText => {
    this.setState({placeholderText})
  }

  changeValue = value => {
    this.setState({value})
  }
/*** i820703 ***/

  render() {
    const { value } = this.state
    const { placeholderText } = this.state  // i820703

    return (
      <div className="RecastAppInput">
        <form onSubmit={this.sendMessage} style={{ width: '100%' }}>
          <input
            ref={i => (this._input = i)}
            type="text"
            value={value}
            style={{ width: '100%' }}
            placeholder={placeholderText}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </form>   
        <MicButton changePlaceHolderText={this.changePlaceHolderText.bind(this)} 
                   sendMessage={this.sendMessage.bind(this)} 
                   changeValue={this.changeValue.bind(this)} 
                   sendMessage={this.sendMessage.bind(this)}/>         
      </div>
    )
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func,
}

export default Input
