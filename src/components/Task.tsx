import { Trash } from "phosphor-react";

import styles from './Task.module.css'

interface TaskProps {
  task: string;
  id: string;
  isCompleted: boolean;
  onDeleteTask: (taskToDelete: string) => void;
}

export function Task({ task, id, isCompleted, onDeleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <li>
      <div className={styles.taskInput}>
        <input 
          type="checkbox" 
          className={styles.checkbox} 
          id={id} 
        />
        <p>{task}</p>
      </div>

      <button onClick={handleDeleteTask} >
        <Trash size={18} />
      </button>
    </li>
  )
}