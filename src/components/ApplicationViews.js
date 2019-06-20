import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import BudgetList from './budgets/BudgetList'
import BudgetManager from "../modules/BudgetManager"
import BudgetDetail from "./budgets/BudgetDetail"
import BudgetForm from "./budgets/BudgetForm"
import CategoryManager from "../modules/CategoryManager"
import PurchaseManager from "../modules/PurchaseManager"
import Home from "./home/Home"
import Login from './auth/Login';
import Register from './auth/Register';
import { getUserFromLocalStorage, logout } from './auth/UserManager';

class ApplicationViews extends Component {

  state = {
    budgets: [],
    categories: [],
    purchases: [],
    searchResults: [],
    user: getUserFromLocalStorage()
  }

  addBudget = budget =>
    BudgetManager.post(budget)
      .then(() => BudgetManager.getAll())
      .then(budgets =>
        this.setState({
          budgets: budgets
        })
      );

  updateBudget = editedBudgetObject => {
    const newState = {};
    BudgetManager.editBudget(editedBudgetObject)
      .then(() => BudgetManager.getAll())
      .then(budgets => (newState.budgets = budgets))
      .then(() => {
        this.setState(newState);
      });
  };

  updatePurchase = editedPurchaseObject => {
    const newState = {};
    PurchaseManager.editPurchase(editedPurchaseObject)
      .then(() => PurchaseManager.getAll())
      .then(purchases => (newState.purchases = purchases))
      .then(() => {
        this.setState(newState);
      });
  };

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

  deletePurchase = id => {
    return fetch(`http://localhost:5002/purchases/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/purchases`))
      .then(e => e.json())
      .then(purchases => {
        this.setState({ purchases: purchases })
      })
  }

  addPurchase = purchase =>
    PurchaseManager.post(purchase)
      .then(() => PurchaseManager.getAll())
      .then(purchases =>
        this.setState({
          purchases: purchases
        })
      );

  getSearchResults = input => {
    BudgetManager.search(input).then(results => {
      this.setState({ searchResults: results });
    });
  };

  componentDidMount() {
    const newState = {}
    BudgetManager.getAll()
      .then(budgets => newState.budgets = budgets)
      .then(() => CategoryManager.getAll().then(categories => newState.categories = categories))
      .then(() => PurchaseManager.getAll().then(purchases => newState.purchases = purchases))
      .then(() => this.setState(newState));
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />
        <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />
        <Route exact path="/" render={(props) => {
          return this.state.user ? (
            <Home {...props} user={this.state.user} purchases={this.state.purchases} onLogout={logout} />
          ) : (
              <Redirect to="/login" />
            )
        }} />
        <Route exact path="/budgets" render={(props) => {
          return this.state.user ? (
            <BudgetList {...props} searchResults={this.state.searchResults} getSearchResults={this.getSearchResults} user={this.state.user} deleteBudget={this.deleteBudget} purchases={this.state.purchases} budgets={this.state.budgets} />
          ) : (
              <Redirect to="/login" />
            )
        }} />
        <Route path="/budgets/new" render={(props) => {
          return <BudgetForm {...props}
            addBudget={this.addBudget}
            user={this.state.user}
            categories={this.state.categories} />
        }} />
        <Route path="/budgets/:budgetId(\d+)" render={(props) => {
          let budget = this.state.budgets.find(budget =>
            budget.id === parseInt(props.match.params.budgetId)
          )
          if (!budget) {
            budget = { id: 404, name: "404" }
          }
          return <BudgetDetail {...props} {...this.props} purchases={this.state.purchases} user={this.state.user} updatePurchase={this.updatePurchase} updateBudget={this.updateBudget} deletePurchase={this.deletePurchase} addPurchase={this.addPurchase} budget={budget}
            deleteBudget={this.deleteBudget} />
        }} />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)