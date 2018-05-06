import React from 'react'

export default class SpaceObject extends React.Component {
  render () {
    return (
      <div
        className={this.props.className}
        id={this.props.id}
        style={{
          height: this.props.height || 0,
          width: this.props.width || 0
        }} />
    )
  }
}
