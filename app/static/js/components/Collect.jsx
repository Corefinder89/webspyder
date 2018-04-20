import React from "react"

import {
    Alert,
} from "react-bootstrap"


export default class Card extends React.Component {
    render() {
        let collectRequests = this.props.data.map((d, index) => {
            return (
                <Alert style={{ overflowY: "auto" }} key={index} bsStyle={"info"}>
                    <p style={{ whiteSpace: "nowrap" }}>
                        <a target="_blank" href={d.name}>{d.name}</a>
                    </p>
                </Alert>
            )
        })

        return (
            <div style={{ height: "306px", overflowY: "auto" }}>
                {collectRequests}
            </div>
        )
    }
}
