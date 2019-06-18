const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/budgets/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/budgets`).then(e => e.json())
  },
  post(newBudget) {
    return fetch(`${remoteURL}/budgets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBudget)
    }).then(data => data.json())
  },
  editBudget (editedBudget) {
    return fetch(`${remoteURL}/budgets/${editedBudget.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedBudget)
    }).then(data => data.json());
  },
  search(input) {
    return fetch(`${remoteURL}/budgets?name_like=${input}`).then(e => e.json());
  }
}