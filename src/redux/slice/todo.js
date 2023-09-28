import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../common/constanst";
import Cookies from "js-cookie";

const token = Cookies.get("token");

// showing all tasks when site is opened
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  try {
    if (!token) {
      throw new Error("Token not found in cookies.");
    }
    console.log("token in fetch: ", token);

    let config = {
      token: token,
    };
    const response = await axios({
      url: `${BASE_URL}/todos`,
      method: "Get",
      headers: config,
    });

    return response.data;
  } catch (error) {
    throw error.message;
  }
});

// post a task by typing its name in the field
export const postTodo = createAsyncThunk("postTodo", async (task) => {
  try {
    if (!token) {
      throw new Error("Token not found in cookies.");
    }
    console.log("token in postTodo: ", token);

    const headers = {
      "Content-Type": "application/json",
      token: token,
    };

    const response = await axios({
      url: `${BASE_URL}/todos`,
      data: task,
      method: "POST",
      headers: headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

// updating particular task based on its id
export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ id, name, description }) => {
    console.log("name:", name);
    console.log("description:", description);
    try {
      if (!token) {
        throw new Error("Token not found in cookies.");
      }

      const headers = {
        "Content-Type": "application/json",
        token: token,
      };

      const response = await axios.put(
        `${BASE_URL}/todos/${id}`,
        { name, description },
        { headers }
      );
      console.log("response : ", response.data);
      return { id, updatedTask: response.data };
    } catch (error) {
      throw error;
    }
  }
);

//deleting a task based on its id
export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  try {
    if (!token) {
      throw new Error("Token not found in cookies.");
    }
    console.log("token in delete: ", token);
    let config = {
      token: token,
    };
    await axios({
      url: `${BASE_URL}/todos/${id}`,
      method: "DELETE",
      headers: config,
    });
    return id;
  } catch (error) {
    throw error;
  }
});

// changing task completion status based on its id
export const markTaskComplete = createAsyncThunk(
  "markTaskComplete",
  async ({ id }) => {
    try {
      if (!token) {
        throw new Error("Token not found in cookies.");
      }

      console.log({ tokenFinal: token, id });
      let config = {
        token: token,
      };

      const response = await axios({
        url: `${BASE_URL}/todos/status/${id}`,
        method: "PUT",
        headers: config,
        "Content-Type": "application/json",
      });

      console.log(response);

      return { id, updatedTask: response.data };
    } catch (error) {
      throw error;
    }
  }
);

// reducers for all actions
const todoSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        name: action.payload.name,
        description: action.payload.description,
        completed: false,
      });
    },
    editTask: (state, action) => {
      const { id, name } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task._id === id);
      if (taskToUpdate) {
        taskToUpdate.name = name;
      }
    },
    deleteTask: (state, action) => {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== idToDelete);
    },
    taskComplete: (state, action) => {
      const idToComplete = action.payload;
      const taskToToggle = state.tasks.find(
        (task) => task._id === idToComplete
      );
      if (taskToToggle) {
        taskToToggle.completed = !taskToToggle.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, updatedTask } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task._id === id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.tasks = state.tasks.filter((task) => task._id !== deletedId);
      })
      .addCase(markTaskComplete.fulfilled, (state, action) => {
        const { id, updatedTask } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task._id === id);
        if (taskIndex !== -1) {
          console.log(updatedTask);
          state.tasks[taskIndex].completed = updatedTask.task.completed;
        }
      });
  },
});

export const { addTask, editTask, deleteTask, taskComplete } =
  todoSlice.actions;

export default todoSlice.reducer;
