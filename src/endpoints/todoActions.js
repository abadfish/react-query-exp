const headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const getTodos = () => {
  return fetch("http://localhost:3001/api/todos")
  .then(res => res.json())
}

export const postTodo = (todo) => {
  const request = {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ todo })
  }
  return fetch("http://localhost:3001/api/todos", request)
  .then(res => res.json())
}