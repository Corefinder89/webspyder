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

import NoData from "../components/NoData"

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
        },
        // {
        //     label: "Overall Page Performance",
        //     name: "overall"
        // }
    ]

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

        let weightedTree = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.libraries ? (
            <WeightedTreeChart
                data={this.props.stats.currentStats.libraries}/>
        ) : <NoData/>

        let performanceCharts = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.performance ? (
            this.pieTitles.map((pie, index) => {
                return (
                    <Carousel.Item key={index}>
                        <DonutChart
                            id={`pie-chart-${index}`}
                            data={this.props.stats.currentStats.performance[pie.name]}/>
                    </Carousel.Item>
                )
            })
        ) : <NoData/>

        let consoleData = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.console ? (
            <Console
                data={this.props.stats.currentStats.console}/>
        ) : <NoData/>

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Card
                            title={"Libraries"}>
                            {weightedTree}
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
                            {consoleData}
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
