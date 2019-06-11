const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/categories/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/categories`).then(e => e.json())
  }
}