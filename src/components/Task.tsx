import { Trash } from "phosphor-react";

import styles from './Task.module.css'

interface TaskProps {
  task: string
  onDeleteTask: (taskToDelete: string) => void
}

export function Task({ task, onDeleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task)
  }

  return (
    <li>
      <div className={styles.taskInput}>
        <input type="checkbox" className={styles.checkbox} />
        <p>{task}</p>
      </div>

      <button onClick={handleDeleteTask} >
        <Trash size={18} />
      </button>
    </li>
  )
}