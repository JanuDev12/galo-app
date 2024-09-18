import Controls from './controls/Controls';
import Gallery from './Gallery';

function MainContent() {
  return (
    <main className="content  bg-[--color-primary] ">
      <div className="h-full w-full">
        <div className="flex flex-col mx-16 my-7 gap-3">
          <Controls />
          <Gallery />
        </div>
      </div>
    </main>
  );
}

export default MainContent