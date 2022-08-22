import './css/Task.css'
import { useState, useEffect, useRef } from 'react';
import favOn from './imgs/fav-on.png';
import favOff from './imgs/fav-off.png';


const Task = (props) => {

    const nameRef = useRef()
    const dueRef = useRef()
    const groupRef = useRef()


    const [favIcon, setFavIcon] = useState(favOff)
    const [mode, setMode] = useState("read")
    
    useEffect(()=>{
        //checks if the task is favorite, sets new icon if true
        if(props.task.fav===true){
            setFavIcon(favOn)
        }
    },[])
    const handleFav = () =>{
        //changes the task fav icon
        if(favIcon===favOff){
            props.updateGroup(props.task.id,"Favorites",true)
            setFavIcon(favOn)
        }else{
            setFavIcon(favOff)
            props.updateGroup(props.task.id,"All Tasks",false)
        }
    }
    const editTask = () =>{
        //set task to edit mode 

            setMode("edit")

    
    }
    const handleCancel = () =>{
        //set taks to read mode
        setMode("read")

    }
    const handleSave = () =>{
        //saves the task in a temp var so I can modify it without changing the prop
        let tempTask = props.task;
        //check if there is any value entered by the user
        if(dueRef.current.value){
            tempTask.due = dueRef.current.value;
        } 
        if(nameRef.current.value){
            tempTask.name = nameRef.current.value;
        }
        tempTask.group = groupRef.current.value;
        //sends the updated temp task to the main component
        props.handleEdit(tempTask);

        //close edit mode
        handleCancel();


        
    }
   
    if(mode==='read'){

        return ( 
            <div className="task-body" id={'task'+props.task.id}>
                
                    <div className='info'  onClick={editTask}>
                        <div className="task-name">{props.task.name}</div>
                        <div className="task-due-date">Due: {props.task.due}</div>
                        <div className="task-state">Status: {props.task.status}</div>
                    </div>
                    <div className="buttons">
                    <img id="fav-icon" src={favIcon} alt="favorite button icon" onClick={handleFav}></img>
                    <select defaultValue={props.task.status} onChange={(e)=>props.updateStatus(e.target.value, props.task)}>
                            <option value="Not started">Not started</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Dropped out">Dropped out</option>
                    </select>
                     
                        <button id="delete-task-btn" onClick={(e)=>props.handleDelete(props.task.id)}>Delete</button>
                    </div>
                
            </div>
         );
    }else if(mode==="edit"){
        return ( 
            <div className="task-body edit-mode" id={'task'+props.task.id}>
                
                    <div className='info-edit'>
                        <div className="task-name">Task name <input ref={nameRef} type="text" placeholder={props.task.name}></input></div>
                        <div className="task-due-date">Due <input ref={dueRef} type="text" placeholder={props.task.due}></input> </div>
                        <div className='status'>Status: 
                        <select defaultValue={props.task.status} onChange={(e)=>props.updateStatus(e.target.value, props.task)}>
                                <option value="Not started">Not started</option>
                                <option value="In progress">In progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Dropped out">Dropped out</option>
                        </select>
                        </div>
                        <div className='groups'>Group:   
                        <select ref={groupRef} defaultValue={props.task.group}>
                                {props.groups.map((group)=>{
                                    return <option value={group}>{group}</option>
                                })}
                        </select>
                        </div>
                    </div>
                    <div className="buttons-edit">

                        <button id="save-edit-btn" onClick={handleSave}>Save</button>
                        <button id="delete-task-btn" onClick={(e)=>props.handleDelete(props.task.id)}>Delete</button>
                        <button id="cancel-edit-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                
            </div>
         );
    }
}
 
export default Task;