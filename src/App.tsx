import './App.css'
import "@fontsource-variable/onest";
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Content from './components/main-content/Content';
import { SearchProvider } from './context/SearchContext';


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
        </div>
      </SearchProvider>
    </>
  );
}

export default App
