import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../actions/index";
import "./TodoTaskList.css";

function TodoTaskList() {
  const [editId, setEditId] = useState();
  const [update, setUpdate] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [taskDone, setTaskDone] = useState();
  const [doneId, setDoneId] = useState([]);
  const dispatch = useDispatch();

  const todoTasks = useSelector((state) => state.todoReducers.list);

  const handleEditTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditDescription = (e) => {
    setEditDescription(e.target.value);
  };

  const updateTodoFunc = (id) => {
    const toBeUpdated = todoTasks.filter((todo) => todo.id === id);
    setEditId(id);
    console.log("update: ", toBeUpdated);
    setUpdate(true);
    setEditTitle(toBeUpdated[0].data.title);
    setEditDescription(toBeUpdated[0].data.description);
  };
  const deleteTodoFunc = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleTaskDone = (id) => {
    console.log(id);
    setTaskDone(true);
    if (!doneId.includes(id)) setDoneId([...doneId, id]);
    else setDoneId(doneId.filter((taskId) => taskId !== id));

    console.log(doneId);
  };

  const saveUpdate = () => {
    const updateTask = {
      id: editId,
      title: editTitle,
      description: editDescription,
    };

    if (
      updateTask.title.trim() === "" &&
      updateTask.description.trim() === ""
    ) {
      alert("Please fill  title and description!");
      return;
    }

    dispatch(updateTodo(updateTask));

    setUpdate(false);
  };

  return (
    <>
      <h2 className="todoh2">Todo Tasks</h2>
      <div className="listsParent">
        <ul>
          {todoTasks?.map((todo) => (
            <div key={todo.id} className="listDiv">
              <div
                className="listOnly"
                style={{
                  textDecoration:
                    taskDone && doneId.includes(todo.id)
                      ? "line-through"
                      : "none",
                }}
              >
                {update && editId === todo.id ? (
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
                      {!todo.data.title ? (
                        <i>No Title Added</i>
                      ) : (
                        todo.data.title
                      )}
                    </li>
                    <li className="description" placeholder="Task Description">
                      {!todo.data.description ? (
                        <i>No Description Added</i>
                      ) : (
                        todo.data.description
                      )}{" "}
                    </li>
                  </>
                )}
              </div>
              <div className="btnDiv">
                <button
                  type="submit"
                  className="delete btn"
                  onClick={() => deleteTodoFunc(todo.id)}
                >
                  Delete
                </button>
                {update && editId === todo.id ? (
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
                        taskDone && doneId === todo.id ? "none" : "block",
                    }}
                    onClick={() => updateTodoFunc(todo.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="submit"
                  className="done btn"
                  onClick={() => handleTaskDone(todo.id)}
                >
                  {doneId.includes(todo.id) ? <> Undone</> : <> Done </>}{" "}
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
