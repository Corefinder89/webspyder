import React from "react"

import { connect } from "react-redux"

import ReactJson from 'react-json-view'

import {
    Row,
    Col,
    Modal,
    Button,
    FormGroup,
    InputGroup,
    FormControl,
} from "react-bootstrap"

import Card from "../components/Card"

import dataLayer from "../data/datalayer"

import actions from "../redux/actions"


@connect((state) => state)
export default class DataLayer extends React.Component {
    constructor(...args) {
        super(...args)

        this.state = {
            showImportModal: false,
            spreadSheetLink: "",
        }
    }

    componentWillMount() {
        if (!this.props.sidebar.selectedMode) {
            let currentMode = this.props.location.pathname.substr(1)

            let { dispatch } = this.props
            dispatch(actions.selectMode(currentMode))

            dispatch(actions.getDL(this.props.link.currentLink))
        }
    }

    handleModalChange() {
        this.setState(prevState => ({
            showImportModal: !prevState.showImportModal,
        }))
    }

    importLinkChange(e) {
        let link = e.target.value
        this.setState({
            spreadSheetLink: link,
        })
    }

    render() {

        return (
            <div className="datalayer">
                <Row>
                    <Col xsOffset={10} xs={2}>
                        <Button onClick={this.handleModalChange.bind(this)} id="upload">
                            <span style={{ position: "relative", right: "5px", top: "1px" }} className="fa fa-upload"></span> Import
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Card
                            title={"DataLayer"}>
                            <ReactJson
                                src={dataLayer}
                                name={"dataLayer"}
                                collapsed={1}
                                collapseStringsAfterLength={20}/>
                        </Card>
                    </Col>
                </Row>
                <Modal show={this.state.showImportModal} onHide={this.handleModalChange.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Import from Google Spreadsheet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Col xs={9}>
                                <InputGroup>
                                    <InputGroup.Addon><span className="fa fa-link"></span></InputGroup.Addon>
                                    <FormControl
                                        value={this.state.spreadSheetLink}
                                        placeholder="https://docs.google.com/spreadsheets/"
                                        type="text"
                                        onChange={this.importLinkChange.bind(this)}/>
                                </InputGroup>
                            </Col>
                            <Col xs={3}>
                                <Button type="submit">Import</Button>
                            </Col>
                        </FormGroup>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
