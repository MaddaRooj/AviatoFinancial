const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/purchases/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/purchases`).then(e => e.json())
  },
  post(newPurchase) {
    return fetch(`${remoteURL}/purchases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPurchase)
    }).then(data => data.json())
  },
  editPurchase (editedPurchase) {
    return fetch(`${remoteURL}/purchases/${editedPurchase.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedPurchase)
    }).then(data => data.json());
  },
}