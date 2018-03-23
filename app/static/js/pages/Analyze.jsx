import React from "react"

import {
    Row,
    Col,
    Carousel
} from "react-bootstrap"

import Card from "../components/Card"
import WeightedTreeChart from "../components/WeightedTreeChart"
import DonutChart from "../components/DonutChart"

import weightedTreeData from "../data/weighted-tree"


export default class Analyze extends React.Component {
    constructor(...args) {
        super(...args)

        this.pieTitles = [
            "Time Performance",
            "Size Performance",
            "Overall Page Performance"
        ]

        this.state = {
            index: 0,
            pieTitle: this.pieTitles[0],
        }
    }

    handleSelect(selectedIndex) {
        this.setState({
            index: selectedIndex,
            pieTitle: this.pieTitles[selectedIndex],
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Card
                            title={"Libraries"}>
                            <WeightedTreeChart
                                data={weightedTreeData}/>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <Card
                            title={this.state.pieTitle}>
                            <Carousel
                                activeIndex={this.state.index}
                                onSelect={this.handleSelect.bind(this)}
                                wrap={false}
                                nextIcon={<span className="fa fa-angle-right"/>}
                                prevIcon={<span className="fa fa-angle-left"/>}>
                                <Carousel.Item>
                                    <DonutChart
                                        id={"s-1"}
                                        data={[{
                                            name: 'IE',
                                            percent: 39.10
                                        }, {
                                            name: 'Chrome',
                                            percent: 32.51
                                        }, {
                                            name: 'Safari',
                                            percent: 13.68
                                        }, {
                                            name: 'Firefox',
                                            percent: 8.71
                                        }, {
                                            name: 'Ithers',
                                            percent: 6.01
                                        }]}/>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <DonutChart
                                        id={"s-2"}
                                        data={[{
                                            name: 'IE',
                                            percent: 38.10
                                        }, {
                                            name: 'Chrome',
                                            percent: 33.51
                                        }, {
                                            name: 'Safari',
                                            percent: 13.68
                                        }, {
                                            name: 'Firefox',
                                            percent: 8.71
                                        }, {
                                            name: 'Ithers',
                                            percent: 6.01
                                        }]}/>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <DonutChart
                                        id={"s-3"}
                                        data={[{
                                            name: 'IE',
                                            percent: 39.10
                                        }, {
                                            name: 'Chrome',
                                            percent: 32.51
                                        }, {
                                            name: 'Safari',
                                            percent: 13.68
                                        }, {
                                            name: 'Firefox',
                                            percent: 8.71
                                        }, {
                                            name: 'Ithers',
                                            percent: 6.01
                                        }]}/>
                                </Carousel.Item>
                            </Carousel>
                        </Card>
                    </Col>
                    <Col xs={7}>
                        <Card
                            title={"Console Logs"}>
                            Google
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Card
                            title={"Recommendations"}>
                            Google
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
