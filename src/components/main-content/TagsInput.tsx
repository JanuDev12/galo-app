import { useImageStore } from '@/store/image-store';
import { useState } from 'react'
import { WithContext as ReactTags } from "react-tag-input";

 // STATE TAGS
/*   const [tag, setTag] = useState([
    { id: "India", text: "India", className: "" },
    { id: "Vietnam", text: "Vietnam", className: "" },
    { id: "Turkey", text: "Turkey", className: "" },
  ]);

   const suggestions = TAGS.map((tag) => {
     return {
       id: tag,
       text: tag,
       className: "",
     };
   }); 

  const handleDelete = (index: number) => {
    setTag(tag.filter((_, i) => i !== index));
  };
  const onTagUpdate = (index: number, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTag(updatedTags);
  };

  const handleAddition = (tag) => {
    setTag((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    
    setTag(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTag([]);
  }; */




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