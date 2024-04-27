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
      <main className="flex flex-1 flex-col p-4 md:p-6">
    <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Post List</h1>
    </div>
    <div className="w-full mb-4">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
 ADD POST
</button>


    </div>
    <form className="border shadow-sm rounded-lg">
        <div className="relative w-full overflow-auto">
           <PostList />
        </div>
    </form>
</main>
    );
  } else {
    return <Spinner />
  }
};

export default Home;
