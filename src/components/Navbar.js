import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { useContext, useState } from "react";
import classes from "./Navbar.module.css";
import AuthContext, {AuthProvider} from "./context/AuthProvider";
import { getAllItemsByName } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar( onSearch ) {

    const { auth, setAuth } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
        getAllItemsByName({searchTerm}).then( res => {
            console.log(JSON.stringify(res.data));

        });
      };
    const logoutHandler = () => {
        setAuth("")
    }

    return (
        <nav className={classes.nav}>
            <Link to="/" className={classes.siteTitle}>&nbsp; SSF &nbsp;<img src="../../logo.png"></img></Link>

            <div className={classes.search__bar__wrab}>
                <div className={classes.search__bar}>
                    <input type="text" placeholder="search.. ." />
                    <button type="submit">
                    <FontAwesomeIcon icon={faSearch} style={{color: "#266d18",}} />
                    </button>
                </div>
            </div>

            {auth ?
            <ul>
                <CustomLink to="/favorite">Favorite</CustomLink>
                <CustomLink to="/order">Order List</CustomLink>
                <Link to="/" className={classes.siteTitle} onClick={logoutHandler}>Log Out</Link>
            </ul> : 
            <ul>
                <CustomLink to="/order">Order List</CustomLink>
                <CustomLink to="/favorite">Favorite</CustomLink>
                <CustomLink to="/login">Login</CustomLink>
                <CustomLink to="/signup">Sign-Up</CustomLink>
            </ul>
            }
            
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? classes.active : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default Navbar;


