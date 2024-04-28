// pages/index.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  setAsyncStorageData,
  getAsyncStorageData,
  removeAsyncStorageData,
} from "./utils/AsyncStorage";

import {
  showSweetAlert,
  showLoadingSweetAlert,
  closeLoadingSweetAlert,
} from "./utils/SweetAlert";

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}


const Login = () => {
  const router = useRouter();
  const [isPage, setisPage] = useState(false);
  const [Users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const LOGIN = async (id: number) => {
    showLoadingSweetAlert();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      const jsonData = await response.json();
      setAsyncStorageData("login-user", JSON.stringify(jsonData));
      showSweetAlert("Sigin Success", "success");
      setTimeout(() => {
        router.push("/home");
      }, 800);
      
    } catch (error) {
      showSweetAlert("network error", "error");
    }
  };

 
  return (
    <div>
     
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">User </h1>
        </div>string
       
        <div className="border shadow-sm rounded-lg">
          <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
      <thead className="[&amp;_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  max-w-[150px]">
            #</th>
          <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  ">
            Name</th>
            <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  ">
            Username</th>
            <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  ">
            Email</th>
            <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  ">
            Phone</th>
            <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  ">
            Website</th>
          <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground   max-w-[100px]">
            Action
          </th>
          string
        </tr>
      </thead>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {Users.map(dt => (
          <tr key={dt.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle ">{dt.id}</td>
            <td className="p-4 align-middle ">{dt.name}</td>
            <td className="p-4 align-middle ">{dt.username}</td>
            <td className="p-4 align-middle ">{dt.email}</td>
            <td className="p-4 align-middle ">{dt.phone}</td>
            <td className="p-4 align-middle ">{dt.website}</td>
            <td className="p-2 align-middle">
              <button onClick={() => LOGIN(dt.id)} className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-1 px-2 rounded">
                SIGN IN
              </button>
            </td>

          </tr>
        ))}


      </tbody>
    </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
