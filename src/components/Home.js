import {Outlet, Link} from 'react-router-dom'
import './css/home.css';



const Home = () => {
    return (
    <div className="home-body">
        <div className="menu-links">
            <Link to='/home/all'>All Tasks</Link>
            <Link to='/home/favorites'>Favorites</Link>
            <Link to='/home/deleted'>Deleted</Link>
            <Link to='/home/groups'>Groups</Link>
        </div>
        <div className='outlet-content'>

            <Outlet />
        </div>
    </div>  );
}
 
export default Home;