import Gallery from '@/components/main-content/Gallery';
import ControlButtons from '@/components/main-content/header-controls/ControlButtons';
import HeaderInfo from '@/components/main-content/header-controls/HeaderInfo';
import Layout from '@/components/main-content/Layout';
import { useSearchContext } from '@/context/SearchContext';
import { useSearch } from '@/hooks/useSearch';
import { useCollectionStore } from '@/store/collections-store';
import { IconFolder } from '@tabler/icons-react';
import { useEffect } from 'react';

import {  useParams } from 'react-router-dom'

function CollectionName() {
    const {id} = useParams<{id: string }>();
    const { searchTerm, setPlaceholder, tags } = useSearchContext();

    const collections = useCollectionStore((state) => state.collections);
  

    //Searching the collection ID
    const actualCollection = collections.find((col) => col.id === Number(id));

    if(!actualCollection){
        return <p>Collection Not Found</p>
    }

      const collectionImages = actualCollection.imagesCollected;

   // Getting images belong in the collection
      /* const collectionImages = filteredImagesCollected.filter(
        (img) => img.id === actualCollection.id
      ); */


       const filteredImages = useSearch(collectionImages, {
         searchTerm,
         searchFields: ["name", "artist", "tags"],
         tags
       });

    const controls = (
      <ControlButtons
        images={filteredImages}
        collectionId={actualCollection.id}
        isCollectionPage={true}
      />
    );


    useEffect(() => {
      setPlaceholder(`Search in ${actualCollection.name}`);
    }, [setPlaceholder]);

    return (
      <Layout
        title={actualCollection.name}
        icon={<IconFolder size={24} stroke={2} />}
        pageHeader={controls}
        info={<HeaderInfo countPhotos={filteredImages.length} />}
      >
        <Gallery images={filteredImages} />
      </Layout>
    );
}

export default CollectionName