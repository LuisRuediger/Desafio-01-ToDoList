import { Trash } from "phosphor-react";

import styles from './Task.module.css'

interface TaskProps {
  task: string;
  id: string;
  isCompleted: (id: string) => void
  onDeleteTask: (taskToDelete: string) => void;
}

export function Task({ task, id, onDeleteTask, isCompleted }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id)
  }
  
  function handleCompleteTask() {
    isCompleted(id)
  }

  return (
    <li>
      <div className={styles.taskInput}>
        <input 
          type="checkbox" 
          className={styles.checkbox} 
          id={id} 
          onClick={handleCompleteTask}
          required
        />
        <p>{task}</p>
      </div>

      <button onClick={handleDeleteTask} >
        <Trash size={18} />
      </button>
    </li>
  )
}