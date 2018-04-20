import React from 'react'

export default class NoData extends React.Component {
    render () {
        let height = this.props.style ? this.props.style.height || "200px" : "200px"
        return (
            <div style={{ height: height, lineHeight: "200px", textAlign: "center" }}>
                {`No ${this.props.name || "data"}  found!`}
            </div>
        )
    }
}
