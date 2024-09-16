import { Input } from "../ui/input";
import ButtonFileUpload from "./ButtonFileUpload";

function Header() {
  return (
    <header className="header py-4 px-3 bg-[--color-secondary] flex items-center justify-between">
      <div>
        <Input
          placeholder="Search in All Photos"
          className="w-72 inline-flex"
        />
      </div>
      <div className=" mr-10">
        <ButtonFileUpload />
      </div>
    </header>
  );
}

export default Header