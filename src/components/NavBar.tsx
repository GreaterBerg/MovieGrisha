import { Link } from 'react-router-dom'
import './NavBar.css'


const NavBar = ({isSearch=false}) => {

  return (
    <nav>
        <Link to={"/"} className='logo sharp'>MovieGrisha</Link>
        <ul className='nav-list'>
            { isSearch ? null :
                <Link to={"/search"} className='item sharp'>Search</Link>
            }
        </ul>
    </nav>
  )
}

export default NavBar
