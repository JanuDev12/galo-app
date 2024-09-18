import { useImageStore } from '@/store/image-store';
import { Button } from '../ui/button'

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
          className="icon icon-tabler icons-tabler-outline icon-tabler-photo-plus pointer-events-none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
          <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
          <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
        </svg>

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