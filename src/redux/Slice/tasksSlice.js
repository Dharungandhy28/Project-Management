import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:8000/tasks";

// Get

export const getTaskFromServer = createAsyncThunk(
  "tasks/getTaskFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "No Task Found" });
    }
  }
);

//POST

export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Added" });
    }
  }
);

// PATCH

export const UpdateTaskInServer = createAsyncThunk(
  "tasks/UpdateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Updated" });
    }
  }
);

// Delete

export const DeleteTaskFromServer = createAsyncThunk(
  "tasks/DeleteTaskFromServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Deleted" });
    }
  }
);

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      let task = { ...action.payload, id };
      state.tasksList.push(task);
    },
    removeFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    UpdateTaskList: (state, action) => {
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      .addCase(getTaskFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.tasksList = [];
      })
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(UpdateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(UpdateTaskInServer.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(DeleteTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(DeleteTaskFromServer.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  addTaskToList,
  removeFromList,
  UpdateTaskList,
  setSelectedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
