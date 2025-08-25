import React, { useState, useRef } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {

      
      const message = checkValidData(email.current.value, password.current.value);
      setErrorMessage(message);

      if(message)
          return;

      if(!isSignInForm){
        //Sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: "https://imgs.search.brave.com/rPzVUR2caeyTolbQULbrT1i2pWUQVQT7PfY7XW7ZR_0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9wcm9maWxl/LWljb24tc3ZnLXBu/Zy1kb3dubG9hZC0z/OTg1Nzk5LnBuZz9m/PXdlYnAmdz0xMjg"
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                  addUser({
                      uid: uid, 
                      email: email, 
                      displayName: displayName,
                      photoURL: photoURL
                  }));
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
      }
      else {
        // Sign In Logic
        signInWithEmailAndPassword(auth,email.current.value,password.current.value).then((userCredential) => {
            const user = userCredential.user;
            navigate('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }

    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };


  return (
    <div>
      <Header />
      <div>
        <img className="absolute" src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-3xl bg-opacity-70">
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
            <input 
            ref={name}
            type="text" 
            placeholder="Full Name" 
            className="p-4 my-4 w-full bg-gray-900 rounded-xl " />
        )}
        
        <input 
            ref={email}
            type="text" 
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-900 rounded-xl " />
        <input 
            ref={password}
            type="password" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-900 rounded-xl " 
        />
        
        <p className='text-red-700 font-bold text-xl px-4'>{errorMessage}</p>
        <button 
          className="p-4 my-4 bg-red-700 w-full rounded-xl font-bold" 
          onClick={handleButtonClick}
          > 
            {isSignInForm ? "Sign In" : "Sign Up"} 
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign Up Now" : "Already registered ? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login;
