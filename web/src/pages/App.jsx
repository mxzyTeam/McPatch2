import React, {useEffect, useState, useCallback} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {ConfigProvider, FloatButton, theme} from "antd";
import {MoonStar, Sun} from "lucide-react";

const App = () => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [themeTransition, setThemeTransition] = useState(false);
  const [iconSpin, setIconSpin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setThemeTransition(true);
    setIconSpin(true);
    setDarkMode(prev => !prev);
    setTimeout(() => {
      setThemeTransition(false);
      setIconSpin(false);
    }, 500);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{token: {colorPrimary: darkMode ? '#D4AF37' : '#5a7d8f'}, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
        <div
          className={`dark:bg-[#0d0d0d] min-h-screen ${themeTransition ? 'neu-theme-transition' : ''}`}
          style={{background: darkMode ? 'linear-gradient(135deg, #0d0d0d 0%, #111111 50%, #0a0a0a 100%)' : 'linear-gradient(135deg, #e8ecf1 0%, #d1d9e6 50%, #e0e5ec 100%)'}}>
          <div key={location.pathname} className="neu-page-enter">
            <Outlet/>
          </div>
          <FloatButton
            icon={iconSpin
              ? <div className="neu-rotate-in w-full h-full flex items-center justify-center">{darkMode ? <Sun className="w-full h-full"/> : <MoonStar className="w-full h-full"/>}</div>
              : (darkMode ? <Sun className="w-full h-full"/> : <MoonStar className="w-full h-full"/>)}
            tooltip={<div>深色模式</div>}
            onClick={toggleDarkMode}/>
        </div>
      </ConfigProvider>
    </>
  );
};

export default App;
