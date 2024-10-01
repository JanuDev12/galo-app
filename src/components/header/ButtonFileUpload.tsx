import { useImageStore } from '@/store/image-store';
import { Button } from '../ui/button'
import { IconPhotoPlus } from '@tabler/icons-react';

function ButtonFileUpload() {
  const handleImageUploaded = useImageStore((state) => state.handleImageUploaded)

  const handleOnChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUploaded(event).catch((error) => {
      console.error("Error handling image upload:", error);
    });
  };
  return (
    <>
      <Button
        className="flex gap-2  px-2 relative cursor-pointer"
        size="sm"
        variant="white"
      >
        <IconPhotoPlus size={20} stroke={2} />
        <span>Upload</span>
        <label
          htmlFor="fileUpload"
          className="opacity-0 absolute inset-0 cursor-pointer"
        ></label>
      </Button>
      <input
        id="fileUpload"
        type="file"
        multiple
        accept="image/*"
        className="opacity-0 absolute -z-50"
        onChange={handleOnChange}
      ></input>
    </>
  );
}

export default ButtonFileUpload