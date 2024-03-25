import React, {useRef, useState, useEffect, Fragment, useContext} from "react";
import classes from "./Login.module.css";
import { authenticate } from "../../services/api";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, pwd]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userBody = {
                username: username,
                password: pwd
            }
            const res = await authenticate(userBody);
            setSuccess(true);
            setAuth(res.data.jwt)
            setUsername("");
            setPwd("");
        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response.status === 403) {
                setErrMsg("Incorrect Username Or Password");
            } else {
                setErrMsg("Authentication Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <Fragment>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to={"/"}>Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? classes.error_mes : "offscreen"}>
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />
                        <button type="submit" disabled={!username || !pwd}>
                            Sign In
                        </button>
                    </form>
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
                            <Link to="/signUp">Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </Fragment>
    );
}

export default Login;
