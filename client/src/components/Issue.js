import React, { Component } from 'react'

export default class extends Component {
  render() {
    const { id, type, created_at } = this.props.issue

    return (
      <div>
        <h4>{ type }</h4>
        <h5>{ id }</h5>
        <h6>{ created_at }</h6>
      </div>
    )
  }
}