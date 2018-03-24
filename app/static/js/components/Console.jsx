import React from "react"

import {
    Alert,
} from "react-bootstrap"


export default class Console extends React.Component {
    constructor(...args) {
        super(...args)

        this.levelAlertClass = {
            SEVERE: 'danger',
            WARNING: 'warning',
            INFO: 'info'
        }
    }

    render() {
        let alerts = this.props.data.map((alert, index) => {
            return (
                <Alert key={index} style={{ overflowX: "auto", textAlign: "justify", wordWrap: "break-word" }} bsStyle={this.levelAlertClass[alert.level]}>
                    <p>{alert.message}</p>
                </Alert>
            )
        })
        return (
            <div style={{ height: "306px", overflowY: "auto" }}>
                {alerts}
            </div>
        )
    }
}
