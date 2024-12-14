import React, { useEffect, useState } from "react";
import { ToDoItem } from "./ToDoItem";
import { ToDoForm } from "./ToDoForm";

const defaultTodo = {
    id: -1,
    label: "",
    is_done: false
}

export const ToDoList = () => {

    const [toDoList, setToDoList] = useState([])
    const [toDoItem, setToDoItem] = useState(defaultTodo)

    const handleStartEdit = (id) => {
        const editableTodo = toDoList.filter((todo) => todo.id === id)[0];
        console.log(editableTodo);
        setToDoItem(editableTodo)
    }

    const handleDelete = async(id) => {
        if(confirm("Are you sure you want to delete this ToDo? This action will be permanent")) {
            await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async() => {
                await getData();
            })
        }
    }

    const getData = async() => {
        await fetch("https://playground.4geeks.com/todo/users/spain-91-pablo", {
            headers: {
                "Content-Type": "application/json"
              }
        })
        .then(async(res) => {
            const response = await res.json()
            setToDoList(response.todos)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ul className="list-group col-5">
            <li className="list-group-item" >
                <ToDoForm toDo={toDoItem} getData={() => getData()}/>
            </li>
            {toDoList && toDoList.map((todo) => {
                return <ToDoItem key={todo.id} text={todo.label} isDone={todo.is_done} editHandler={() => handleStartEdit(todo.id)} deleteHandler={() => handleDelete(todo.id)}/>
            })}
            <li className="list-group-item">{toDoList.length > 0 ? `${toDoList.length} items left` : `No to Do's, add a new one`}</li>
        </ul>
    );
}