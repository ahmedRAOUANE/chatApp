import { useRef } from "react";
import { setUser } from "../store/userSlice";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

// style 
import "../style/formStyle.css";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            const response = await signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
            const user = response.user;
            dispatch(setUser(user));
        } catch (err) {
            console.log('Error userSlice: ', err);
        }
    }

    return (
        <div className="white collumn box">
            <h2>login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-holder"><input autoComplete="email" id="email" ref={emailRef} type="email" placeholder="email" /></div>
                <div className="input-holder"><input autoComplete="off" id="password" ref={passwordRef} type="password" placeholder="password" /></div>
                <button type="submit">submit</button>
            </form>
            <hr />
            <span>you don&apos;t have an account?, <Link to={'/signup'}>Signup</Link></span>
        </div>
    )
}

export default Login;