import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {ConfigProvider, FloatButton, theme} from "antd";
import {MoonStar, Sun} from "lucide-react";

const App = () => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [themeTransition, setThemeTransition] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);
  const [iconScale, setIconScale] = useState(1);
  const location = useLocation();
  const rotatingRef = useRef(false);

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
    setDarkMode(prev => !prev);

    // 切换按钮旋转动画 - 用内联 style 驱动
    if (!rotatingRef.current) {
      rotatingRef.current = true;
      setIconScale(0.5);
      setTimeout(() => {
        setIconRotation(prev => prev + 360);
        setIconScale(1);
      }, 150);
      setTimeout(() => {
        rotatingRef.current = false;
      }, 600);
    }

    setTimeout(() => {
      setThemeTransition(false);
    }, 800);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{token: {colorPrimary: darkMode ? '#D4AF37' : '#5a7d8f'}, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
        <div
          className={`dark:bg-[#0d0d0d] min-h-screen ${themeTransition ? 'neu-theme-transition' : ''}`}
          style={{background: darkMode ? 'linear-gradient(135deg, #0d0d0d 0%, #111111 50%, #0a0a0a 100%)' : 'linear-gradient(135deg, #e8ecf1 0%, #d1d9e6 50%, #e0e5ec 100%)'}}>
          <Outlet/>
          <FloatButton
            icon={
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${iconRotation}deg) scale(${iconScale})`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}>
                {darkMode ? <Sun style={{width: '100%', height: '100%'}}/> : <MoonStar style={{width: '100%', height: '100%'}}/>}
              </div>
            }
            tooltip={<div>深色模式</div>}
            onClick={toggleDarkMode}/>
        </div>
      </ConfigProvider>
    </>
  );
};

export default App;
