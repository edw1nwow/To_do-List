import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    task: Array<TaskType>
    remove: (id: string, toDoListId: string) => void
    changeFilter: (value: FilterType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, toDoListId: string) => void
    filter: FilterType
    id: string
    removeToDoList: (id: string) => void
    changeToDoListTitle: (id: string, newTitle: string) => void
}


export const ToDoList = (props: ToDoListPropsType) => {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    let addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
            <button onClick={removeToDoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.task.map(el => {
                const onRemoveHandler = () => props.remove(el.id, props.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                const onChangeTitleHandler = (newValue: string) => props.changeTaskTitle(el.id, newValue, props.id)
                return <li className={el.isDone ? 'is-Done' : ''} key={el.id}><input type="checkbox"
                                                                                     onChange={onChangeStatusHandler}
                                                                                     checked={el.isDone}/>
                    <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

