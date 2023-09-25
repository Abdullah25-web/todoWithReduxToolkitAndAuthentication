import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Define the async action to fetch todos
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  // const response = await fetch("http://localhost:8000/todos");
  // const data = await response.json();
  // return data;
  try {
    console.log("fetch");
    const response = await axios.get("http://localhost:8000/todos/getTasks", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
});

//for showing in task
export const postTodo = createAsyncThunk("postTodo", async (task) => {
  try {
    const response = await axios.post("http://localhost:8000/todos", task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Updating a todo
export const updateTodo = createAsyncThunk(
  "updateTodo",
  async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/todos/updateTasks/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Deleting a todo
export const deleteTodo = createAsyncThunk("deleteTodo", async (todoId) => {
  try {
    await axios.delete(`http://localhost:8000/todos/deleteTasks/${todoId}`);
    return todoId;
  } catch (error) {
    throw error;
  }
});

export const markTaskComplete = createAsyncThunk(
  "markTaskComplete",
  async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/todos/completed/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return { id, updatedTask: response.data };
    } catch (error) {
      throw error;
    }
  }
);

// Create the slice
const todosSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, name, description } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task._id === id);
      if (taskToUpdate) {
        taskToUpdate.name = name;
        taskToUpdate.description = description;
      }
    },
    deleteTask: (state, action) => {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        console.log("loading ");
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("succeed ", action.payload);
        state.tasks = action.payload;
        // state.task.push(action.payload); // Update the task with fetched data
        console.log("state", state.tasks);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Add the newly created task to the task
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task._id === updatedTask._id
        );
        if (index !== -1) {
          // Replace the task with the updated one in the task
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const deletedTaskId = action.payload;
        // Remove the deleted task from the task
        state.tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
      });
  },
});

export const { addTodo, editTask, deleteTask } = todosSlice.actions;
export default todosSlice.reducer;
