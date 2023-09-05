import { useState } from "react";
import './Todo.css'
function Todo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todoTasks, setTodoTasks] = useState([]);
    const [idCount, setIdCount] = useState(0)
    const [editId, setEditId] = useState()
    const [update, setUpdate] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [taskDone, setTaskDone] = useState()
    const [doneId , setDoneId]  = useState([])


    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };


    const handleEditTitle = (e) => {
        setEditTitle(e.target.value)
    }

    const handleEditDescription = (e) => {
        setEditDescription(e.target.value)

    }


    const updateTodo = (id) => {

        const toBeUpdated = todoTasks.filter((todo) => todo.id === id);
        setEditId(id)
        console.log("update: ", toBeUpdated)
        console.log("update: ", toBeUpdated[0].title)
        setUpdate(true)
        setEditTitle(toBeUpdated[0].title)
        setEditDescription(toBeUpdated[0].description)


    }
    const deleteTodo = (id) => {
        const afterDeleting = todoTasks.filter((todo) => todo.id !== id);
        setTodoTasks(afterDeleting);

    }


    const handleTaskDone = (id) => {
        console.log(id);
        setTaskDone(true)
        // Check if the task with the given id is already in the `doneId` array.
        if (!doneId.includes(id)) {
            // If not, add it to the `doneId` array.
            setDoneId([...doneId, id]);
        } else {
            // If it's already in the `doneId` array, remove it.
            setDoneId(doneId.filter((taskId) => taskId !== id));
        }
    
        console.log(doneId);
    }

    const saveUpdate = () => {
        const updateTask = { id: editId, title: editTitle, description: editDescription };


        if (updateTask.title.trim() === '' && updateTask.description.trim() === '') {
            alert('Please fill  title and description!');
            return;
        }

        todoTasks.forEach((todo) => {
            if (todo.id === editId) {
                todo.title = updateTask.title
                todo.description = updateTask.description
            }
        })
        setUpdate(false)


    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = { id: idCount, title: title, description: description };

        if (newTask.title.trim() === '' && newTask.description.trim() === '') {
            alert('Please fill  title and description!');
            return;
        }
        setTodoTasks([...todoTasks, newTask]);
        setIdCount(idCount + 1)
        setTitle('');
        setDescription('');
    };

    return (
        <>
            <div className="form">
                <h1> Todo List </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleTitle}
                        type="text"
                        value={title}
                        placeholder="Enter Title"

                    />
                    <br />
                    <textarea
                        onChange={handleDescription}
                        type="text"
                        value={description}
                        placeholder="Enter Description"
                    />
                    <br />
                    <button type="submit">Submit</button>
             
                </form>

            </div>
            <h2 className="todoh2">Todo Tasks:</h2>
            <ul>
                {todoTasks.map((todo) => (
                    <div key={todo.id} className="listDiv">
                        <div className="listOnly" style={{textDecoration: taskDone && doneId.includes(todo.id)  ?  'line-through' : 'none'  }} >
                        {update && editId === todo.id ? <> <input
                            onChange={handleEditTitle}
                            type="text"
                            value={editTitle}
                            placeholder="Enter Title"

                        />
                            <br />
                            <textarea
                                onChange={handleEditDescription}
                                type="text"
                                value={editDescription}
                                placeholder="Enter Description"
                            />
                            <br />
                        </> : <>
                            <li className="title">
                                {!todo.title ? <i>No Title Added</i> : todo.title}

                            </li>
                            <li className="description"
                                placeholder="Task Description"

                            >
                                {!todo.description ? <i>No Description Added</i> : todo.description}  </li>
                        </>
                        }
                        </div>
                        <div className="btnDiv">
                        <button type="submit"  className="delete btn"  onClick={() => deleteTodo(todo.id)}>Delete</button>
                        {update && editId === todo.id ? <button type="submit" className="save btn" onClick={() => saveUpdate()}>  Save  </button> :
                            <button type="submit" className="update btn" style={{ display : taskDone && doneId === todo.id ? 'none' : 'block'  }}  onClick={() => updateTodo(todo.id)}>  Edit  </button>}
                        <button type = 'submit' className="done btn" onClick={() => handleTaskDone(todo.id)} > {doneId.includes(todo.id) ? <> Undone</> :<> Done </> } </button>
                        </div>
                    </div>))}
            </ul>
        </>
    )
}

export default Todo
