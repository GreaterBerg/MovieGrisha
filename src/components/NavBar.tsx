import { Link } from 'react-router-dom'
import './NavBar.css'

import { Search } from 'lucide-react'



const NavBar = ({isSearch=false}) => {

  return (
    <nav>
        <Link to={"/"} className='logo'>MovieGrisha</Link>
        <ul className='nav-list'>
          <Link to={"/search"} className='item'> <Search /> Search</Link>
        </ul>
    </nav>
  )
}

export default NavBar
