import { useState, useRef } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getTodos, postTodo } from './endpoints/todoActions'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
       <Todos />
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
  )
}

function Todos() {
  const [ todo, setTodo ] = useState({
    title: ''
  })
  const inputRef = useRef()

  const handleOnChange = e => {
    const { name, value } = e.target 
    setTodo({...todo, [name]: value})
  }

  const { isLoading, error, data, isFetching } = useQuery('todos', getTodos)

  const queryClient = useQueryClient()

  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const addTodo = e => {
    e.preventDefault()
    mutation.mutate(todo)
    setTodo({title: ''})
    inputRef.current.value = ''
  }
  return (
    <div>
      <ul>
        { data ? 
        data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))
        :
        null}
      </ul>
      <div>{isFetching ? "Updating..." : ""}</div>
      <div>{isLoading ? "Loading..." : ""}</div>
      <div>{error ? "An error has occurred: " + error : ""}</div>
      <input 
        onChange={ handleOnChange } 
        name='title'
        value={ todo.title }
        ref={inputRef}
      />
      <button
        onClick={ addTodo }
      >
        Add Todo
      </button>
    </div>
  )
}


export default App

