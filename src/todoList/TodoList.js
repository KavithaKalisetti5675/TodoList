import { React, useRef, useState } from 'react';
import { Checkmark } from 'react-checkmark';
import './TodoList.css';
const TodoList = () => {

    const [currentTask, setCurrentTask] = useState("");
    const [todoList, setTodoList] = useState([]);
    const inputTask = useRef(null)


    const addTask = () => {
        setTodoList([...todoList, { task: currentTask, completed: false }]);
        inputTask.current.value = "";
        setCurrentTask("")
    }

    const deleteTask = (taskToDelete) => {
        setTodoList(todoList.filter((task) => {
            return task.task !== taskToDelete;
        }))
    }

    const CompleteTask = (completeTask) => {
        setTodoList(todoList.map((task) => {
            return task.task === completeTask ? { task: completeTask, completed: true } : { task: task.task, completed: task.completed ? true : false }
        }))
    }

    return (
        <div>
            <h1>Todo List</h1>
            <div style={{ backgroundColor: "aquamarine", margin: 50, paddingTop: 20, paddingBottom: 20, paddingLeft: 600, paddingRight: 600, placeItems: "center" }} id="taskView">
                <input ref={inputTask} type="text" placeholder='Add Todo.....' onChange={(event) => setCurrentTask(event.target.value)} style={{
                    margin: 10, width: 500,
                    height: 50,
                }} onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                        addTask();
                    }
                }} />
                <button style={{ backgroundColor: 'darkcyan' }} onClick={addTask}>+</button>
            </div>
            <hr />
            <ul>
                {todoList.map((val, key) => {
                    return (
                        <div id="taskView">
                            {val.completed ? <li key={key} style={{ textDecorationLine: 'line-through' }}> {val.task}</li> : <li key={key}> {val.task}</li>}
                            <button style={{ backgroundColor: 'red' }} onClick={() => { deleteTask(val.task) }}>X</button>
                            <button style={{ backgroundColor: 'darkcyan' }} onClick={() => { CompleteTask(val.task) }}> <Checkmark size='30px' /></button>
                            {val.completed ? <h1>Task Completed</h1> : <h1>task Not Completed</h1>}
                        </div>
                    );
                })}
            </ul>
        </div>
    )
}

export default TodoList;
