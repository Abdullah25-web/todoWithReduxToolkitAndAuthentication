import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  updateTask,
  markTaskComplete,
} from "../redux/slice/todo";
import Modal from "react-modal";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const openModal = (_id) => {
    const task = tasks.find((task) => task._id === _id);

    if (task) {
      setEditedText(task.name);
      setEditedDescription(task.description);
      setEditedTaskId(_id);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditedText("");
    setEditedTaskId(null);
  };

  const handleEditSave = async () => {
    if (editedTaskId !== null) {
      const taskData = {
        id: editedTaskId,
        name: editedText,
        description: editedDescription,
      };

      try {
        await dispatch(updateTask(taskData)); //updating task

        await dispatch(fetchTodos()); //fetching all tasks after updating
        closeModal();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const token = localStorage.getItem("token");

  const handleTaskDelete = (_id) => {
    console.log({ tokenFromDispatch: token });
    dispatch(deleteTodo(_id));
  };

  const handleTaskComplete = (_id) => {
    const taskToComplete = tasks.find((task) => task._id === _id);

    if (taskToComplete) {
      const markDone = {
        id: taskToComplete._id,
      };
      dispatch(markTaskComplete(markDone));
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedTasks = tasks.slice().sort((taskA, taskB) => {
    if (sortOrder === "asc") {
      // Sort in ascending order
      if (taskA.completed && !taskB.completed) {
        return -1;
      } else if (!taskA.completed && taskB.completed) {
        return 1;
      } else {
        return 0;
      }
    } else if (sortOrder === "desc") {
      // Sort in descending order
      if (taskA.completed && !taskB.completed) {
        return 1;
      } else if (!taskA.completed && taskB.completed) {
        return -1;
      } else {
        return 0;
      }
    } else {
      // No sorting
      return 0;
    }
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <button onClick={toggleSortOrder} className="rounded-button btn">
          {sortOrder === "asc"
            ? "show Incomplete"
            : sortOrder === "desc"
            ? "show Completed"
            : "show Completed"}
        </button>
      </div>
      <div className="center-container">
        <ul className="task-list">
          {sortedTasks.length > 0 &&
            sortedTasks.map((task) => (
              <li key={task._id} className="task-item">
                <span
                  className={`task-name ${
                    task.completed ? "completed-task" : ""
                  }`}
                  style={{ marginRight: 50 }}
                >
                  <b> {task.name} </b>
                  <br />
                  {task.description}
                </span>
                <div className="button-container">
                  <button
                    className="editbtn btn"
                    style={{
                      color: "white",
                      backgroundColor: "#4169E1",
                      borderRadius: 5,
                      borderWidth: 0,
                      height: 35,
                      width: 60,
                    }}
                    onClick={() => openModal(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="deletebtn btn"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: 5,
                      borderWidth: 0,
                      height: 35,
                      width: 60,
                    }}
                    onClick={() => handleTaskDelete(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="completebtn btn"
                    onClick={() => handleTaskComplete(task._id)}
                    style={{
                      backgroundColor: task.completed ? "gray" : "green",
                      color: "white",
                      borderRadius: 5,
                      borderWidth: 0,
                      height: 35,
                      width: 60,
                    }}
                  >
                    {task.completed ? "Done" : "Done"}
                  </button>
                </div>
              </li>
            ))}
        </ul>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Task"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
            content: {
              width: "398px",
              height: "400px",
              margin: "auto",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            },
          }}
        >
          <div className="modalcontainer">
            <div>
              <h2>Edit Task</h2>
            </div>
            <div style={{ margin: "43px 0" }}>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="input"
                style={{ width: "90%" }}
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="input"
                style={{ width: "90%" }}
              />
            </div>
            <br />
            <button className="savebtn btn" onClick={handleEditSave}>
              Save
            </button>
            <button className="cancelbtn btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TaskList;
