import React from "react"

import { isEqual } from "lodash"

import $ from "jquery"
import * as d3 from 'd3'


export default class WeightedTreeChart extends React.Component {
    componentDidMount() {
        this.draw(this.props)
    }

    draw(props) {
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom
        this.width = this.props.width - this.props.margin.right - this.props.margin.left

        let elementId = `#${props.id}`

        $(elementId).empty()

        this.svg = d3.select(elementId)
            .append("svg")
            .attr("width", this.width + props.margin.right + props.margin.left)
            .attr("height", this.height + props.margin.top + props.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")


        this.root = props.data
        this.root.x0 = this.height / 2
        this.root.y0 = 0

        this.tree = d3.layout.tree()
            .size([ this.height, this.width ])

        this.diagonal = d3.svg.diagonal()
            .projection((d) => {
                return [ d.y, d.x ]
            })

        this.edgeWeight = d3.scale.linear()
            .domain([ 0, 100 ])
            .range([ 0, 100 ])

        this.edgeWeight.domain([ 0, props.data.size ])

        this.idCount = 0
        this.root.children.forEach(this.collapse.bind(this))
        d3.select(self.frameElement).style("height", "800px")

        this.update(this.root)
    }

    update(source) {
        let duration = 750 // animation duration

        // Compute the new tree layout.
        let nodes = this.tree.nodes(this.root).reverse()
        let links = this.tree.links(nodes)

        // Normalize for fixed-depth.
        nodes.forEach((d) => {
            d.y = d.depth * 180
        })

        // Update the nodes
        let node = this.svg.selectAll("g.node")
            .data(nodes, (d) => {
                return d.id || (d.id = ++this.idCount)
            })

        // Enter any new nodes at the parent's previous position.
        let nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", () => {
                return "translate(" + source.y0 + "," + source.x0 + ")"
            })
            .on("click", (d) => {
                return this.click(d)
            })

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", (d) => {
                return d._children ? "lightsteelblue" : "#fff"
            })
            .style("stroke", "steelblue")
            .style("stroke-width", "1.5px")

        nodeEnter.append("text")
            .attr("x", (d) => {
                return d.children || d._children ? 80 : 10
            })
            .attr("font-size", (d) => {
                return d.children || d._children ? "12px" : "16px"
            })
            .attr("alt", (d) => {
                return d.key
            })
            .attr("dy", ".35em")
            .attr("dx", "0.5em")
            .attr("text-anchor", (d) => {
                return d.children || d._children ? "end" : "start"
            })
            .text((d) => {
                return d.key
            })
            .style("fill-opacity", 1e-6)

        // Transition nodes to their new position.
        let nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", (d) => {
                return "translate(" + d.y + "," + d.x + ")"
            })

        nodeUpdate.select("circle")
            .attr("r", (d) => {
                return this.edgeWeight(Math.max(d.size * 0.75, 10))
            })
            .style("fill", (d) => {
                return d._children ? "lightsteelblue" : "#fff"
            })

        nodeUpdate.select("text")
            .style("fill-opacity", 1)

        // Transition exiting nodes to the parent's new position.
        let nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", () => {
                return "translate(" + source.y + "," + source.x + ")"
            })
            .remove()

        nodeExit.select("circle")
            .attr("r", 1e-6)

        nodeExit.select("text")
            .style("fill-opacity", 1e-6)

        // Update the links
        let link = this.svg.selectAll("path.link")
            .data(links, (d) => {
                return d.target.id
            })

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("stroke-width", () => {
                return 1
            })
            .attr("d", () => {
                const o = { x: source.x0, y: source.y0 }
                return this.diagonal({ source: o, target: o })
            })
            .attr("stroke", (d) => {
                return d3.scale.category20().domain(d3.range(0,20))(d.target.root)
            })

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", (d) => {
                /* calculating the top shift */
                const source = { x: d.source.x - this.edgeWeight(this.calculateLinkSourcePosition(d)), y: d.source.y }
                const target = { x: d.target.x, y: d.target.y }
                return this.diagonal({ source: source, target: target })
            })
            .attr("stroke-width", (d) => {
                return this.edgeWeight(Math.max(d.target.size, 10))
            })

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", () => {
                const o = { x: source.x, y: source.y }
                return this.diagonal({ source: o, target: o })
            })
            .remove()

        // Stash the old positions for transition.
        nodes.forEach((d) => {
            d.x0 = d.x
            d.y0 = d.y
        })

    }

    calculateLinkSourcePosition(link) {
        let targetID = link.target.id
        let childrenNumber = link.source.children.length
        let widthAbove = 0
        for (let i = 0; i < childrenNumber; i++) {
            if (link.source.children[ i ].id === targetID) {
                // we are done
                widthAbove = widthAbove + link.source.children[ i ].size / 2
                break
            } else {
                // keep adding
                widthAbove = widthAbove + link.source.children[ i ].size
            }
        }
        return link.source.size / 2 - widthAbove
    }

    click(d) {
        if (d.children) {
            d._children = d.children
            d.children = null
        } else {
            d.children = d._children
            d._children = null
        }

        this.update(d)
    }


    collapse(d) {
        if (d.children) {
            d._children = d.children
            d._children.forEach(this.collapse.bind(this))
            d.children = null
        }
    }

    collapseAll() {
        this.root.children.forEach(this.collapse.bind(this))
        this.update(this.root)
    }

    expand(d) {
        if (d._children) {
            d.children = d._children
            d._children = null
        }
        if (d.children) {
            d.children.forEach(this.expand)
        }
    }

    expandAll() {
        this.root.children.forEach(this.expand.bind(this))
        this.update(this.root)
    }

    componentWillReceiveProps(nextProps) {
        if (isEqual(this.props.data, nextProps.data)) {
            return
        }
        this.draw(nextProps)
    }

    render() {
        return (
            <div id={this.props.id} style={{ overflowY: "auto", marginLeft: "150px" }}/>
        )
    }
}

WeightedTreeChart.defaultProps = {
    id: "weighted-tree-chart",
    width: 1000,
    height: 500,
    margin: {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120,
    },
}
