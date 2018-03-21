import React from 'react';

import {
    Row,
    Col,
    Button,
    FormGroup,
    InputGroup,
    FormControl,
} from "react-bootstrap"


export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Row>
                    <Col xs={10}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon><span className="fa fa-globe"></span></InputGroup.Addon>
                                <FormControl placeholder="https://www.datalcious.com" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs={2}>
                        <Button>Analyse</Button>
                    </Col>
                </Row>
            </header>
        )
    }
}
