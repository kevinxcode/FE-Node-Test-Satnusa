// pages/index.js
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import FloatingButton from "./components/FloatingButton";
import TopBar from "./components/TopBar";
import { Session } from "./utils/Session";
import Spinner from "./components/Spinner";


const Home = () => {
  const router = useRouter();
  const [isPage, setisPage] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const sessData = await Session();
       if(sessData==0){
          router.push("/login");
       }else{
         setisPage(true)
       }
    }
    return () => {
      setTimeout(() => {
        checkSession();
      }, 400); 
     
    };

  }, []);
  if (isPage) {
  return (
    <div className="flex flex-col min-h-[90vh]">
      <TopBar data={"ADD POST"} />
      <FloatingButton />
      <div className="flex mx-4 items-center justify-center mt-20">
        <div className="p-8 rounded-3xl bg-white max-w-xl min-h-[65vh] w-full">
         
          <div aria-label="content" className="mt-9 grid gap-2.5">
           {/*  */}
           <form className="bg-white   px-4 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center mt-8 ">
                  <button
                   
                    className="bg-gray-800 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    SIGN IN
                  </button>
                </div>
               
              </form>
           {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
  }else{
    return <Spinner />;
  }
};

export default Home;
