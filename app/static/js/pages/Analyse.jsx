import React from "react"

import { connect } from "react-redux"

import {
    Row,
    Col,
    Carousel
} from "react-bootstrap"

import Card from "../components/Card"
import WeightedTreeChart from "../components/WeightedTreeChart"
import DonutChart from "../components/DonutChart"
import Console from "../components/Console"
import Recommendation from "../components/Recommendation"

import weightedTreeData from "../data/weighted-tree"
import performanceData from "../data/donut-chart"
import consoleData from "../data/console"
import recommendationData from "../data/recommendation"

import actions from "../redux/actions"


@connect((state) => state)
export default class Analyse extends React.Component {
    constructor(...args) {
        super(...args)

        this.pieTitles = [{
            label: "Time Performance",
            name: "time"
        }, {
            label: "Size Performance",
            name: "size"
        }, {
            label: "Overall Page Performance",
            name: "overall"
        }]

        this.state = {
            index: 0,
            pieTitle: this.pieTitles[0].label,
        }
    }

    componentWillMount() {
        if (!this.props.sidebar.selectedMode) {
            let currentMode = this.props.location.pathname.substr(1)

            let { dispatch } = this.props
            dispatch(actions.selectMode(currentMode))

            dispatch(actions.getStats(this.props.link.currentLink, currentMode))
        }
    }

    handleCarouselSelect(selectedIndex) {
        this.setState({
            index: selectedIndex,
            pieTitle: this.pieTitles[selectedIndex].label,
        })
    }

    render() {
        let performanceCharts = this.pieTitles.map((pie, index) => {
            return (
                <Carousel.Item key={index}>
                    <DonutChart
                        id={`pie-chart-${index}`}
                        data={performanceData[pie.name]}/>
                </Carousel.Item>
            )
        })

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
                                onSelect={this.handleCarouselSelect.bind(this)}
                                wrap={false}
                                nextIcon={<span className="fa fa-angle-right"/>}
                                prevIcon={<span className="fa fa-angle-left"/>}>
                                {performanceCharts}
                            </Carousel>
                        </Card>
                    </Col>
                    <Col xs={7}>
                        <Card
                            title={"Console Logs"}>
                            <Console
                                data={consoleData}/>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Card
                            title={"Recommendations"}>
                            <Recommendation
                                data={recommendationData}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
