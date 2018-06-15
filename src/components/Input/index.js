import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isBrowserIE } from 'helpers';
import MicButton from '../MicButton/index'  // i820703

import './style.scss'

class Input extends Component {
  state = {
    value: '',
    placeholderText: "Write a reply..."  // i820703
  }

  componentDidMount() {
    this._input.focus()
    this._input.value = isBrowserIE() ? '' : null

    this.onInputHeight()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value
  }

  componentDidUpdate() {
    if (!this.state.value) {
      // Dirty fix textarea placeholder to reset style correctly
      setTimeout(() => {
        this._input.style.height = '18px'
        this._input.value = isBrowserIE() ? '' : null
        this.onInputHeight()
      }, 100)
    }

    this.onInputHeight()
  }

  onInputHeight = () => {
    const { onInputHeight } = this.props
    if (onInputHeight) {
      onInputHeight(this.inputContainer.clientHeight)
    }
  }

  sendMessage = () => {
    const content = this.state.value.trim()
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

  autoGrow = () => {
    this._input.style.height = '18px'
    this._input.style.height = this._input.scrollHeight + 'px'
  }

  render() {
    const { value } = this.state
    const { placeholderText } = this.state  // i820703

    return (
      <div
        className="RecastAppInput"
        ref={ref => {
          this.inputContainer = ref
        }}
      >
        <textarea
          ref={i => (this._input = i)}
          value={value}
          style={{ width: '100%', maxHeight: 70, resize: 'none' }}
          placeholder={placeholderText}
          onChange={e => this.setState({ value: e.target.value }, this.autoGrow)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.sendMessage()
              e.preventDefault()
            }
          }}
          rows={1}
        />
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
  onInputHeight: PropTypes.func,
}

export default Input
