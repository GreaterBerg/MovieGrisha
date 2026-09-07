import { Link } from 'react-router-dom'
import './NavBar.css'

import { Search } from 'lucide-react'



const NavBar = ({isSearch=false}) => {

  return (
    <nav>
        <Link to={"/"} className='logo'>MovieGrisha</Link>
        <ul className='nav-list'>
          <Link to={"/search"} className='item'> <Search size={20} /> Search</Link>
        </ul>
    </nav>
  )
}

export default NavBar
