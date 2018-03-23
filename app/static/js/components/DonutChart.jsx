import React from "react"

import $ from "jquery"
import * as d3 from 'd3'


export default class DonutChart extends React.Component {
    componentDidMount() {
        this.draw(this.props)
    }

    draw(props) {
        let elementId = `#${props.id}`
        $(elementId).empty()

        this.height = props.height
        this.width = props.width

        let pie = d3.layout.pie()
        .value((d) => {
            return d.percent
        })
        .sort(null)
        .padAngle(.03)

        let outerRadius = this.width / 2
        let innerRadius = 70

        let color = d3.scale.category10()

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
                    return d.data.percent + "%"
                })
                .style({
                    fill: '#fff',
                    'font-size': '10px'
                })
        }

        setTimeout(restOfTheData, 1000)
    }

    render() {
        return (
            <div {...this.props} id={this.props.id} style={{ textAlign: "center" }}/>
        )
    }
}

DonutChart.defaultProps = {
    id: "donut-chart",
    width: 300,
    height: 300,
}
