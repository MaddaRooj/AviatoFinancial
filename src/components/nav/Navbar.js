import React, { Component } from "react"
import { Link } from "react-router-dom"
import {FaAviato} from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css"


class NavBar extends Component {
    render() {
        return (
            <nav style={{backgroundColor: "#3A4660"}} className="navbar fixed-top flex-md-nowrap p-2 shadow">
                <span className="navbar-brand ml-3">
                    <Link className="navbar-brand" to="/"><FaAviato className="mr-1" size="3.5rem"/>Aviato Financial</Link>
                </span>
                <ul style={{fontSize: "20px"}} className="nav nav-pills d-flex flex-reverse mr-1">
                    <li className="nav-item mr-4">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item mr-4">
                        <Link className="nav-link" to="/budgets">Budgets</Link>
                    </li>
                    <li className="nav-item mr-4">
                        <Link className="nav-link" to="/budgets">Investor Chat</Link>
                    </li>
                    <li className="nav-item mr-4">
                        <Link className="nav-link" to="/budgets">Stocks</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={() => localStorage.clear()} to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar