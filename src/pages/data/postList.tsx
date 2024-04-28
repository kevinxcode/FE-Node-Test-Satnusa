import { useState, useEffect } from 'react';
import {
  showSweetAlert,
  showLoadingSweetAlert,
  closeLoadingSweetAlert,
} from "../utils/SweetAlert";

import ModalEdit from "./ModalEdit"
import EditPost from "./EditPost"

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Item {
  id: number;
}




const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
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

  const deletePost = (value: number) => {
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

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const [editItemId, setEditItemId] = useState<string[]>([]);
  const items: Item[] = []; // Your list of items

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEditItemId(data);
      setIsOpen(true);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }

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
            Action</th>

        </tr>
      </thead>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {posts.map(post => (
          <tr key={post.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle ">{post.id}</td>
            <td className="p-4 align-middle ">{post.title}
            </td>
            <td className="p-2 align-middle">

              <button onClick={() => handleEdit(post.id)} className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-1 px-2 rounded">
                EDIT
              </button>
              <button key={post.id} onClick={() => deletePost(post.id)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                DELETE
              </button>

            </td>

          </tr>
        ))}

        <ModalEdit isOpen={isOpen} onClose={closeModal} title="Edit Post" >
          <EditPost dataId={editItemId} />
        </ModalEdit>

      </tbody>
    </table>


  );
};

export default PostList;
