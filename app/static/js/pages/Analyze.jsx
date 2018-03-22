import React from "react"

import {
    Row,
    Col
} from "react-bootstrap"

import PanelContainer from "../components/PanelContainer"


export default class Analyze extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <PanelContainer
                            title={"Libraries"}>
                            Google
                        </PanelContainer>
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <PanelContainer
                            title={"Pie Chart"}>
                            Google
                        </PanelContainer>
                    </Col>
                    <Col xs={7}>
                        <PanelContainer
                            title={"Console Logs"}>
                            Google
                        </PanelContainer>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <PanelContainer
                            title={"Recommendations"}>
                            Google
                        </PanelContainer>
                    </Col>
                </Row>
            </div>
        )
    }
}
