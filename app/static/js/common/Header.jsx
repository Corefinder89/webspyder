import React from 'react';

import { connect } from "react-redux"

import {
    Row,
    Col,
    Button,
    FormGroup,
    InputGroup,
    FormControl,
} from "react-bootstrap"

import actions from "../redux/actions"


@connect((state) => state)
export default class Header extends React.Component {
    constructor(...args) {
        super(...args)

        this.svgIds = [
            "weighted-tree-chart",
            "pie-chart-0",
            "pie-chart-1",
            "pie-chart-2"
        ]

        this.state = {
            inputLink: null,
        }
    }

    componentWillMount() {
        if (this.props.link && this.props.link.currentLink) {
            this.setState({
                inputLink: this.props.link.currentLink
            })
        }
    }

    onChangeInputLink(e) {
        let link = e.target.value
        this.setState({
            inputLink: link,
        })
    }

    onClickAnalyse(e) {
        e.preventDefault()

        let { dispatch } = this.props

        dispatch(actions.selectLink(this.state.inputLink))

        if (this.props.sidebar.selectedMode === "datalayer") {
            dispatch(actions.getDL(this.state.inputLink))
        } else {
            dispatch(actions.getStats(this.state.inputLink, this.props.sidebar.selectedMode))
        }
    }

    render() {
        return (
            <header>
                <Row>
                    <form onSubmit={this.onClickAnalyse.bind(this)}>
                        <FormGroup>
                            <Col xs={8}>
                                <InputGroup>
                                    <InputGroup.Addon><span className="fa fa-globe"></span></InputGroup.Addon>
                                    <FormControl
                                        value={this.state.inputLink}
                                        placeholder="https://www.datalcious.com"
                                        type="text"
                                        onChange={this.onChangeInputLink.bind(this)}/>
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <Button type="submit">Analyse</Button>
                            </Col>
                            <Col xs={2}>
                                <Button><span style={{ position: "relative", right: "5px", top: "1px" }} className="fa fa-download"></span> Export PDF</Button>
                            </Col>
                        </FormGroup>
                    </form>
                </Row>
            </header>
        )
    }
}
