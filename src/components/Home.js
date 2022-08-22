import {useState, useEffect, useRef} from 'react'
import './css/home.css';
import Task from './Task';





const Home = () => {
    const taskNameRef = useRef()
    const taskDueRef = useRef()
    const taskGroupRef = useRef()
    const taskStatusRef = useRef()
    const groupNameRef = useRef()




    //temp predefined tasks that I should delete later
    const [tasks,setTasks] = useState([
        
    ])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [showTasks, setShowTasks] = useState([]);
    const [isMenuOn, setIsMenuOn] = useState(false)
    const [currentGroup, setCurrentGroup] = useState("All Tasks")
    const [groups, setGroups] = useState(["All Tasks", "Favorites"])
    const [message, setMessage] = useState('Test message')

    useEffect(()=>{
        if (localStorage.getItem("tasks") !== null) {
            let tempLocalTasks = localStorage.getItem('tasks')
        setTasks(JSON.parse(tempLocalTasks))
          }
        if (localStorage.getItem("groups") !== null) {
            let tempLocalGroups = localStorage.getItem('groups')
            setGroups(JSON.parse(tempLocalGroups))
          }
    },[])


    //filters the task to match selected task group
    const changeGroup = (group,e) =>{
        setCurrentGroup(group)
        //makes sure it won't add the new filtered items on top on previously filtered items
        setFilteredTasks([])
        //if selected group is All Tasks, show all tasks
        if(group==="All Tasks"){
            tasks.forEach((task)=>{
                    setFilteredTasks((filteredTasks)=>[...filteredTasks, task]) 
            })
            //if selected group is Favorites, show only favorites
        }else if(group==="Favorites"){
            tasks.forEach((task)=>{
                if(task.fav===true){
                    setFilteredTasks((filteredTasks)=>[...filteredTasks, task])
                }
            })
        }else{
            //show only selected group
            tasks.forEach((task)=>{
                if(task.group===group){
                    setFilteredTasks((filteredTasks)=>[...filteredTasks, task])
                }
            })

        }
    }

    useEffect(()=>{
        //makes sure showTasks array is empty
        setShowTasks([])
        //creates Task items for every filtered task
        filteredTasks.forEach((task)=>{
            setShowTasks((showTasks)=>[...showTasks, <Task groups={groups} handleEdit={handleEdit} updateGroup={updateGroup} handleDelete={handleDelete} updateStatus={updateStatus} task={task} key={task.id+"taskKey"}/>])

        })
        //saves tasks to localStorage
        localStorage.setItem('tasks',JSON.stringify(tasks))
        localStorage.setItem('groups',JSON.stringify(groups))    


    },[filteredTasks, tasks])


    //show add task menu on button press
    const showAddTaskMenu = () =>{
        setIsMenuOn(true);
        document.querySelector(".addTask-menu").classList.toggle("showMenu")
        document.querySelector("#add-task-btn").classList.toggle("hide")
    }
    //delete the task on button press
    const handleDelete = (taskId) =>{
        //finds the index of the selected task in the "tasks" array
        var index = tasks.map(function(e) { return e.id; }).indexOf(taskId);
        //saves a temp copy of tasks so it won't directly change the state
        let temp = tasks;
        //removes the selected item
        temp.splice(index,1);
        //updates the state with the modified temp "tasks" array
        setTasks(temp);
        //show a message
        showMsg("Task successfully deleted!","green")

        //hides the element after deletion
        let el = document.getElementById("task"+taskId);
        el.classList.toggle('deletedTask')
        setTimeout(()=>{
            el.style.display = "none";
        },350)
       
    }
    //a function used to show different messages
    const showMsg = (msg, color) =>{
        //updates the message state
        setMessage(msg)
        //change message box color
        document.querySelector(".messages").style.backgroundColor = color;
        //show message box
        document.querySelector(".messages").classList.toggle("show-message");
        //hide message box after 2500ms
        setTimeout(()=>{document.querySelector(".messages").classList.toggle("show-message")},2500)
    }
    //updates the status of the task
    const updateStatus = (data, task) =>{
        
        //makes a temp copy of filtered tasks
        let tempTasks = filteredTasks;
        //finds the index of selected task
        var index = tempTasks.map(function(e) { return e.id; }).indexOf(task.id);
        //updates the status
        tempTasks[index].status = data;
        //updates the state
        setTasks(tempTasks)
    }
    //close the menu and show the add button
    const closeMenu = () =>{
        setIsMenuOn(false);
        document.querySelector(".addTask-menu").classList.toggle("showMenu")
        document.querySelector("#add-task-btn").classList.toggle("hide")
    }

    //creates the task and add it to task list
    const createTask = () =>{
        //hides the menu after pressing the button
        setIsMenuOn(false);
        document.querySelector(".addTask-menu").classList.toggle("showMenu")
        document.querySelector("#add-task-btn").classList.toggle("hide")
        //create a temporary new task with entered values
        let tempId;
        //if the tasks is empty, it will give an error at .length so it will set id to 0
        if(!tasks){
            tempId= 0;
            
        }else{
            tempId = (tasks.length-1)+1
        }
        let tempTask = {
            id: tempId,
            name: taskNameRef.current.value,
            due: taskDueRef.current.value,
            status: taskStatusRef.current.value,
            group: taskGroupRef.current.value,
            fav: false
            }
            //push the new task to the tasks array

            //if the tasks is empty, it won't iterate over it so the way it adds tasks in else block won't work
        if(!tasks){
            setTasks([tempTask])
        }else{

            setTasks((tasks)=>[...tasks,tempTask])
        }
        //adds the task to filtered array if it matches the filters
        if(currentGroup===tempTask.group){ 
            setFilteredTasks((filteredTasks)=>[...filteredTasks, tempTask])
        }
        
    }   
    const handleNewGroup =() =>{
        document.querySelector("#new-group-btn").classList.toggle("hide")
        document.querySelector(".fullscreen-menu-bg").classList.toggle("showGroupMenu")
    }
    const closeNewGroupMenu = () =>{
        document.querySelector("#new-group-btn").classList.toggle("hide")
        document.querySelector(".fullscreen-menu-bg").classList.toggle("showGroupMenu")
    }
    const createGroup = () =>{
        document.querySelector("#new-group-btn").classList.toggle("hide")
        document.querySelector(".fullscreen-menu-bg").classList.toggle("showGroupMenu")
        //adds the new group to the group state array
        setGroups((groups)=>[...groups, groupNameRef.current.value])
    }
    //update the group when you change it from the task buttons
    const updateGroup = (id, group, isFav) =>{
        //creates a temp copy of tasks
        let tempTasks = tasks;
        //finds the index
        var index = tempTasks.map(function(e) { return e.id; }).indexOf(id);
        //checks if it is favorite or not and updates the state
        if(isFav===true){
            tempTasks[index].fav = true;
        }else{
            tempTasks[index].fav = false;
        }
        //updates the state with the new changes
        setTasks(tempTasks)
    }

    //handles the Edit task logic

    const handleEdit = (editedTask) =>{
        //creates a temp copy of tasks
        let tempTasks = tasks;
        //finds the index
        var index = tempTasks.map(function(e) { return e.id; }).indexOf(editedTask.id);
        //checks if it is favorite or not and updates the state
        setTasks([...tempTasks.slice(0,index), editedTask, ...tempTasks.slice(index+1)])
    }



    return (
    <div className="home-body">
        {/* Left menu with group buttons */}
        <div className="menu-links">
            {/* Creates a button for every group in groups state */}
            {groups.map((item)=>{
            return <button style={{
                backgroundColor: currentGroup===item ? 'rgba(211, 211, 211, 0.233)' : '',
                
              }} onClick={(e)=>changeGroup(item, e)} key={item+"menuBtnKey"}>{item}</button>
                })}
                
            <button id="new-group-btn" onClick={handleNewGroup}>New Group</button>
            {/* A window that prompts for group name, that is fullscreen and that blurs the background */}
            <div className='fullscreen-menu-bg'>
                <div className="newGroupMenu">
                    <button className="closeBtn" onClick={closeNewGroupMenu}>X</button>
                    <div className='input'>
                        <label>Group name</label>
                        <input ref={groupNameRef} type="text"></input> 

                        <button id="add-group-btn" onClick={createGroup}>Add Group</button>
                    </div>
                </div>
            </div>
        </div>
        {/* Here tasks will be rendered */}
        <div className='tasks-content'>
            {/* Message box that is hidden by default */}
            <div className="messages">{message}</div>
            {showTasks}
            {/* Button to create new task, located under all the tasks shown */}
            <button id="add-task-btn" onClick={showAddTaskMenu}>Add task</button>
        </div>
        {/* Menu for adding a new task. hidden by default */}
        <div className="addTask-menu">
            <button id="closeMenuBtn" onClick={closeMenu}>X</button>
            <div className="name">
                <label>Task name</label>
                <input ref={taskNameRef} type="text"></input>
            </div>
            <div className="due">
                <label>Due date</label>
                <input ref={taskDueRef} type="text"></input>
            </div>
            {/* This will have all created groups in a dropdown menu */}
            <div className="group">
                <label>Group</label>
                <select ref={taskGroupRef}>
                {groups.map((item)=>{
                 return <option value={item}>{item}</option>
                })}
                </select>
            </div>
            
            <div className="status">
                <label>Status</label>
                <select ref={taskStatusRef}>
                            <option value="Not started">Not started</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Dropped out">Dropped out</option>
                </select>
            </div>
            <button id='save-task-btn' onClick={createTask}>Add task</button>
            
        </div>
    </div>  );
}
 
export default Home;