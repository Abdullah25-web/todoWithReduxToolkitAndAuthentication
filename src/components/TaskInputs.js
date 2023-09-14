import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../redux/slice/todo"; // Import your action here
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";

const TaskInputs = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    const taskData = {
      name: task,
      completed: false,
    };
    // if (task.trim() !== "") {
    dispatch(postTodo(taskData));
    setTask(""); // Clear the input field after adding the task
    // }
  };

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={handleInputChange}
        className="input"
        style={{ backgroundColor: "lightblue" }}
      />
      <Button
        onClick={handleAddTask}
        variant="success"
        style={{
          backgroundColor: "	#4169E1",
          color: "white",
          borderWidth: 0,
          borderRadius: 5,
          height: 35,
          width: 50,
        }}
      >
        ADD
      </Button>
    </div>
  );
};

export default TaskInputs;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTask } from "../action";
// import Button from "react-bootstrap/Button";
// import { FaPlus } from "react-icons/fa";

// const TaskInputs = () => {
//   const dispatch = useDispatch();
//   const [task, setTask] = useState("");

//   const handleInputChange = (event) => {
//     setTask(event.target.value);
//   };

//   const handleAddTask = () => {
//     if (task.trim() !== "") {
//       dispatch(addTask(task));
//       setTask("");
//     }
//   };

//   return (
//     <div className="main">
//       <input
//         type="text"
//         placeholder="Enter a task"
//         value={task}
//         onChange={handleInputChange}
//         className="input"
//       />
//       <Button onClick={handleAddTask} className="addbtn" variant="success">
//         <FaPlus className="add" />
//       </Button>
//     </div>
//   );
// };

// export default TaskInputs;
