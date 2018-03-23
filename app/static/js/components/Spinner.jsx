import React from "react"


export default class Spinner extends React.Component {
    render() {
        return (
            <div className="spinner">
                <img src="/static/images/loader.svg"/>
            </div>
        )
    }
}
