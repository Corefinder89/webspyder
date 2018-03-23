import React from "react"


export default class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <span>{this.props.title}</span>
                <div id="pcontent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
