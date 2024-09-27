import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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