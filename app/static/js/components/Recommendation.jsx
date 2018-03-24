import React from "react"

import {
    Panel,
} from "react-bootstrap"


export default class Recommendation extends React.Component {
    render() {
        let recommendations = this.props.data.map((recommendation, index) => {
            return (
                <Panel key={index} id={`panel-${index}`} defaultExpanded>
                    <Panel.Toggle>
                        <Panel.Heading>
                            <Panel.Title>{recommendation.title}</Panel.Title>
                        </Panel.Heading>
                    </Panel.Toggle>
                    <Panel.Collapse>
                        <Panel.Body>
                            {recommendation.description}
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            )
        })

        return (
            <div>
                {recommendations}
            </div>
        )
    }
}
