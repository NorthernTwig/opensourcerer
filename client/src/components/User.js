import React, { Component } from 'react'
import Presentation from './Presentation'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/map/map'
import styled from 'styled-components'
import Feed from './Feed'
import Inventory from './Inventory'

class User extends Component {
  state = {
    userExists: true,
    experience: 0,
    avatarUrl: ''
  }
  
  setUserDoesNotExists = () => {
    this.setState({
      userExists: false
    })
  }

  setExperience = experience => {
    this.setState({
      experience
    })
  }

  setAvatar = url => {
    this.setState({
      avatarUrl: url
    })
  }

  setText = () => {
    if (this.state.userExists) {
      return <Presentation 
        userExists={ this.state.userExists }
        username={ this.props.match.params.username }
        experience={ this.state.experience }
        history={ this.props.history }
        avatarUrl={ this.state.avatarUrl }
      />
    }
    return (<h1>Hey, that name is available for usage!</h1>)
  }

  render() {
    return (
      <MainContainer>
        <Inventory/>
        { this.setText() }
        <Feed 
          setUserDoesNotExists={ this.setUserDoesNotExists }
          username={ this.props.match.params.username }
          experienceGain={ this.setExperience }
        />
      </MainContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

const MainContainer = styled.div`
  width: 100wv;
  height: 100vh;
  background-color: #dedded;
  display: flex;
  flex-direction: column;
  background-color: #1e202f;
`