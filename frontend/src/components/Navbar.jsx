import { Link, useNavigate } from "react-router-dom"
import logo from '../image/logo.png'

function Navbar() {
    const navigate = useNavigate()
    const onLogout = () => {
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");
        sessionStorage.removeItem("token");
        navigate("/");
    };
    if(sessionStorage.length !==0){
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} style={{ width: 50, marginRight: 20 }} />
                        BlogApp
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link" aria-current="page" >Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/my-blog" className="nav-link" aria-current="page" >My Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/new-blog" className="nav-link" >Create Blogs</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li> */}

                        </ul>
                    </div>
                </div>
                <div className="">
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <button style={{width:250}} className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Welcome,{sessionStorage["firstName"]+" " + sessionStorage["lastName"]}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><Link style={{ textDecoration: "none", color: "white", paddingLeft: 50 }} to="/profile">Profile</Link></li>
                                    <li><button style={{ textDecoration: "none", color: "white", paddingLeft: 50 }} onClick={onLogout} className="btn btn-link">Logout</button></li>
                                    <li></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
                        }
}
export default Navbar