import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemsPropsTypes = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemsPropsTypes) {

    let [title, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(title)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {

        if (title.trim() === '') {
            setError('Title is required')
        }

        props.addItem(title.trim())
        setNewTaskTitle('')
    }


    return <div>
        <input type="text" value={title} onKeyPress={onKeyPressHandler} onChange={onNewTitleChangeHandler}
               className={error ? 'error' : ''}/>

        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>

}