import { NavLink ,useLocation, useNavigate} from "react-router-dom"

const Sidebar = () => {




  const location = useLocation()

  const navigate = useNavigate()

  if (location.pathname === "/")
  {
    return (<ul className="navbar-nav">

    <li className="nav-item">
       <NavLink className="nav-link" to="/"><i className="fa-solid fa-bars-progress"></i> Dashboard </NavLink>
   </li>
    <li className="nav-item">
       <NavLink className="nav-link" to="/leads"><i className="fa-solid fa-user-group"></i> Leads</NavLink>
   </li>
    <li className="nav-item">
        <NavLink className="nav-link" to="/sales"><i className="fa-solid fa-clipboard-check"></i> Sales</NavLink>
    </li>
     <li className="nav-item">
       <NavLink className="nav-link" to="/agents"><i className="fa-solid fa-headset"></i> Agents</NavLink>
    </li>
     <li className="nav-item">
        <NavLink className="nav-link" to="/reports"><i className="fa-solid fa-chart-simple"></i> Reports</NavLink>
   </li>
  </ul>)
  }

  else
  {
    return (
      <ul className="navbar-nav ">

    <li className="nav-item">
       <NavLink className="btn  btn-outline-secondary mb-3" to="/"><i className="fa-solid fa-bars-progress"></i> Back to Dashboard</NavLink>
        </li>

        <li className="nav-item">
       <button className="btn btn-outline-secondary"  onClick={()=>navigate(-1)} ><i className="fa-solid fa-arrow-left"></i> Go Back</button>
        </li>

        </ul>
    )
    }

  
}

export default Sidebar