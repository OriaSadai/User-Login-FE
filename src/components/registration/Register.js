import React, {useRef, useState, useEffect, Fragment} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';
import classes from "./Register.module.css";
import {createNewUser} from "../../services/api";
import {Link} from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // when component load we set the focus on the userInput top be on
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // every time the user state change we want to validate the user input with the regex
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    // every time the password or the match password change we want to validate the password with the regex
    // and validate that the matched password is indeed match the password
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    // every time we change any input we don't want to show error massege
    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if button enabled with JS hack
        const emailValidation = EMAIL_REGEX.test(email)
        const usernameValidation = USER_REGEX.test(username);
        const pwsValidation = PWD_REGEX.test(pwd);
        if (!emailValidation || !usernameValidation || !pwsValidation) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const newUserBody = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                username: username,
                password: pwd
            }
            const res = await createNewUser(newUserBody);
            setSuccess(true);

            //clear state and controlled inputs
            setFirstName('');
            setLastName('');
            setEmail('');
            setAddress('');
            setUsername('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <Fragment>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to={"/login"}>Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" id="firstName" autoComplete="off" onChange={(event) => setFirstName(event.target.value)} value={firstName} required />
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" id="lastName" autoComplete="off" onChange={(event) => setLastName(event.target.value)} value={lastName} required />
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? classes.hide : classes.invalid} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="emailnote" className={userFocus && email && !validEmail ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Legel email is with '@' and '.' !
                        </p>
                        <label htmlFor="tel">Phone number:</label>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="tel" autoComplete="off" onChange={(event) => setPhoneNumber(event.target.value)} value={phoneNumber} required />
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" autoComplete="off" onChange={(event) => setAddress(event.target.value)} value={address} required />
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validUsername ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? classes.hide : classes.invalid} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            required
                            // when user focus on the input we want to set the userFocus to true
                            onFocus={() => setUserFocus(true)}
                            // when user leave the input (blur) we want to set the userFocus to false
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validUsername ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? classes.hide : classes.invalid} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? classes.valid : classes.hide} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? classes.hide : classes.invalid} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(event) => setMatchPwd(event.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validUsername || !validPwd || !validMatch ? true : false}>Sign Up</button>

                    </form>
                    <p>
                        Already registered?<br />
                        <span className={classes.line}>
                            {/*put router link here*/}
                            <Link to={"/login"}>Sign In</Link>
                        </span>
                    </p>
                </section>
                )}
        </Fragment>
    )
}

export default Register;