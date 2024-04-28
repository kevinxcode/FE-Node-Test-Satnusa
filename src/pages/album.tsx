// pages/index.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "./components/TopBar";
import { Session } from "./utils/Session";
import Spinner from "./components/Spinner";
import AlbumList from "./data/AlbumList";
import { setAsyncStorageData, getAsyncStorageData, removeAsyncStorageData } from './utils/AsyncStorage';


const Album = () => {
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

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (isPage) {
    return (
      <div>
        <TopBar />
        <main className="flex flex-1 flex-col p-4 md:p-6">
          <div className="flex items-center mb-8">
            <h1 className="font-semibold text-lg md:text-2xl">Album List</h1>
          </div>
         
          <div className="border shadow-sm rounded-lg">
            <div className="relative w-full overflow-auto">
              <AlbumList datasID={UserID} />
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Spinner />
  }
};

export default Album;
