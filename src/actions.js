import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./common/constanst";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  try {
    console.log("hello");

    const response = await axios.get(BASE_URL + "/todos");
    return response.data.tasks;
  } catch (error) {
    throw error;
  }
});

export const postTodo = createAsyncThunk("tasks/postTodo", async (task) => {
  try {
    const response = await axios.post(BASE_URL + "/api/tasks", task);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ index, newText }) => {
    try {
      const response = await axios.put(`/api/tasks/${index}`, {
        text: newText,
      });
      return { index, updatedTask: response.data };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (index) => {
    try {
      await axios.delete(`/api/tasks/${index}`);
      return index;
    } catch (error) {
      throw error;
    }
  }
);

export const markTaskComplete = createAsyncThunk(
  "tasks/markTaskComplete",
  async (index) => {
    try {
      const response = await axios.patch(`/api/tasks/${index}`);
      return { index, updatedTask: response.data };
    } catch (error) {
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Additional reducers can go here if needed
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
        console.log("error", action.payload);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { index, updatedTask } = action.payload;
        state.tasks[index] = updatedTask;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedIndex = action.payload;
        state.tasks.splice(deletedIndex, 1);
      })
      .addCase(markTaskComplete.fulfilled, (state, action) => {
        const { index, updatedTask } = action.payload;
        state.tasks[index] = updatedTask;
      });
  },
});

export default todoSlice.reducer;
