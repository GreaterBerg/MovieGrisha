import { Link } from 'react-router-dom'
import './NavBar.css'


const NavBar = ({isSearch=false}) => {

  return (
    <nav>
        <Link to={"/"} className='logo'>The Movie Tracker</Link>
        <ul className='nav-list'>
            { isSearch ? null :
                <Link to={"/search"} className='item'>Search</Link>
            }
        </ul>
    </nav>
  )
}

export default NavBar
