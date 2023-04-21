import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate("/login");

    }

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         handleLogOut();
    //     }, 86400000 ); // 60000 milliseconds = 1 minute
    //     return () => clearTimeout(timeoutId);
    // }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Navbar</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/changepassword">Change Password</Link>
                            </li>
                        </ul>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>&nbsp;
                        <button type="button"
                            className="btn btn-primary float-right"
                            data-toggle="button"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
