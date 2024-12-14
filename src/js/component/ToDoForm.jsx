import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export const ToDoForm = (props) => {
    
    const [isForm, setIsForm] = useState(false)
    const [currentFormId, setCurrentFormId] = useState(props.toDo.id)
    const [formToDo, setFormToDo] = useState(props.toDo.label)
    const [isDone, setIsDone] = useState(props.toDo.is_done)

    useEffect(() => {
        setCurrentFormId(props.toDo.id)
        setFormToDo(props.toDo.label)
        setIsDone(props.toDo.is_done)
    }, [props.toDo])
    
    const handleAddTodo = async(id) => {
        let url = "https://playground.4geeks.com/todo/todos/";
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "label": formToDo,
                "is_done": isDone 
            })
        }
        if(currentFormId !== -1) {
            options.method = "PUT"
            url += currentFormId;
        }
        else {
            url += "spain-91-pablo";
        }

        await fetch(url, options)
        .then(async() => {
            await props.getData();
            resetTodoData();
        })
        .catch((err) => console.log(err))
    }

    const resetTodoData = () => {
        setIsForm(false)
        setCurrentFormId(-1)
        setFormToDo("")
        setIsDone(false)
    }

    return (
        <div onMouseEnter={() => setIsForm(true)} onMouseLeave={() => setIsForm(false)}>
        <input type="text" className="form-control" placeholder="Write new todo" value={formToDo} onChange={(e) => setFormToDo(e.target.value)} />
                {isForm && 
                <>
                    <div className="form-check my-2">
                      <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={isDone} onChange={() => setIsDone(!isDone)}/>
                      <label className="form-check-label" htmlFor="flexCheckDefault">Is completed</label>
                    </div>
                    <div className="d-flex gap-2 mb-2">
                        <button className="btn btn-primary" type="submit" onClick={() => handleAddTodo(currentFormId)}>Submit</button>
                        <button className="btn btn-secondary" type="submit" onClick={() => resetTodoData()}>Cancel</button>
                    </div>
                </>
                }
        </div>
    )
}

ToDoForm.propTypes = {
    toDo: PropTypes.exact({
        id: PropTypes.number,
        label: PropTypes.string, 
        is_done: PropTypes.bool
    }),
    getData: PropTypes.func
}