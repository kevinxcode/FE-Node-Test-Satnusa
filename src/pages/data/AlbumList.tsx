import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  showSweetAlert,
  showLoadingSweetAlert,
  closeLoadingSweetAlert,
} from "../utils/SweetAlert";

import ModalEdit from "./ModalEdit"
import EditPost from "./EditPost"

interface Post {
  albumId: number;
  id: number;
  title: string;
}


const AlbumList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const photo = async (id: string) => {
    router.push(`/photo?id=${id}`);
  };

  return (
    <table className="w-full caption-bottom text-sm">
      <thead className="[&amp;_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  max-w-[150px]">
            #</th>
          <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground  ">
            Title</th>
          <th
            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground   max-w-[100px]">
            Action
          </th>

        </tr>
      </thead>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {posts.map(post => (
          <tr key={post.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle ">{post.id}</td>
            <td className="p-4 align-middle ">{post.title}
            </td>
            <td className="p-2 align-middle">
              <button onClick={() => photo(post.id)} className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-1 px-2 rounded">
                VIEW
              </button>
            </td>

          </tr>
        ))}


      </tbody>
    </table>


  );
};

export default AlbumList;
