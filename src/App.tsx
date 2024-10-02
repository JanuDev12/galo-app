import './App.css'
import "@fontsource-variable/onest";
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Content from './components/main-content/Content';
import { SearchProvider } from './context/SearchContext';

function App() {

  const APP_NAME = "Noisekun";
  const APP_DESCRIPTION =
    "Listen combinations of ambient sounds for relaxing or getting more productive on your task!";
 /*  const APP_URL = process.env.HOSTNAME
    ? `https://${process.env.HOSTNAME}`
    : "http://localhost:3000"; */

    const metadata = {
  /*   metadataBase: new URL(APP_URL), */
    title: `${APP_NAME} — ${APP_DESCRIPTION}`,
    applicationName: APP_NAME,
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    themeColor: "#04A2DC",

    keywords: [
      "noise",
      "sound",
      "ambience",
      "relaxing",
      "productive",
      "noisli",
      "noisekun",
    ],
    authors: [
      {
        name: "Mateus Felipe Gonçalves",
        url: "https://github.com/mateusfg7",
      },
    ],
    viewport: {
      minimumScale: 1,
      initialScale: 1,
      width: "device-width",
      viewportFit: "cover",
    },
    formatDetection: {
      telephone: false,
    },

    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: APP_NAME,
    },
    openGraph: {
      type: "website",
      title: APP_NAME,
      description: APP_DESCRIPTION,
      url: "/",
      images: "/images/banner.png",
    },
    twitter: {
      card: "summary_large_image",
      site: "/",
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: "/images/banner.png",
    },
  };

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
