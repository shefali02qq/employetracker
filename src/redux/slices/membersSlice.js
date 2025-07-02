import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  members: [
    { id: 1, name: 'John Doe', status: 'Working', tasks: [] },
    { id: 2, name: 'Jane Smith', status: 'Break', tasks: [] },
    { id: 3, name: 'Alice Brown', status: 'Meeting', tasks: [] },
    { id: 4, name: 'Bob White', status: 'Offline', tasks: [] }
  ]
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) member.status = status;
    },
    assignTask: (state, action) => {
      const { memberId, title, dueDate } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        member.tasks.push({
          id: nanoid(),
          title,
          dueDate,
          progress: 0,
          completed: false
        });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = progress;
          task.completed = progress >= 100;
        }
      }
    }
  }
});

export const { updateStatus, assignTask, updateTaskProgress } = membersSlice.actions;
export default membersSlice.reducer; 