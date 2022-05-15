const createTodo = (value, createTime, entered = false, mapped = false, index) => {
  let newTodo = document.createElement('div')
  let todoHeader = document.createElement('div')
  let todoList = document.createElement('ul')
  let time = document.createElement('li')
  let edit = document.createElement('li')
  let done = document.createElement('li')

  const timeOfTask = `${createTime}`.substr(16,8)

  const alreadyExistingTodos = JSON.parse(sessionStorage.getItem('todos'))  

  if (alreadyExistingTodos) {
    if (entered === true) {
      sessionStorage.setItem('todos', JSON.stringify([...alreadyExistingTodos, {value: value, time: timeOfTask, timeobj: createTime}]))
    } else {
      sessionStorage.setItem('todos', JSON.stringify([...alreadyExistingTodos]))
    }
  } else {
    sessionStorage.setItem('todos', JSON.stringify([{value: value, time: timeOfTask, timeobj: createTime}]))
  }
  
  todoHeader.innerHTML = value
  time.innerHTML = `${createTime}`.substr(16,8)
  if (mapped) {
    time.innerHTML = alreadyExistingTodos[index].time
  }
  edit.innerHTML = 'Edit'
  done.innerHTML = 'Done'

  time.classList.add('list-group-item')
  edit.classList.add('list-group-item')
  done.classList.add('list-group-item')
  todoHeader.classList.add('card-header')
  newTodo.classList.add('card')
  newTodo.style.width = '18rem'
  
  todoList.appendChild(time)
  todoList.appendChild(edit)
  todoList.appendChild(done)
  
  todoList.classList.add('list-group')
  todoList.classList.add('list-group-flush')
  
  newTodo.appendChild(todoHeader)
  newTodo.appendChild(todoList)

  todo.appendChild(newTodo)

  done.addEventListener('click', (e) => {
      let clickedOnTodo = e.path[2].childNodes[0].innerHTML
      e.path[2].remove()
      const storedTodos = JSON.parse(sessionStorage.getItem('todos'))  
      storedTodos.map((todo, index) => {
        if (storedTodos[index].value === clickedOnTodo) {
          let filteredTodos = storedTodos.filter((todoToRemove) => {
            return todoToRemove.value !== clickedOnTodo
          })
          sessionStorage.setItem('todos', JSON.stringify(filteredTodos))
        }
      })
  })

  edit.addEventListener('click', (e) => {
      let newMessage = prompt('Please Enter new message')

      let clickedOnTodo = e.path[2].childNodes[0].innerHTML
      
      console.log(clickedOnTodo)
      const storedTodos = JSON.parse(sessionStorage.getItem('todos'))
      console.log(storedTodos)
      storedTodos.map((todo, index) => {
        if (storedTodos[index].value === clickedOnTodo) {
          storedTodos[index].value = newMessage
          sessionStorage.setItem('todos', JSON.stringify(storedTodos))
        }
      })

      todoHeader.innerHTML = newMessage
  })
}

let form = document.getElementById('form')
let input = document.querySelector('.todoListInput')
let todo = document.querySelector('.todos')

const todos = JSON.parse(sessionStorage.getItem('todos'))

if (todos) {
  todos.map((todo, index) => {
    createTodo(todo.value, todo.timeobj, false, true, index)
  })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let value = input.value
    let createTime = new Date()
    let entered = true
    console.log(createTime)
   

    createTodo(value, createTime, entered)
})

// createTodo = (value, createTime, entered = false, mapped = false, index)