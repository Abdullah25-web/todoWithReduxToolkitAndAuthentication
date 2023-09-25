import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { , updateTodo } from "../actions/index";
import "./TodoTaskList.css";
import {
  fetchTodos,
  deleteTodo,
  updateTodo,
  markTaskComplete,
} from "../Slice/todosSlice";

function TodoTaskList() {
  const [editId, setEditId] = useState();
  const [update, setUpdate] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [taskDone, setTaskDone] = useState();
  const [doneId, setDoneId] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todoTasks = useSelector((state) => state.tasks);

  const handleEditTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditDescription = (e) => {
    setEditDescription(e.target.value);
  };

  const updateTodoFunc = (id) => {
    const toBeUpdated = todoTasks.filter((todo) => todo._id === id);
    setEditId(id);
    console.log("update: ", toBeUpdated);
    setUpdate(true);
    setEditTitle(toBeUpdated[0].title);
    setEditDescription(toBeUpdated[0].description);
  };

  const saveUpdate = () => {
    if (editTitle.trim() === "" && editDescription.trim() === "") {
      alert("Please fill  title and description!");
      return;
    }

    dispatch(
      updateTodo({ id: editId, title: editTitle, description: editDescription })
    );

    setUpdate(false);
  };

  const deleteTodoFunc = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleTaskDone = (id) => {
    console.log(id);
    setTaskDone(true);
    if (!doneId.includes(id)) setDoneId([...doneId, id]);
    else setDoneId(doneId.filter((taskId) => taskId !== id));

    dispatch(markTaskComplete(id));

    console.log(doneId);
  };

  return (
    <>
      <h2 className="todoh2">Todo Tasks</h2>
      <div className="listsParent">
        <ul>
          {todoTasks?.map((todo) => (
            <div key={todo._id} className="listDiv">
              <div
                className="listOnly"
                style={{
                  textDecoration:
                    taskDone && doneId.includes(todo._id)
                      ? "line-through"
                      : "none",
                }}
              >
                {update && editId === todo._id ? (
                  <>
                    {" "}
                    <input
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
                  </>
                ) : (
                  <>
                    <li className="title">
                      {!todo.title ? <i>No Title Added</i> : todo.title}
                    </li>
                    <li className="description" placeholder="Task Description">
                      {!todo.description ? (
                        <i>No Description Added</i>
                      ) : (
                        todo.description
                      )}{" "}
                    </li>
                  </>
                )}
              </div>
              <div className="btnDiv">
                <button
                  type="submit"
                  className="delete btn"
                  onClick={() => deleteTodoFunc(todo._id)}
                >
                  Delete
                </button>
                {update && editId === todo._id ? (
                  <button
                    type="submit"
                    className="save btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveUpdate();
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="edit btn"
                    style={{
                      display:
                        taskDone && doneId === todo._id ? "none" : "block",
                    }}
                    onClick={() => updateTodoFunc(todo._id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="submit"
                  className="done btn"
                  onClick={() => handleTaskDone(todo._id)}
                >
                  {doneId.includes(todo._id) ? <> Undone</> : <> Done </>}{" "}
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoTaskList;
