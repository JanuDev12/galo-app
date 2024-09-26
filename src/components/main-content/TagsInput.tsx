import { useImageStore } from '@/store/image-store';
import { useState } from 'react'
import { WithContext as ReactTags } from "react-tag-input";



const TagsInput = ({ imageId }: { imageId: number }) => {
    const { images, addTagToImage } = useImageStore();
    const image = images.find((img) => img.id === imageId);
     const [tags, setTags] = useState(
       image?.tags?.map((tag) => ({ id: tag, text: tag, className: "" })) ?? []
     );

     const handleAddition = (tag: { id: string; text: string }) => {
       const newTags = [...tags, tag]; // Concatenar el nuevo tag a la lista existente
       setTags(newTags); // Actualizar el estado
        addTagToImage(imageId, tag.text); // Agregar el tag a la imagen en el store
     };

    const handleDelete = (i: number) => {
        const newTags = tags.filter((_, index) => index !== i);
        setTags(newTags);
        // Implement store delete
    }

    return (
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
      />
    );
}

export default TagsInput