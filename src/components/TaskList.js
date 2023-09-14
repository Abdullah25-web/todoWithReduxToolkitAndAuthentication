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
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  // const [filterOption, setFilterOption] = useState("all");

  // Use useEffect to fetch tasks when tasks are deleted etc
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const openModal = (_id) => {
    const task = tasks.find((task) => task._id === _id);

    if (task) {
      setEditedText(task.name);
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
        // name: taskToComplete.name
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

  // const filterTasks = tasks.filter((task) => {
  //   if (filterOption === "all") {
  //     return true;
  //   } else if (filterOption === "completed") {
  //     return task.completed;
  //   } else {
  //     return !task.completed;
  //   }
  // });

  // const toggleFilterOption = () => {
  //   if (filterOption === "all") {
  //     setFilterOption("completed");
  //   } else if (filterOption === "completed") {
  //     setFilterOption("incomplete");
  //   } else {
  //     setFilterOption("all");
  //   }
  // };

  // const handleTaskComplete = (_id) => {
  //   const taskToComplete = tasks.find((task) => task._id === _id);

  //   console.warn("task to Comp: ", taskToComplete);

  //   if (taskToComplete) {
  //     const updatedTask = {
  //       name: taskToComplete.name,
  //       completed: true, // Toggle the completed status
  //     };
  //     console.warn("task to Comp Affter: ", taskToComplete);

  //     // Dispatch the updated task to mark it as complete or incomplete
  //     dispatch(markTaskComplete({ id: _id, ...updatedTask }));
  //   }
  // };

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
        <button onClick={toggleSortOrder} className="rounded-button">
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
                  // className={task.completed ? "completed-task" : ""}
                  className={`task-name ${
                    task.completed ? "completed-task" : ""
                  }`}
                  style={{ marginRight: 50 }}
                >
                  {task.completed ? task.name : task.name}
                </span>
                <div className="button-container">
                  <button
                    // className="editbtn"
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
                    // className="deletebtn"
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
                    // className="completebtn"
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
        >
          <div className="modalcontainer">
            <div>
              <h2>Edit Task</h2>
            </div>
            <div>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="input"
                style={{ width: "90%" }}
              />
            </div>
            <br />
            <button className="savebtn" onClick={handleEditSave}>
              Save
            </button>
            <button className="cancelbtn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TaskList;
