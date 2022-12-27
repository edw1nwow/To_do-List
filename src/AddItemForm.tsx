import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";
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
        }else{
        props.addItem(title.trim())
        setNewTaskTitle('')}
    }


    return <div>
        <TextField style={{paddingBottom:'10px'}} label="Type value" variant="outlined" type="text" value={title} onKeyPress={onKeyPressHandler}
                   onChange={onNewTitleChangeHandler}
                   error={!!error} helperText={error}/>

        <IconButton onClick={addTask} color="primary"><Add/></IconButton>

    </div>

}