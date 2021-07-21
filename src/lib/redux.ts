// src/lib/redux.js

// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { DefaultRootState } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { ITask } from '../components/Task';

// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
};

type Actions = ReturnType<typeof archiveTask> | ReturnType<typeof pinTask>;

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
export const defaultTasks: Array<ITask> = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const initialState = {
  tasks: defaultTasks,
};

export type TaskState = {
  tasks: Array<ITask>;
};

// The action creators bundle actions with the data required to execute them
export const archiveTask = (id: string) => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = (id: string) => ({ type: actions.PIN_TASK, id });

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState: string) {
  return (state: TaskState, action: Actions): any => {
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state = initialState, action: Actions): TaskState => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

// We export the constructed redux store
