import './css/Task.css'

const Task = () => {
    return ( 
        <div className="task-body">
            
                <div className='info'>
                    <div className="task-name">Task name</div>
                    <div className="task-due-date">Due: 01.01.2022</div>
                    <div className="task-state">Status: In progress</div>
                </div>
                <div className="buttons">
                    <select>
                        <option value="not-started" selected>Not started</option>
                        <option value="in-progress">In progress</option>
                        <option value="completed">Completed</option>
                        <option value="dropped-out">Dropped out</option>
                    </select>
                    <button>Delete</button>
                </div>
            
        </div>
     );
}
 
export default Task;