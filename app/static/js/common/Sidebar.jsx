import React from 'react';

import { connect } from "react-redux"

import classnames from "classnames"

import actions from "../redux/actions"


@connect((state) => state)
export default class Sidebar extends React.Component {
    constructor(...args) {
        super(...args)

        this.fields = [{
            label: "desktop",
            name: "Desktop",
            icon: "fa fa-tv",
            iconFontSize: 24,
        }, {
            label: "mobile",
            name: "Mobile",
            icon: "fa fa-mobile",
            iconFontSize: 32,
        }]
    }

    onChangeSidebarLink(mode) {
        let { dispatch } = this.props

        dispatch(actions.selectMode(mode))

        dispatch(actions.getStats(this.props.link.currentLink, mode))
    }

    render() {
        let sidebarFields = this.fields.map((field, index) => {
            return (
                <li onClick={() => {
                    this.onChangeSidebarLink(field.label)
                }} key={index}>
                    <a className={classnames({active: this.props.sidebar.selectedMode === field.label})} href={`/#/${field.label}`}>
                        <span style={{ fontSize: `${field.iconFontSize}px`, position: "relative", right: "10px", top: "3px" }} className={field.icon}/> {field.name}
                    </a>
                </li>
            )
        })

        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <a href="/">
                        <img style={{ position: "relative", top: "-2px", left: "30px" }} src={"/static/images/logo.png"} width={"40"}/>
                        <h3 style={{display: "inline-block", marginLeft: "40px"}}>Web Spyder</h3>
                    </a>
                </div>

                <ul className="list-unstyled components">
                    {sidebarFields}
                    <li id="copyright">
                        &copy; NameNotFoundException
                    </li>
                </ul>
            </nav>
        )
    }
}
