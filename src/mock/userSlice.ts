import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { users, departments, countries, statuses } from "./mockData";

interface User {
  name: string;
  status: {
    name: string;
    value: string;
  };
  department: {
    name: string;
    value: string;
  };
  country: {
    name: string;
    value: string;
  };
}

interface UserState {
  users: User[];
  departments: { name: string; value: string }[];
  countries: { name: string; value: string }[];
  statuses: { name: string; value: string }[];
  selectedUser: User | null;
}

const initialState: UserState = {
  users,
  departments,
  countries,
  statuses,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<string>) {
      state.selectedUser =
        state.users.find((user) => user.name === action.payload) || null;
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.name === action.payload.name
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.name !== action.payload);
    },
    resetSelectedUser(state) {
      state.selectedUser = null;
    },
  },
});

export const {
  selectUser,
  updateUser,
  addUser,
  deleteUser,
  resetSelectedUser,
} = userSlice.actions;
export default userSlice.reducer;
