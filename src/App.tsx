import './App.css'
import "@fontsource-variable/onest";
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Content from './components/main-content/Content';
import { SearchProvider } from './context/SearchContext';
import DialogBeta from './components/main-content/DialogBeta';


function App() {

 


  return (
    <>
      <SearchProvider>
        <div className="h-screen">
          <div className="layout h-full w-full ">
            <Header />
            <Sidebar />
            <Content />
          </div>
          <DialogBeta />
        </div>
      </SearchProvider>
    </>
  );
}

export default App
