import React from 'react';


export default class Sidebar extends React.Component {
    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <a href="/">
                        <img style={{ position: "relative", top: "-2px", left: "30px" }} src={"/static/images/logo.png"} width={"40"}/>
                        <h3 style={{display: "inline-block", marginLeft: "40px"}}>Web Spyder</h3>
                    </a>
                </div>

                <ul className="list-unstyled components">
                    <li className="active"><a href="#">
                        <span style={{ fontSize: "20px", position: "relative", right: "10px", top: "1px" }} className="fa fa-tv"/> Desktop
                    </a></li>
                    <li className="active"><a href="#">
                        <span style={{ fontSize: "28px", position: "relative", right: "10px", top: "3px" }} className="fa fa-mobile"/> Mobile
                    </a></li>
                    <li id="copyright">
                        &copy; NameNotFoundException
                    </li>
                </ul>
            </nav>
        )
    }
}
