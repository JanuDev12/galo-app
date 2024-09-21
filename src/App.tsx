import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "@fontsource-variable/onest";
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Content from './components/main-content/Content';
import { Route, Routes } from 'react-router-dom';
import Collections from './pages/Collections/Collections';
import Artists from './pages/Artists/Artists';

function App() {

  return (
    <>
      <div className="h-screen">
        <div className="layout h-full w-full ">
          <Header />
          <Sidebar />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App
