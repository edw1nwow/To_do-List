import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    task: Array<TaskType>
    remove: (id: string, toDoListId: string) => void
    changeFilter: (value: FilterType, toDoListId:string) => void
    addTask: (title: string, toDoListId: string) => void
    changeTaskStatus: (taskId:string, isDone: boolean, toDoListId: string) => void
    filter: FilterType
    id: string
    removeToDoList: (id: string) => void
}


export const ToDoList = (props: ToDoListPropsType) => {
    let [title, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string|null>(null)


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(title, props.id)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {

        if (title.trim() === '') {
            setError('Title is required')
        }

        props.addTask(title.trim(), props.id)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeToDoList = () => {
    props.removeToDoList(props.id)
    }

    return <div>
        <h3>{props.title} <button onClick={removeToDoList}>x</button></h3>
        <div>
            <input type="text" value={title} onKeyPress={onKeyPressHandler} onChange={onNewTitleChangeHandler} className={error ? 'error' : ''}/>

            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.task.map(el => {
                const onRemoveHandler = () => props.remove(el.id, props.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, e.currentTarget.checked,props.id)
                return <li className={el.isDone ? 'is-Done' : ''} key={el.id}><input type="checkbox" onChange={onChangeHandler} checked={el.isDone}/> <span>{el.title}</span>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

