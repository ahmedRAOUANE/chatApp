import { useRef } from "react";

// style 
import "../style/formStyle.css";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const emailRef = useRef();
  const displayNameRef = useRef();
  const passwordRef = useRef();

  const handleSignup = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: emailRef.current.value,
      displayName: displayNameRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then(res => {
          updateProfile(res.user, {
            displayName: userCredentials.displayName,
          })
        })
    } catch (err) {
      console.log("Error signup: ", err);
    }
  }

  return (
    <div className="white collumn box">
      <h2>craete an accout</h2>
      <form onSubmit={handleSignup}>
        <div className="input-holder"><input autoComplete="email" id="email" ref={emailRef} type="email" placeholder="email" /></div>
        <div className="input-holder"><input autoComplete="given-name" id="name" ref={displayNameRef} type="text" placeholder="name" /></div>
        <div className="input-holder"><input autoComplete="off" id="password" ref={passwordRef} type="password" placeholder="password" /></div>
        <button type="submit">submit</button>
      </form>
      <hr />
      <span>all ready have an account?, <Link to={"/"}>login</Link></span>
    </div>
  )
}

export default Signup