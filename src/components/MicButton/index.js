import React, { Component } from 'react'
import annyang from 'annyang'

import ReactDOM from 'react-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faMicrophone from '@fortawesome/fontawesome-free-solid/faMicrophone'


import './style.scss'

var micErrorTimeoutMsg

class MicButton extends Component {
    state = {
        micClass: "micNotInUse",
        annyangStarted: false,
        micListening: false
    }


    setupVoiceToText() {
        annyang.addCallback('start', this.annyangStart, this)
        annyang.addCallback('errorPermissionBlocked', this.annyangError, this)
        annyang.addCallback('errorPermissionDenied', this.annyangError, this)
        annyang.start()
    }

    annyangStart() {
        if (!this.state.annyangStarted) {
            var self = this
            var commands = {}
            commands["*tag"] = text => { self.speechReceived(text) }
            annyang.addCommands(commands)

            this.setState({ annyangStarted: true })
        }
    }

    annyangError(error) {
        this.setInputTyping()
        this.props.changePlaceHolderText("Please check your microphone...")

        var self = this

        clearTimeout(micErrorTimeoutMsg)
        micErrorTimeoutMsg = setTimeout(() => {
            self.props.changePlaceHolderText("Write a reply...")
        }, 5000)
    }

    speechReceived(text) {
        this.props.changeValue(text)
        this.props.sendMessage(new Event("speechReceived"))
        this.setInputTyping()
    }

    setInputListening() {
        if (!this.state.annyangStarted) {
            this.setupVoiceToText()
        } else {
            annyang.resume()
        }

        this.setState({ micClass: "micInUse" })
        this.setState({ micListening: true })
        this.props.changePlaceHolderText("Speak now.  Listening...")
    }

    setInputTyping() {
        annyang.abort()
        this.setState({ micClass: "micNotInUse" })
        this.setState({ micListening: false })
        this.props.changePlaceHolderText("Write a reply...")
    }

    micPress() {
        if (this.state.micListening) {
            this.setInputTyping()
        } else {
            this.setInputListening()
        }

    }

    render() {
        const { micClass } = this.state

        return ( <
            FontAwesomeIcon className = { micClass } icon = { faMicrophone } onClick = { this.micPress.bind(this) }
            />  
        )
    }
}

export default MicButton