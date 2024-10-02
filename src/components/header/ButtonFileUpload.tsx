import { useImageStore } from '@/store/image-store';
import { Button } from '../ui/button'
import { IconPhotoPlus } from '@tabler/icons-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

function ButtonFileUpload() {
  const images = useImageStore((state) => state.images);
  const handleImageUploaded = useImageStore(
    (state) => state.handleImageUploaded
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const [selectedArtist, setSelectedArtist] = useState(""); // Select Artist
  const [newArtistName, setNewArtistName] = useState(""); // New Artist, if its created
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Pre-Visualization from images uploaded

  // Get Artist from images
  const uniqueArtists = [...new Set(images.map((image) => image.artist))];

  // Previsualization images
  const generateImagePreviews = (selectedFiles: FileList) => {
    const previews: string[] = [];
    Array.from(selectedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          previews.push(reader.result.toString());
          if (previews.length === selectedFiles.length) {
            setImagePreviews(previews); // Saving Previsualizations
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handling images uploaded
  const handleUpload = async () => {
    if (files) {
      const artistName = newArtistName || selectedArtist || "Unknown";
      try {
        const event = { target: { files } }; // HandleImageUploaded expect event so we simulate a event
        await handleImageUploaded(event, artistName);
        setFiles(null); // Clear files
        setImagePreviews([]); //  Clear previsualizations
        setIsDialogOpen(false); // Close Dialog
        setNewArtistName(""); //  Clear artist
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  // Handling images uploaded & open dialog
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(selectedFiles);
      generateImagePreviews(selectedFiles);
      setIsDialogOpen(true); // Open Dialog
    }
  };

  return (
    <>
      <Button
        className="flex gap-2 px-2 relative cursor-pointer"
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
      />

      {/* This dialog for select artist & confirm upload*/}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[530px]">
          <DialogTitle className="text-lg font-semibold">
            Select Artist for Images
          </DialogTitle>

          <div className="max-h-40 overflow-scroll flex flex-wrap gap-2 mb-4 scrollbar overflow-x-hidden">
            {imagePreviews.length > 0 &&
              imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="w-36 h-36 object-cover rounded"
                />
              ))}
          </div>

          <Select value={selectedArtist} onValueChange={setSelectedArtist}>
            <span className="text-sm text-[--color-light-tertiary]">
              Select Artist
            </span>
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="Select Artist" />
            </SelectTrigger>
            <SelectContent>
              {uniqueArtists.map((artist) => (
                <SelectItem key={artist} value={artist}>
                  {artist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Input for add new Artist */}
          <div className="">
            <span className="text-sm text-[--color-light-tertiary]">
              Or write new artist for the images:
            </span>
            <Input
              className="mt-4"
              value={newArtistName}
              onChange={(e) => setNewArtistName(e.target.value)}
              placeholder="Unknown"
            />
          </div>

          <Button
            className="mt-2 flex gap-2 px-2 relative cursor-pointer"
            size="sm"
            variant="white"
            onClick={handleUpload}
          >
            <IconPhotoPlus size={20} stroke={2} />
            Upload
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ButtonFileUpload