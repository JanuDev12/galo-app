import Gallery from '@/components/main-content/Gallery';
import ControlButtons from '@/components/main-content/header-controls/ControlButtons';
import HeaderInfo from '@/components/main-content/header-controls/HeaderInfo';
import Layout from '@/components/main-content/Layout';
import { useCollectionStore } from '@/store/collections-store';
import { useImageStore } from '@/store/image-store';
import { useParams } from 'react-router-dom'

function CollectionName() {
    const {id} = useParams<{id: string }>();
    const collections = useCollectionStore((state) => state.collections);
    const images = useImageStore((state) => state.images)

    //Searching the collection ID
    const actualCollection = collections.find((col) => col.id === Number(id));

    if(!actualCollection){
        return <p>Collection Not Found</p>
    }

    // Getting the ImageId in the collection
    const collectionImageIds = actualCollection.imagesCollected.map((image) => image.id)

    //Filter images belong in the collection
    const collectionImages = images.filter((image) => collectionImageIds.includes(image.id))

    const controls = <ControlButtons images={images} />;
    return (
      <Layout
        title={actualCollection.name}
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
        pageHeader={controls}
        info={<HeaderInfo countPhotos={collectionImages.length} />}
      >
        <Gallery images={collectionImages} />
      </Layout>
    );
}

export default CollectionName