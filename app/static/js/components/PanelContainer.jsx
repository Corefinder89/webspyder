import React from "react"


export default class PanelContainer extends React.Component {
    render() {
        return (
            <div className="panel-container">
                <span>{this.props.title}</span>
                <div id="pcontent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
