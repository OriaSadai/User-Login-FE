import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React, { useContext, useState} from "react";
import classes from "./Navbar.module.css";
import AuthContext, { AuthProvider } from "./context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faSignInAlt, faSignOutAlt, faUserPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import OrderListContext from "../components/context/OrderListContext";
import { getAllItemsByName, getAllItemsByNameAuthenticate} from "../services/api";
import normalizeItemName from '../utils/itemUtils';


function Navbar({setItemList}) {
  const { auth, setAuth } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { orderList, setOrderList } = useContext(OrderListContext);
  const [searchInput,setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    getAllItemsByName({ searchTerm }).then((res) => {
      console.log(JSON.stringify(res.data));
    });
  };

  const logoutHandler = () => {
    setAuth("");
    setOrderList([]);
  };

 const handleSearch = () => {
    if (Object.keys(authContext["auth"]).length > 0) {
        getAllItemsByNameAuthenticate((searchInput),{
        Authorization: "Bearer " + authContext["auth"],
      }).then(async (res) => {
        let items = res.data.map(item => {
          let itemName = normalizeItemName(item.name);
          return ({ ...item, displayName: itemName});
        });
        setItemList(items);
      });
    } else {
        getAllItemsByName(searchInput).then(async (res) => {
          let items = res.data.map(item => {
            let itemName = normalizeItemName(item.name);
            return ({ ...item, displayName: itemName});
          });
          setItemList(items);
        });
    }
 }


  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.siteTitle}>
        &nbsp; SSF &nbsp;<img src="../../logo.png"></img>
      </Link>

      <div className={classes.search__bar__wrab}>
        <div className={classes.search__bar}>
          <input type="text" placeholder="search..." onChange={(event) => setSearchInput(event.target.value.toLocaleLowerCase())}/>
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} style={{ color: "#266d18" }} />
          </button>
        </div>
      </div>

      {auth ? (
        <ul>
          <CustomLink to="/favorite">My Fav &nbsp; <FontAwesomeIcon icon={faHeart} style={{color: "#e61428"}} /></CustomLink>
          <CustomLink to="/order">My Cart &nbsp; <FontAwesomeIcon icon={faShoppingCart} style={ orderList.length > 0 ? {color: "#ff7000"} : {color: "#E19559" }} /></CustomLink>
          <Link to="/" className={classes.siteTitle} onClick={logoutHandler}>
            Log Out &nbsp; <FontAwesomeIcon icon={faSignOutAlt} style={{color: "#2ab30f"}} />
          </Link>
        </ul>
      ) : (
        <ul>
          <CustomLink to="/favorite">My Fav &nbsp; <FontAwesomeIcon icon={regular.faHeart} style={{color: "#e61428"}} /></CustomLink>
          <CustomLink to="/order">My Cart &nbsp; <FontAwesomeIcon icon={faShoppingCart} style={{color: "#E19559"}} /></CustomLink>
          <CustomLink to="/login">Login &nbsp; <FontAwesomeIcon icon={faSignInAlt} style={{color: "#2ab30f"}} /></CustomLink>
          <CustomLink to="/signup">Sign-Up &nbsp; <FontAwesomeIcon icon={faUserPlus} style={{color: "#2ab30f"}} /></CustomLink>
        </ul>
      )}
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
