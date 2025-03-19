import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todolist',
  initialState: {
    data: [
      {
        id: 1,
        name: ' Rayhona Azizova',
        desc: 'age*',
        email: 'azizovabella14@mail.com',
        phone: '123-456-7890',
        city: 'Dushanbe',
        status: 'Active',
        done: false,
      },
      {
        id: 2,
        name: 'Bushra Tarakhil',
        desc: 'age*',
        email: 'bushratarakhil22@mail.com',
        phone: '987-654-3210',
        city: 'Vahdat',
        status: 'Inactive',
        done: true,
      },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.data.push({
        id: Date.now(),
        name: action.payload.name,
        desc: action.payload.desc,
        email: action.payload.email,
        phone: action.payload.phone,
        city: action.payload.city,
        status: action.payload.status,
        done: false,
      });
    },
    del: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
    edit: (state, action) => {
      const { id, newName, newDesc, newEmail, newPhone, newCity, newStatus } = action.payload;
      const todo = state.data.find((todo) => todo.id === id);
      if (todo) {
        todo.name = newName;
        todo.desc = newDesc;
        todo.email = newEmail;
        todo.phone = newPhone;
        todo.city = newCity;
        todo.status = newStatus;
      }
    },
    toggleStatus: (state, action) => {
      const todo = state.data.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { add, del, edit, toggleStatus, setData } = todoSlice.actions;
