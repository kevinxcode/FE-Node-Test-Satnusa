// pages/index.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "./components/TopBar";
import { Session } from "./utils/Session";
import Spinner from "./components/Spinner";
import PostList from "./data/postList"
import AddPost from "./data/AddPost"
import { setAsyncStorageData, getAsyncStorageData, removeAsyncStorageData } from './utils/AsyncStorage';

import Modal from "./data/Modal";
import { json } from "stream/consumers";


const Home = () => {
  const router = useRouter();
  const [isPage, setisPage] = useState(false);
  const [UserID, setUserID] = useState('');
  useEffect(() => {
    getUsers();
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
  
 const getUsers = async () => {
    const retrievedData = await getAsyncStorageData('login-user'); // Replace 'your-storage-key' with your actual key
    if (retrievedData !== null) {
      const obj = JSON.parse(retrievedData);
      setUserID(obj.id);
    }
  };

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const openModal_add = () => setIsOpenAdd(true);
  const closeModal_add = () => setIsOpenAdd(false);

  if (isPage) {
    return (
      <div>
        <TopBar />
        <main className="flex flex-1 flex-col p-4 md:p-6">
          <div className="flex items-center mb-8">
            <h1 className="font-semibold text-lg md:text-2xl">Post List</h1>
          </div>
          <div className="w-full mb-4">
            <button onClick={openModal_add} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              ADD POST
            </button>
            
            <Modal isOpen={isOpenAdd} onClose={closeModal_add} title="Add Post">
              <AddPost />
            </Modal>
          </div>
          <div className="border shadow-sm rounded-lg">
            <div className="relative w-full overflow-auto">
              <PostList datasID={UserID} />
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
