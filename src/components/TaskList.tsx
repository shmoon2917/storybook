// src/components/PureTaskList.js

import React from 'react';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { archiveTask, pinTask, TaskState } from '../lib/redux';
import Task, { ITask } from './Task';

type PureTaskListProps = {
  loading?: boolean;
  tasks: Array<ITask>;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
};

export function PureTaskList({
  loading,
  tasks,
  onPinTask,
  onArchiveTask,
}: PureTaskListProps): JSX.Element {
  // const tasks = useSelector((state: TaskState) =>
  //   state.tasks.filter(
  //     (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
  //   )
  // );
  // const dispatch = useDispatch();

  // const onArchiveTask = (id: string) => dispatch(archiveTask(id));
  // const onPinTask = (id: string) => dispatch(pinTask(id));

  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className='list-items'>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className='list-items'>
        <div className='wrapper-message'>
          <span className='icon-check' />
          <div className='title-message'>You have no tasks</div>
          <div className='subtitle-message'>Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ];

  return (
    <div className='list-items'>
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

PureTaskList.defaultProps = {
  loading: false,
};

export default connect(
  ({ tasks }: { tasks: any }) => ({
    tasks: tasks.filter(
      (t: any) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id: string) => dispatch(archiveTask(id)),
    onPinTask: (id: string) => dispatch(pinTask(id)),
  })
)(PureTaskList);
