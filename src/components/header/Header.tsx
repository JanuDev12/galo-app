import { Input } from "../ui/input";

function Header() {
  return (
    <header className="header py-4 px-3 bg-[--color-secondary]">
      <div>
        <Input
          placeholder="Search in All Photos"
          className="w-72 inline-flex"
        />
      </div>
      <div></div>
    </header>
  );
}

export default Header