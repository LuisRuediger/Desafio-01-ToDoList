import { PlusCircle, Trash } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
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
    event.target.setCustomValidity('')
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)
  }

  function handleToggleTaskCompletion(id: string) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isCompleted: !task.isCompleted
    }: task)
    setTasks(newTasks)
  }

  const taskCount = tasks.length

  const taskDoneCount = tasks.filter(task => task.isCompleted === true).length
  
  return (
    <div className={styles.wrapper}>
      <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
            <input 
              type="text" 
              placeholder='Adicione uma nova tarefa'
              className={styles.input}
              onChange={handleNewTaskChange}
              value={newTaskText}
              onInvalid={handleNewTaskInvalid}
              required
            />
            <button 
              type='submit' 
              className={styles.button}
              disabled={newTaskText.length === 0}
            >
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
            <span>{taskCount !== 0 ? `${taskDoneCount} de ${taskCount}` : 0}</span>
          </div>
        </div>

        <main>
          <ul>
            {taskCount === 0 
            
            ? <li className={styles.emptyTasks}>
                  <img src="/assets/clipboard.svg" alt="" />  
                  <p>
                    Você ainda não tem tarefas cadastradas
                    <span>Crie tarefas e organize seus itens a fazer</span>
                  </p>
              </li> 
            
            : tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task.title}
                  onDeleteTask={deleteTask}
                  isCompleted={handleToggleTaskCompletion}
                />
              )
            })}

            
          </ul>
        </main>
    </div>
  )
}