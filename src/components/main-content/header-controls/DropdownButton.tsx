import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface DropdownButtonProps {
  icon: React.ReactElement<SVGElement>;
}



function DropdownButton({icon}: DropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex gap-3 px-2">
          {icon}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 9l6 6l6 -6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value="date-c">
          <DropdownMenuRadioItem value="date-c">
            {icon}
            Date created
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="date-m">
            {icon}
            Date modified
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">
            {icon}
            Name
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
       {/*  FALTA EL SEPARADOR  */}



      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownButton