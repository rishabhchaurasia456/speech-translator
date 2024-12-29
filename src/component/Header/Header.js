import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-underline">
                            {/* <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" href="#">Active</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Speech to Text</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/translate">Translate</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header