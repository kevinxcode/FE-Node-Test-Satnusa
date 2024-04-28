// pages/photo.tsx

import { useRouter } from 'next/router';
import { NextPage } from 'next';
import TopBar from "./components/TopBar";
import PhotoList from "./data/PhotoList";

const PhotoPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Handle case when id is not available or not a string
  if (typeof id !== 'string') {
    return (
      <div>
        <TopBar />
        <main className="flex flex-1 flex-col p-4 md:p-6">
          <div className="flex items-center mb-8">
            <h1 className="font-semibold text-lg md:text-2xl">Photo List</h1>
          </div>
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Photo List : {id}</h1>
        </div>
        <div className="border shadow-sm rounded-lg">
          <div className="relative w-full overflow-auto">
            <PhotoList getId={id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoPage;
