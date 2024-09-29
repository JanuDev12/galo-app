import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import TagsInput from './TagsInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect, useState } from 'react';
import { useImageStore } from '@/store/image-store';

interface EditImageDialogProps {
    imageId: number;
    imageSrc: string;
    onDelete: () => void
}

function EditImageDialog({ imageId, imageSrc, onDelete}: EditImageDialogProps) {

   const images = useImageStore((state) => state.images);
   const updateImageAttributes = useImageStore((state) => state.updateImageAttributes)

   const uniqueArtists = [...new Set(images.map((image) => image.artist))];

   const image = images.find((img) => img.id === imageId);

   // funcion para actualizar la imagen

   const [name, setName] = useState("");

   const [selectedArtist, setSelectedArtist] = useState("")

   const [newArtistName, setNewArtistName] = useState("");

   const handleSaveChanges = () => {
    const updatedImage = {
      ...image,
      name: name ?? image?.name ,
      artist: selectedArtist || image?.artist
    }

    updateImageAttributes(imageId, updatedImage).catch(console.error)

    if (newArtistName) {
      // if a new artist then add
      updatedImage.artist = newArtistName;

    }

    // Funcion para actualizar la imagen
    

   }

   useEffect(() => {
    setName(image?.name ?? "")
    setSelectedArtist(image?.artist ?? "")
   },[image])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-[--color-light-tertiary] size-8 p-1 rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[550px]" aria-description='ad'>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <div className="flex gap-7">
          <div className="flex flex-col w-[50%] gap-3">
            <div className="flex flex-col gap-2 justify-between">
              <span className="text-sm">Name</span>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <span className="text-sm">Tags</span>
              <TagsInput imageId={imageId} />
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <span className="text-sm">Artist</span>

              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
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

              {/* PONER EN CASO DE QUERER Añadir artista */}
            </div>
          </div>

          <div className="flex-1">
            <img src={imageSrc} alt="as" className="rounded-xl" />
          </div>
        </div>

        <DialogFooter className="justify-between mt-6">
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="white" onClick={handleSaveChanges}> Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditImageDialog