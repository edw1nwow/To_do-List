import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./Todolist";
import {v1} from "uuid";


export type FilterType = 'completed' | 'active' | 'all'
type ToDoListType = {
    id: string,
    title: string,
    filter: FilterType
}

const App = () => {

    let toDoListId1 = v1()
    let toDoListId2 = v1()


    let [tasksObj, setTasksObj] = useState({
        [toDoListId1]: [
            {id: v1(), title: 'Java', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ]

    })


    const removeTask = (id: string, toDoListId: string) => {
        let tasks = tasksObj[toDoListId]
        let filteredTask = tasks.filter(el => el.id !== id)
        tasksObj[toDoListId] = filteredTask
        setTasksObj({...tasksObj})
    }
    const changeFilter = (value: FilterType, toDoListId: string) => {
        let toDoList = toDoLists.find(el => el.id === toDoListId)
        if (toDoList) {
            toDoList.filter = value
            setToDoLists([...toDoLists])
        }
    }
    const addTask = (title: string, toDoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}

        let tasks = tasksObj[toDoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[toDoListId] = newTasks
        setTasksObj({...tasksObj})

    }
    const changeStatus = (taskId: string, isDone: boolean, toDoListId: string) => {
        let tasks = tasksObj[toDoListId]

        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }
    const removeToDoList = (toDoListId: string) => {
        let filteredToDoLists = toDoLists.filter(tl => tl.id !== toDoListId)
        setToDoLists(filteredToDoLists)
        delete tasksObj[toDoListId]
        setTasksObj({...tasksObj})
    }
    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListId1, title: 'What to learn?', filter: 'active'},
        {id: toDoListId2, title: 'What to buy?', filter: 'completed'}
    ])


    return (
        <div className="App">

            {toDoLists.map((el) => {

                let tasksForTodoList = tasksObj[el.id];

                if (el.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                }
                if (el.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                }
                return <ToDoList key={el.id} id={el.id} removeToDoList={removeToDoList} title={el.title}
                                 remove={removeTask} changeTaskStatus={changeStatus} filter={el.filter}
                                 changeFilter={changeFilter} addTask={addTask}
                                 task={tasksForTodoList}/>
            })}


        </div>
    );
}

export default App;
