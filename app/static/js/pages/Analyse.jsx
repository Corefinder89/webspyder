import React from "react"

import { connect } from "react-redux"

import {
    Row,
    Col,
    Carousel
} from "react-bootstrap"

import ReactJson from 'react-json-view'

import Card from "../components/Card"
import WeightedTreeChart from "../components/WeightedTreeChart"
import DonutChart from "../components/DonutChart"
import Console from "../components/Console"
import Collect from "../components/Collect"
import Recommendation from "../components/Recommendation"

import NoData from "../components/NoData"

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

        let weightedTree = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.libraries && this.props.stats.currentStats.libraries.children.length > 0 ? (
            <WeightedTreeChart
                data={this.props.stats.currentStats.libraries}/>
        ) : <NoData name={"libraries"}/>

        let performanceCharts = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.performance ? (
            this.pieTitles.map((pie, index) => {
                let chart = <NoData key={index}/>

                if (this.props.stats.currentStats.performance[pie.name].length > 0) {
                    chart = (
                        <DonutChart
                            id={`pie-chart-${index}`}
                            data={this.props.stats.currentStats.performance[pie.name]}/>
                    )
                }

                return (
                    <Carousel.Item style={{ height: "306px" }} key={index}>
                        {chart}
                    </Carousel.Item>
                )
            })
        ) : <NoData name={"performance data"}/>

        let consoleData = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.console ? (
            <Console
                data={this.props.stats.currentStats.console}/>
        ) : <NoData name={"console logs"}/>

        let collectData = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.collect && this.props.stats.currentStats.collect.length > 0 ? (
            <Collect
                data={this.props.stats.currentStats.collect}/>
        ) : <NoData style={{ height: "306px" }} name={"collect requests"}/>

        let cookiesData = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.cookies && this.props.stats.currentStats.cookies.filter(d => d).length > 0 ? (
            <div style={{ overflowX: "auto", height: "306px" }}>
                {this.props.stats.currentStats.cookies.filter(d => d).map((d, index) => {
                    return (
                        <ReactJson
                            src={d}
                            key={index}
                            name={d.name}
                            collapsed={1}
                            enableClipboard={false}
                            displayDataTypes={false}
                            collapseStringsAfterLength={20}/>
                    )
                })}
            </div>
        ) : <NoData name={"analytics cookies"}/>

        let recommendationData = this.props.stats && this.props.stats.currentStats && this.props.stats.currentStats.recommendations && this.props.stats.currentStats.recommendations.length > 0 ? (
            <Recommendation
                data={this.props.stats.currentStats.recommendations}/>
        ) : <NoData name={"recommendations"}/>

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
                    <Col xs={12} lg={5}>
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
                    <Col xs={12} lg={7}>
                        <Card
                            title={"Console Logs"}>
                            {consoleData}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Card
                            title={"Analytics Collect Requests"}>
                            {collectData}
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card
                            title={"Analytics Cookies"}>
                            {cookiesData}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Card
                            title={"Recommendations"}>
                            {recommendationData}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
