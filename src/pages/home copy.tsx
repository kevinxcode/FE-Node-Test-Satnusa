// pages/index.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FloatingButton from "./components/FloatingButton";
import TopBar from "./components/TopBar";
import { Session } from "./utils/Session";
import Spinner from "./components/Spinner";
import PostList from "./data/postList" 

const Home = () => {
  const router = useRouter();
  const [isPage, setisPage] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const sessData = await Session();
      if (sessData == 0) {
        router.push("/login");
      } else {
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
        <TopBar data={"HOME"} />
       
        <main className="flex flex-col items-center justify-center w-full flex-1 sm:px-20 text-center my-20">
          <div className="flex-grow flex  justify-center">
            <div className="container mx-auto px-4 py-8">
              {/* Your dashboard content goes here */}
            
                {/*  */}
                <PostList />
                
                {/*  */}
             
              {/* end content */}
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Spinner />
  }
};

export default Home;
