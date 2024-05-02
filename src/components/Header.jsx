import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";
import { toggleGPTSearchView } from "../redux/gptSlice";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      }
    );

    // unsubscribe when component unmount
    return () => unsubscribe();

  },[]);

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  }

  return (
    <div className="absolute flex justify-between w-full px-8 py-2 bg-gradient-to-b from-black z-10">
        <img className="w-40" src={NETFLIX_LOGO} alt="Netflix logo"/>
        {user && 
          <div className=" flex items-center justify-center p-2">
            <button onClick={handleGPTSearchClick} className="py-2 px-5 my-2 mx-5 bg-blue-500 text-white rounded-lg">GPT Search</button>
            <img className="w-9 h-9" src={user?.photoURL} alt="usericon" />
            <button onClick={handleSignOut} className="font-bold text-white ml-3">Sign Out</button>
          </div>
          }
    </div>
  )
}

export default Header;