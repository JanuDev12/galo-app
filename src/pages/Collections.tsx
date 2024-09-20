import { Button } from '@/components/ui/button';
import Layout from '@/components/main-content/Layout';
import { useCollectionStore } from '@/store/collections-store';
import { useNavigate } from 'react-router-dom';

function Collections() {

  const navigate = useNavigate();

  const collections = useCollectionStore((state) => state.collections)
  const createCollection = useCollectionStore((state) => state.createCollection)

  const handleCreateCollection = () => {
     const collectionName = prompt("Write name collection:");
     if (collectionName) {
       createCollection(collectionName);
     }
   };

  const rightHeader = (
    <Button size="sm" variant="outline" className="flex gap-2 " onClick={handleCreateCollection}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-folder-plus"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
      New
    </Button>
  );

 

  return (
    <Layout
      title="Collections"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-folders"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
        </svg>
      }
      control={rightHeader}
    >
      <div className="py-2 flex gap-x-8 gap-y-16 flex-wrap">
        {collections.length === 0 ? (
          <p>Not Collection created.</p>
        ) : (
          collections.map((collection) => (
            <div
              key={collection.id}
              className="max-w-52 max-h-36 cursor-pointer group"
              onClick={() => navigate(`/collections/${collection.id}`)}
            >
              <div className="flex gap-[2px] w-full h-full rounded-xl overflow-hidden relative">
                <div className="w-full h-full">
                  <img
                    src="/placeholder.jpg"
                    alt="Img 1"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-[2px] w-1/2 h-full">
                  <img
                    src="/placeholder1.png"
                    alt="Img 2"
                    className="object-cover flex-1 "
                  />
                  <img
                    src="/placeholder-2.jpg"
                    alt="Img 3"
                    className="object-cover flex-1"
                  />
                </div>

                {/* background hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="my-2 mx-1">
                <span className="text-sm font-medium">{collection.name}</span>
                <p className="text-xs text-[--color-gray-tertiary]">
                  {collection.imagesCollected.length} photos
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default Collections