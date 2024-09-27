import { useImageStore } from '@/store/image-store';
import { useState } from 'react'
import { WithContext as ReactTags } from "react-tag-input";

 

interface Tag {
  id: string;
  text: string;
  className?: string
}



const TagsInput = ({ imageId }: { imageId: number }) => {
    const images = useImageStore((state) => state.images);
    const updateImageAttributes = useImageStore(
      (state) => state.updateImageAttributes
    );

    const image = images.find((img) => img.id === imageId);

     const [tags, setTags] = useState<Tag[]>(
       image?.tags?.map((tag) => ({ id: tag, text: tag, className: "" })) ?? []
     );

     const updateTags = (newTags: Tag[]) => {
      setTags(newTags);
      const updatedTagStrings = newTags.map((tag) => tag.text);
      updateImageAttributes(imageId, { tags: updatedTagStrings }).catch(
        console.error
      );
     }

     const handleAddition = (tag: { id: string; text: string }) => {
      const newTags = [...tags, tag]
      updateTags(newTags)
     };

    const handleDelete = (imageId: number) => {
       const newTags = tags.filter((_, index) => index !== imageId);
       updateTags(newTags);
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