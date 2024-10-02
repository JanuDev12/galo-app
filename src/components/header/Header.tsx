import ButtonFileUpload from "./ButtonFileUpload";
import SearchBar from "./SearchBar";


function Header() {
  return (
    <header className="header py-3 px-3 bg-[--color-secondary] flex items-center justify-between fixed ml-36 sm:ml-44 md:ml-48 z-20 lg:w-[85.5%] md:w-[75%] w-[65%]">
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