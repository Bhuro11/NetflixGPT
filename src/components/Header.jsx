import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANG } from "../utils/constants";
// import { toggleGPTSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";
import { LuLogOut } from "react-icons/lu";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  };

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

  // const handleGPTSearchClick = () => {
  //   dispatch(toggleGPTSearchView());
  // };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute flex md:flex-row justify-center items-center w-full px-8 py-2 bg-gradient-to-b from-black z-10  ">
      <div className="w-10/12 flex flex-col sm:flex sm:flex-row justify-between items-center">
        <img className="w-40 mx-auto md:mx-0" src={NETFLIX_LOGO} alt="Netflix logo"/>
        {!user && 
          <select className=" w-20 md:w-28 py-2 md:px-5 bg-transparent border border-white rounded-md text-white m-2" onChange={handleLanguageChange}>
            {
              SUPPORTED_LANG.map(lang => 
                <option key={lang.identifier} value={lang.identifier} className="text-black">{lang.name}</option>
              )
            }
          </select>
        }
      </div>
        {user && 
          <div className=" flex items-center justify-center p-2">
            { showGptSearch &&
              <select className=" md:p-2 md:px-5 bg-gray-800 text-white m-2" onChange={handleLanguageChange}>
                {
                  SUPPORTED_LANG.map(lang => 
                    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                  )
                }
              </select>
            }
            {/* <button onClick={handleGPTSearchClick} className="py-2 px-5 my-2 mx-5 bg-blue-500 text-white rounded-lg">
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button> */}
            <img className="hidden sm:inline-block w-9 h-9" src={user?.photoURL} alt="usericon" />
            <button onClick={handleSignOut} className="font-bold text-white ml-3 text-2xl"><LuLogOut /></button>
          </div>
        }
      
    </div>
  )
}

export default Header;