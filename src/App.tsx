import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "@fontsource-variable/onest";
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import MainContent from './components/main-content/mainContent';

function App() {

  return (
    <>
    
     <div className="layout h-screen w-screen">
      <Header />
      <Sidebar />
      <MainContent />
     </div>
    </>
  )
}

export default App
