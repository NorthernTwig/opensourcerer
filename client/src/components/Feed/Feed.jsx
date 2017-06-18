import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { mapDispatchToProps, mapStateToProps } from '../../redux/map/map'
import Event from './Event'
import { getEtag } from '../../lib/http'
import { joinRoom, leaveRoom } from '../../lib/connect'

class Feed extends Component {
  state = {
    events: [],
    etag: undefined,
  }

  componentWillMount = () => {
    joinRoom()
  }


  componentDidMount = () => {
    this.POLL_TIME = 10000 // How often to poll GitHub
    this.refreshEvents()
  }

  componentWillUnmount = () => {
    leaveRoom()
  }

  refreshEvents = async () => {
    try {
      const userHeader = await getEtag(this.props.username, this.props.state.user.etag)
      const { etag } = userHeader.headers

      if (this.props.state.user.etag.length === 0) {
        await this.fetchInitialEvents(etag)
      }

      if (etag !== this.props.state.user.etag) {
        await this.fetchNewEvents(etag)
      }

      return this.restart()
    } catch (e) {
      if (e.statusCode === 404) {
        return this.props.setUserDoesNotExists()
      } else if (e.statusCode === 403) {
        return this.restart(e)
      } else if (e.statusCode === 304) {
        return this.restart()
      }
      return this.restart()
    }
  }

  fetchInitialEvents = async (etag) => {
    await this.props.updateUserData(this.props.username, etag)
      .catch(e => console.log(e))
  }

  fetchNewEvents = async (etag) => {
    await this.props.userLevelup(this.props.state.user.username, etag)
      .catch(e => console.log(e))
  }

  restart = (error) => {
    const timeUntilRequest = error ?
      error.response.headers['x-ratelimit-reset'] :
      this.POLL_TIME

    setTimeout(() => {
      this.refreshEvents()
    }, timeUntilRequest)
  }

  timeLeft = (time) => {
    const until = new Date(time * 1000).getTime() // To milliseconds
    const current = new Date().getTime()
    return until - current
  }

  displayEvents = ({ events, id }) => {
    return <Event key={ id } event={ events } />
  }

  render() {
    const { events } = this.props.state.user

    return (
      <EventsWrapper>
        { events.map(this.displayEvents) }
      </EventsWrapper>
    )
  }
}

Feed.propTypes = {
  experienceUpdate: propTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)

const EventsWrapper = styled.div`
  column-count: 4;
  column-gap: 0;
  counter-reset: item-counter;
`