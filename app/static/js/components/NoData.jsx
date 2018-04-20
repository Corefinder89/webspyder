import React from 'react'

export default class NoData extends React.Component {
    render () {
        return (
            <div style={{ height: "200px", lineHeight: "200px", textAlign: "center" }}>
                {`No ${this.props.name || "data"}  found!`}
            </div>
        )
    }
}
