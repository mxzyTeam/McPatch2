import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {ConfigProvider, FloatButton, theme} from "antd";
import {MoonStar, Sun} from "lucide-react";

const App = () => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <>
      <ConfigProvider
        theme={{token: {colorPrimary: darkMode ? '#D4AF37' : '#5a7d8f'}, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
        <div className="dark:bg-[#0d0d0d] min-h-screen" style={{background: darkMode ? 'linear-gradient(135deg, #0d0d0d 0%, #111111 50%, #0a0a0a 100%)' : 'linear-gradient(135deg, #e8ecf1 0%, #d1d9e6 50%, #e0e5ec 100%)'}}>
          <Outlet/>
          <FloatButton
            icon={darkMode ? <Sun className="w-full h-full"/> : <MoonStar className="w-full h-full"/>}
            tooltip={<div>深色模式</div>}
            onClick={() => setDarkMode(!darkMode)}/>
        </div>
      </ConfigProvider>
    </>
  );
};

export default App;
