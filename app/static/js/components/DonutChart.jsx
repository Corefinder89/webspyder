import React from "react"

import { isEqual } from "lodash"

import $ from "jquery"
import * as d3 from 'd3'
import {event as currentEvent} from 'd3'


export default class DonutChart extends React.Component {
    componentDidMount() {
        this.draw(this.props)
    }

    getShortHand(string) {
        return string.split(' ').map(x => {return x.charAt(0)}).join("")
    }

    componentWillReceiveProps(nextProps) {
        if (isEqual(this.props.data, nextProps.data)) {
            return
        }
        this.draw(nextProps)
    }

    draw(props) {
        let elementId = `#${props.id}`
        $(elementId).empty()

        this.height = props.height
        this.width = props.width

        let pie = d3.layout.pie()
        .value((d) => {
            return d.percent.toFixed(2)
        })
        .sort(null)
        .padAngle(.03)

        let outerRadius = this.width / 2
        let innerRadius = 100

        let color = d3.scale.category20()

        let arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)

        let svg = d3.select(elementId)
            .append("svg")
            .attr({
                width: this.width,
                height: this.height,
                class: 'shadow'
            }).append('g')
            .attr({
                transform: 'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
            })

        let path = svg.selectAll('path')
            .data(pie(props.data))
            .enter()
            .append('path')
            .attr({
                d: arc,
                fill: (d, i) => {
                    return color(d.data.name)
                }
            })

        path.transition()
            .duration(1000)
            .attrTween('d', (d) => {
                var interpolate = d3.interpolate({
                    startAngle: 0,
                    endAngle: 0
                }, d)
                return (t) => {
                    return arc(interpolate(t))
                }
            })

        let restOfTheData = () => {
            let text = svg.selectAll('text')
                .data(pie(props.data))
                .enter()
                .append("text")
                .transition()
                .duration(200)
                .attr("transform", (d) => {
                    return "translate(" + arc.centroid(d) + ")"
                })
                .attr("dy", ".4em")
                .attr("text-anchor", "middle")
                .text((d) => {
                    return d.data.percent.toFixed(2) + "%"
                })
                .style({
                    fill: '#fff',
                    'font-size': '10px'
                })

                var legendRectSize=20;
                var legendSpacing=7;
                var legendHeight=legendRectSize+legendSpacing;
             
             
                let legend=svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr({
                        class:'legend',
                        transform: (d,i) => {
                            //Just a calculation for x & y position
                            return 'translate(-55,' + ((i*legendHeight)-55) + ')'
                        }
                    })

                legend.append('rect')
                    .attr({
                        width: 15,
                        height: 15,
                        rx: 15,
                        ry: 15
                    })
                    .style({
                        fill:color,
                        stroke:color
                    })
             
                legend.append('text')
                    .attr({
                        x: 25,
                        y: 12
                    })
                    .text((d) => {
                        if (d.split(' ').length > 2) {
                            return this.getShortHand(d)
                        }
                        return d
                    }).style({
                        fill:'#929DAF',
                        'font-size':'12px',
                    })
        }

        setTimeout(restOfTheData, 1000)
    }

    render() {
        return (
            <div className="donut-chart" {...this.props} id={this.props.id} style={{ textAlign: "center" }}/>
        )
    }
}

DonutChart.defaultProps = {
    id: "donut-chart",
    width: 300,
    height: 300,
}
