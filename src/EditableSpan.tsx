import { TextField } from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editeMode, setEditeMode] = useState(false)

    let [title, setTitle] = useState(props.title)

    const activateEditeMode = () => setEditeMode(true)
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editeMode ? <TextField  autoFocus value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode}/> :
        <span onDoubleClick={activateEditeMode}>{props.title}</span>
}