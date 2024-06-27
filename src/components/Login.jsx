import React from "react";
import { useRef, useState } from "react";
import Header from "./Header";
import {checkValidData} from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import {auth} from "../utils/firebase"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { CHILDREN_IMG_URL, DESKTOP_IMG_URL, DESKTOP_VIDEO_URL, DOWNLOADING_GIF_URL, LOGIN_BG, MOBILE_IMG_URL, STRANGER_THINGS_POSTER_URL, TV_IMG_URL, TV_VIDEO_URL, USER_AVATAR } from "../utils/constants";
import lang from "../utils/languageConstants";
import { FaChevronRight } from "react-icons/fa6";
import Footer from "./Footer";
import { BsPlusLg } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAnwser, setShowAnwser] = useState(false);
  const [showAnwser2, setShowAnwser2] = useState(false);
  const [showAnwser3, setShowAnwser3] = useState(false);
  const [showAnwser4, setShowAnwser4] = useState(false);
  const [showAnwser5, setShowAnwser5] = useState(false);
  const [showAnwser6, setShowAnwser6] = useState(false);

  const langKey = useSelector(store => store.config.lang);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleShowAnswer1 = () => {
    setShowAnwser(!showAnwser);
  };
  const handleShowAnswer2 = () => {
    setShowAnwser2(!showAnwser2);
  };
  const handleShowAnswer3 = () => {
    setShowAnwser3(!showAnwser3);
  };
  const handleShowAnswer4 = () => {
    setShowAnwser4(!showAnwser4);
  };
  const handleShowAnswer5 = () => {
    setShowAnwser5(!showAnwser5);
  };
  const handleShowAnswer6 = () => {
    setShowAnwser6(!showAnwser6);
  };

  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  
  const handleButtonClick = () => {
    const message =  checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(!isSignInForm){
      // SignUp Login
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => { 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVATAR
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          }).catch((error) => {
            setErrorMessage(error);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        }
      );
    }else{
      // SignIn Login
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => { 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        }
      );
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <div className="">
        <img src={LOGIN_BG} className="h-screen md:h-full bg-cover w-screen" alt="Netflix BG" />
        <hr className="border-[#232323] border-4" />
        <div className=" w-screen h-[590px] bg-black flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-5xl font-black">{lang[langKey].enjoyOnTV}</h1>
            <p className="w-[550px] text-white text-2xl font-normal">{lang[langKey].enjoyOnTVDetail}</p>
          </div>
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <img src={TV_IMG_URL} className="h-[430px]" alt="TV img" />
            <div className="absolute w-[416px] mb-[15px] mr-[5px] ">
              <video  src={TV_VIDEO_URL} autoPlay loop />
            </div>
          </div>
        </div>
        <hr className="border-[#232323] border-4" />
        <div className=" w-screen h-[590px] bg-black flex justify-center items-center">
          <div className="flex flex-col justify-end items-center overflow-hidden">
            <img src={MOBILE_IMG_URL} className="h-[450px]" alt="mobile img" />
            <div className="absolute flex items-center justify-between gap-4 border-2 border-[#686666] rounded-xl w-[320px] h-28 bg-black mb-7 p-3">
              <div className="flex gap-4 items-center">
                <img src={STRANGER_THINGS_POSTER_URL} className="h-[87px]" alt="Stranger Things" />
                <div>
                  <h1 className="text-xl text-white font-medium">Stranger Things</h1>
                  <h1 className="text-[#0071eb] text-xl font-normal">{lang[langKey].downloadOn}</h1>
                </div>
              </div>
              <img className="w-12" src={DOWNLOADING_GIF_URL} alt="downloading gif" />
            </div>
           </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-5xl font-black w-[480px]">{lang[langKey].download}</h1>
            <p className="w-[560px] text-white text-2xl font-normal">{lang[langKey].downloadDetail}</p>
          </div>
        </div>
        <hr className="border-[#232323] border-4" />
        <div className=" w-screen h-[590px] bg-black flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-5xl font-black">{lang[langKey].watchEverywhere}</h1>
            <p className="w-[500px] text-white text-2xl font-normal">{lang[langKey].watchDetail}</p>
          </div>
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <img src={DESKTOP_IMG_URL} className="h-[430px]" alt="Desktop img" />
            <div className="absolute w-[350px] mb-36 ">
              <video src={DESKTOP_VIDEO_URL} autoPlay loop />
            </div>
           </div>
        </div>
        <hr className="border-[#232323] border-4" />
        <div className=" w-screen h-[590px] bg-black flex justify-center items-center">
          <div className="flex flex-col justify-end items-center overflow-hidden">
            <img src={CHILDREN_IMG_URL} className="h-[450px]" alt="cjildren img" />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-5xl font-black w-[480px]">{lang[langKey].child}</h1>
            <p className="w-[530px] text-white text-2xl font-normal">{lang[langKey].childDetail}</p>
          </div>
        </div>
        <hr className="border-[#232323] border-4" />
        <div className=" w-screen h-auto bg-black flex py-16 flex-col justify-center items-center gap-7">
          <h1 className="text-white text-5xl font-black">Frequently Asked Questions</h1>
          <div className="flex flex-col w-screen justify-center items-center gap-3">
            <div className="w-9/12 flex flex-col items-center cursor-pointer">
              <div className="w-full h-24 p-5 bg-[#232323] flex justify-between items-center" onClick={handleShowAnswer1}>
                <h1 className="text-[28px] text-white">What is Netflix?</h1>
                <button className="text-5xl text-white flex items-center">{!showAnwser ? <BsPlusLg /> : <RxCross1 />}</button>
              </div>
              {
                showAnwser &&
                <div className="w-full h-auto p-5 flex flex-col items-center bg-[#363636] mt-1">
                  <p className="text-[28px] text-white">Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices</p>
                  <p className="text-[28px] text-white">You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!</p>
                </div>
              }
            </div>
            <div className="w-9/12 flex flex-col items-center cursor-pointer">
              <div className="w-full h-24 p-5 bg-[#232323] flex justify-between items-center" onClick={handleShowAnswer2}>
                <h1 className="text-[28px] text-white">How much does Netflix cost?</h1>
                <button className="text-5xl text-white flex items-center">{!showAnwser2 ? <BsPlusLg /> : <RxCross1 />}</button>
              </div>
              {
                showAnwser2 &&
                <div className="w-full h-auto p-5 flex flex-col items-center bg-[#363636] mt-1">
                  <p className="text-[28px] text-white">Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.</p>
                </div>
              }
            </div>
            <div className="w-9/12 flex flex-col items-center cursor-pointer">
              <div className="w-full h-24 p-5 bg-[#232323] flex justify-between items-center" onClick={handleShowAnswer3}>
                <h1 className="text-[28px] text-white">Where can I watch?</h1>
                <button className="text-5xl text-white flex items-center">{!showAnwser3 ? <BsPlusLg /> : <RxCross1 />}</button>
              </div>
              {
                showAnwser3 &&
                <div className="w-full h-auto p-5 flex flex-col items-center bg-[#363636] mt-1">
                  <p className="text-[28px] text-white">Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.</p>
                  <p className="text-[28px] text-white">You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.</p>
                </div>
              }
            </div>
            <div className="w-9/12 flex flex-col items-center cursor-pointer">
              <div className="w-full h-24 p-5 bg-[#232323] flex justify-between items-center" onClick={handleShowAnswer4}>
                <h1 className="text-[28px] text-white">How do I cancel?</h1>
                <button className="text-5xl text-white flex items-center">{!showAnwser4 ? <BsPlusLg /> : <RxCross1 />}</button>
              </div>
              {
                showAnwser4 &&
                <div className="w-full h-auto p-5 flex flex-col items-center bg-[#363636] mt-1">
                  <p className="text-[28px] text-white">Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
                </div>
              }
            </div>
            <div className="w-9/12 flex flex-col items-center cursor-pointer">
              <div className="w-full h-24 p-5 bg-[#232323] flex justify-between items-center" onClick={handleShowAnswer5}>
                <h1 className="text-[28px] text-white">What can I watch on Netflix?</h1>
                <button className="text-5xl text-white flex items-center">{!showAnwser5 ? <BsPlusLg /> : <RxCross1 />}</button>
              </div>
              {
                showAnwser5 &&
                <div className="w-full h-auto p-5 flex flex-col items-center bg-[#363636] mt-1">
                  <p className="text-[28px] text-white">Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
                </div>
              }
            </div>
            <div className="w-9/12 flex flex-col items-center cursor-pointer">
              <div className="w-full h-24 p-5 bg-[#232323] flex justify-between items-center" onClick={handleShowAnswer6}>
                <h1 className="text-[28px] text-white">Is Netflix good for kids?</h1>
                <button className="text-5xl text-white flex items-center">{!showAnwser6 ? <BsPlusLg /> : <RxCross1 />}</button>
              </div>
              {
                showAnwser6 &&
                <div className="w-full h-auto p-5 flex flex-col items-center bg-[#363636] mt-1">
                  <p className="text-[28px] text-white">The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.</p>
                  <p className="text-[28px] text-white">Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.</p>
                </div>
              }
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <p className="text-white text-xl">Ready to watch? Enter your email or mobile number to create or restart your membership.</p>
            <div className="flex justify-center items-center gap-2">
              <input type="text" placeholder="Email or Mobile Number" className="py-3 px-5 w-96 placeholder:text-white rounded-md bg-slate-800 text-xl" />
              <button className="flex items-center justify-center text-2xl text-white bg-red-600 p-2 w-52 rounded-md">Get Started <FaChevronRight />   </button>
            </div>
          </div>
        </div>
        <hr className="border-[#232323] border-4" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute p-12 sm:w-1/2 md:w-3/12 h-[500px] mt-36 mx-auto text-white bg-black bg-opacity-80 right-0 rounded-lg left-0 flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl py-4 mr-auto">{ isSignInForm ? <>{lang[langKey].signIn}</> : <>{lang[langKey].signUp}</> }</h1>
        {!isSignInForm && <input type="text" ref={name} placeholder={lang[langKey].fnmPlaceholder} className="px-3 py-2 m-2 w-full bg-gray-600 " required />}
        <input type="text" ref={email} placeholder={lang[langKey].emailPlaceholder} className="px-3 py-2 my-3 w-full bg-gray-600 " required />
        <input type="password" ref={password} placeholder={lang[langKey].passwordPlaceholder} className="px-3 py-2 my-3 w-full bg-gray-600 " required />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button className="p-3 my-6 bg-red-600 rounded-lg w-full" onClick={handleButtonClick}>{isSignInForm ? <>{lang[langKey].signIn}</> : <>{lang[langKey].signUp}</> }</button>
        <p className="p-4 mr-auto text-lg text-gray-400" >{isSignInForm ? <>{lang[langKey].newToNetflix}</> : <>{lang[langKey].alreadyRegister}</> } <span onClick={toggleSignUpForm} className="text-white cursor-pointer hover:underline font-bold"> { isSignInForm ? <>{lang[langKey].signUpNow}</> : <>{lang[langKey].signInNow}</> }</span></p>
      </form>
      <Footer />
    </div>
  )
}

export default Login;
