import ButtonFileUpload from "./ButtonFileUpload";
import SearchBar from "./SearchBar";


function Header() {
  return (
    <header className="header py-3 px-3 bg-[--color-secondary] flex items-center justify-between">
      <div>
        <SearchBar />
      </div>
      <div className=" mr-10">
        <ButtonFileUpload />
      </div>
    </header>
  );
}

export default Header