import { PlusCircle, Trash } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "./Task";
import { v4 as uuidv4 } from 'uuid';

import styles from './TaskList.module.css'

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {
      id: uuidv4(),
      title: newTaskText,
      isCompleted: false
    }])

    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)
  }



  const taskCount = tasks.length
  
  return (
    <div className={styles.wrapper}>
      <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
            <input 
              type="text" 
              placeholder='Adicione uma nova tarefa'
              className={styles.input}
              onChange={handleNewTaskChange}
              value={newTaskText}
            />
            <button type='submit' className={styles.button}>
              Criar
              <PlusCircle size={16} weight="bold" />
            </button>
        </form>

        <div className={styles.tasksInfo}>
          <div className={styles.createdTasksCount}>
            <p>Tarefas criadas</p>
            <span>{taskCount}</span>
          </div>
          <div className={styles.doneTasksCount}>
            <p>Concluídas</p>
            <span>5 de 10</span>
          </div>
        </div>

        <main>
          <ul>
            {tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task.title}
                  isCompleted={task.isCompleted}
                  onDeleteTask={deleteTask}
                />
              )
            })}
          </ul>
        </main>
    </div>
  )
}