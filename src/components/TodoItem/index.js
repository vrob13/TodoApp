import React from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { TiTrash } from "react-icons/ti";
import './TodoItem.css';


function TodoItem(props) {
  return (
    <li className="card">
      <span 
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
      >
      <HiOutlineCheckCircle className='TodoItem-p--complete'/>
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <span 
        className="Icon Icon-delete"
        onClick={props.onDelete}
      >
      <TiTrash  />
      </span>
    </li>
  );
}
export { TodoItem };