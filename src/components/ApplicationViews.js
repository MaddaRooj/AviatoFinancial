import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import BudgetList from './budgets/BudgetList'
import BudgetManager from "../modules/BudgetManager"
import BudgetDetail from "./budgets/BudgetDetail"
import BudgetForm from "./budgets/BudgetForm"
import CategoryManager from "../modules/CategoryManager"
import Home from "./home/Home"
import Login from './auth/Login';
import Register from './auth/Register';
import { getUserFromLocalStorage, logout } from './auth/UserManager';


class ApplicationViews extends Component {

  state = {
    budgets: [],
    categories: [],
    user: getUserFromLocalStorage()
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  deleteBudget = id => {
    return fetch(`http://localhost:5002/budgets/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/budgets`))
      .then(e => e.json())
      .then(budgets => {
        this.props.history.push("/budgets");
        this.setState({ budgets: budgets })
      })
  }

  addBudget = budget =>
    BudgetManager.post(budget)
      .then(() => BudgetManager.getAll())
      .then(budgets =>
        this.setState({
          budgets: budgets
        })
      );

  componentDidMount() {
    const newState = {}

    BudgetManager.getAll()
      .then(budgets => newState.budgets = budgets)
      .then(() => CategoryManager.getAll().then(categories => newState.categories = categories))
      .then(() => this.setState(newState));
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />
        <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />
        <Route exact path="/" render={(props) => {
          return this.state.user ? (
            <Home {...props} user={this.state.user} onLogout={logout} />
          ) : (
              <Redirect to="/login" />
            )
        }} />
        {/* <Route exact path="/" render={(props) => {
          return <Home />
        }} /> */}
        <Route exact path="/budgets" render={(props) => {
          return this.state.user ? (
            <BudgetList {...props} deleteBudget={this.deleteBudget} budgets={this.state.budgets} />
          ) : (
              <Redirect to="/login" />
            )
        }} />
        <Route path="/budgets/new" render={(props) => {
          return <BudgetForm {...props}
            addBudget={this.addBudget}
            categories={this.state.categories} />
        }} />
        <Route path="/budgets/:budgetId(\d+)" render={(props) => {
          let budget = this.state.budgets.find(budget =>
            budget.id === parseInt(props.match.params.budgetId)
          )
          if (!budget) {
            budget = { id: 404, name: "404" }
          }
          return <BudgetDetail budget={budget}
            deleteBudget={this.deleteBudget} />
        }} />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)