import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { IconPencil } from '@tabler/icons-react';

interface CustomDialogProps {
  onDelete: () => void;
}

function EditCollectionDialog({  onDelete }: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-[--color-light-tertiary] size-8 p-1 rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <IconPencil size={18} stroke={1.5} />

        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[350px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-sm">Name</span>
            <Input />
          </div>
        </div>

        <DialogFooter className="justify-between mt-6">
          <Button variant="destructive" onClick={onDelete}>
            Delete Collection
          </Button>
          <Button variant="white"> Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCollectionDialog