import PropTypes from "prop-types";
import React, { useState } from "react";

export const ToDoItem = (props) => {

    const [inputValue, setInputValue] = useState(props.text)
    const [isHovering, setIsHovering] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const handleHover = (isHover) => {
        setIsHovering(isHover)
    }

    return(
        <li className={"list-group-item d-flex align-items-center justify-content-between"} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            <div className="col d-flex gap-2 align-items-center">
                {props.isDone ? <i className="fs-4 text-success fas fa-thumbs-up"></i> : <i className="fs-4 text-danger fas fa-ban"></i>}
                <span>{props.text}</span>
            </div>
            <div className={`d-flex ps-2 fs-2`}>
                <button type="button" onClick={props.editHandler} className={`btn btn-outline-secondary border-0`} aria-label="Edit"><i className="fas fa-edit"></i></button>
                <button type="button" onClick={props.deleteHandler} className={`btn btn-outline-danger border-0`} aria-label="Close"><i className="fas fa-trash"></i></button>
            </div>
            </li>
    );
}

ToDoItem.propTypes = {
    text: PropTypes.string,
    isDone: PropTypes.bool,
    editHandler: PropTypes.func,
    deleteHandler: PropTypes.func
}