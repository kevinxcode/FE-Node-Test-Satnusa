import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { setAsyncStorageData, getAsyncStorageData, removeAsyncStorageData } from '../utils/AsyncStorage';

const TopBar = () => {

  useEffect(() => {
    const getProfile = async () => {
      const retrievedData = await getAsyncStorageData("login-user");
      console.log(retrievedData);
    };
    getProfile();
  }, []);

  

  const router = useRouter();
  const home = async () => {
    router.push("/home");
  };

  const album = async () => {
    router.push("/album");
  };

  const signOut = async () => {
    removeAsyncStorageData('login-user');
    router.push("/login");
  };

  return (
    <nav className="bg-blue-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:block">
            <div className="flex-shrink-0">
              <a href="#" className="text-white">FE - KEVIN ALNIZAR</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" onClick={home} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">POST</a>
            {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">TODOS</a> */}
            <a href="#" onClick={album} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">ALBUM</a>
            <a href="#" onClick={signOut} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Out</a>
          </div>

        </div>
      </div>
    </nav>

  );
};

export default TopBar;
