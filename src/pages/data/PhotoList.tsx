import { useState, useEffect } from 'react';
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
  url: string;
  thumbnailUrl: string;
}

interface GetProps {
  getId: string; // Update dataId type
}

const PhotoList: React.FC<GetProps> = ({ getId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${getId}/photos`);
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

  const deletePost = (value: string) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${value}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        showSweetAlert('Post deleted:' + value, 'success')
        return response.json();
      })
  }



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
            Image
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
            <img src={post.thumbnailUrl} alt={`Thumbnail ${post.id}`} />
            </td>

          </tr>
        ))}


      </tbody>
    </table>


  );
};

export default PhotoList;
