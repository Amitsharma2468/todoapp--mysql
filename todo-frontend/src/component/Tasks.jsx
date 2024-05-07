import React from 'react';
import { MdDelete } from "react-icons/md";
import './Tasks.css';

function Tasks(props) {
  return (
    <div className='task-container'>
        <strong>{props.title}</strong>
        <p>{props.description}</p>
        <div className='task-icon-container'>
            <p>{props.status}</p>
            {props.del !== false && <MdDelete className='del-icon' onClick={props.delfunc} />}
        </div>
    </div>
  );
}

export default Tasks;
